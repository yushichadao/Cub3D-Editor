package com.lifang.editor3d;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;

import androidx.activity.OnBackPressedCallback;

import com.getcapacitor.BridgeActivity;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/**
 * 返回键触发统一方案（兼容安卓 7 ~ 16）：
 *  - 物理返回键  → WebView.setOnKeyListener（视图层最早拦截）
 *  - 预测返回手势（API33+）→ OnBackInvokedCallback（系统专用通道）
 *  - 传统返回（API<33）→ OnBackPressedCallback
 * 三者统一调用 onBack() → JS: window.__nativeBackPressed()
 */
public class MainActivity extends BridgeActivity {

    private static final int SAVE_REQUEST = 9001;
    private static final int OPEN_REQUEST = 9002;
    private static final int SAVE_IMAGE_REQUEST = 9003;
    private String pendingJson = null;
    private String pendingCb = null;
    private String pendingImportCb = null;
    private String pendingImgB64 = null;
    private String pendingImgCb = null;
    private WebView cachedWebView = null;
    private long lastBackMs = 0;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setup();
    }

    @Override
    public void onResume() {
        super.onResume();
        setup();
    }

    // ---- 统一初始化：注入桥 + 注册返回键通道 ----
    private void setup() {
        WebView wv = getWebView();
        if (wv != null) {
            try {
                wv.addJavascriptInterface(new SaverBridge(), "AndroidSaver");
                wv.addJavascriptInterface(new ExitBridge(), "AndroidExit");
                wv.addJavascriptInterface(new ImporterBridge(), "AndroidImporter");
                wv.addJavascriptInterface(new ImageSaverBridge(), "AndroidImageSaver");
                // 设备名注入：导出场景时把作者记为手机名称（厂商 + 型号）
                try {
                    final String deviceName = (android.os.Build.MANUFACTURER + " " + android.os.Build.MODEL)
                            .trim().replace("\"", "").replace("'", "");
                    wv.evaluateJavascript(
                            "window.__DEVICE_NAME__=" + org.json.JSONObject.quote(deviceName) + ";", null);
                } catch (Exception e) {
                    android.util.Log.e("Editor3D", "inject device name failed", e);
                }
                // 视图层拦截物理返回键（最早、最可靠）
                wv.setOnKeyListener((v, keyCode, event) -> {
                    if (keyCode == KeyEvent.KEYCODE_BACK
                            && event.getAction() == KeyEvent.ACTION_UP) {
                        onBack();
                        return true; // 消费，避免继续向上传递
                    }
                    return false;
                });
            } catch (Exception e) {
                android.util.Log.e("Editor3D", "setup webview failed", e);
            }
        }
        registerBackInvoked();
    }

    // ---- 返回键：API33+ 预测手势通道 ----
    private void registerBackInvoked() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                    new OnBackInvokedCallback() {
                        @Override
                        public void onBackInvoked() {
                            onBack();
                        }
                    });
        } else {
            getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
                @Override
                public void handleOnBackPressed() {
                    onBack();
                }
            });
        }
    }

    // ---- WebView 引用：多层兜底 ----
    private WebView getWebView() {
        if (cachedWebView != null && cachedWebView.getParent() != null) return cachedWebView;
        try {
            WebView wv = getBridge().getWebView();
            if (wv != null) { cachedWebView = wv; return wv; }
        } catch (Exception ignored) {}
        if (cachedWebView != null) return cachedWebView;
        View root = getWindow().getDecorView().findViewById(android.R.id.content);
        WebView found = findWebView(root);
        if (found != null) { cachedWebView = found; return found; }
        return null;
    }

    private WebView findWebView(View v) {
        if (v instanceof WebView) return (WebView) v;
        if (v instanceof ViewGroup) {
            ViewGroup g = (ViewGroup) v;
            for (int i = 0; i < g.getChildCount(); i++) {
                WebView w = findWebView(g.getChildAt(i));
                if (w != null) return w;
            }
        }
        return null;
    }

    // ---- 统一返回入口（带去抖，防止手势+物理键重复触发） ----
    private void onBack() {
        long now = System.currentTimeMillis();
        if (now - lastBackMs < 400) return;
        lastBackMs = now;
        android.util.Log.d("Editor3D", "onBack fired");
        WebView wv = getWebView();
        if (wv == null) {
            finish(); // 最后兜底：直接退出
            return;
        }
        wv.post(() -> wv.evaluateJavascript(
                "window.__nativeBackPressed&&window.__nativeBackPressed()", null));
    }

    // ---- JS 桥：保存 / 退出 ----

    private class ExitBridge {
        @JavascriptInterface
        public void finish() {
            runOnUiThread(() -> MainActivity.this.finish());
        }
    }

    private class SaverBridge {
        @JavascriptInterface
        public void save(final String json, final String filename, final String callbackId) {
            final Activity activity = MainActivity.this;
            activity.runOnUiThread(() -> {
                Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("application/json");
                intent.putExtra(Intent.EXTRA_TITLE, filename);
                pendingJson = json;
                pendingCb = callbackId;
                activity.startActivityForResult(intent, SAVE_REQUEST);
            });
        }
    }

    // 使用系统文件管理器（SAF）打开文件，读入内容后回传 JS
    private class ImporterBridge {
        @JavascriptInterface
        public void open(final String callbackId) {
            final Activity activity = MainActivity.this;
            activity.runOnUiThread(() -> {
                Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("*/*");
                intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"application/json", "application/octet-stream", "text/plain"});
                pendingImportCb = callbackId;
                activity.startActivityForResult(intent, OPEN_REQUEST);
            });
        }
    }

    // 通过系统文件管理器（SAF）选择位置并保存 PNG 截图
    // base64 为完整 data URL（形如 data:image/png;base64,xxxx），由原生端剥离前缀后写入目标 URI
    private class ImageSaverBridge {
        @JavascriptInterface
        public void save(final String base64, final String filename, final String callbackId) {
            final Activity activity = MainActivity.this;
            activity.runOnUiThread(() -> {
                Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("image/png");
                intent.putExtra(Intent.EXTRA_TITLE, filename);
                pendingImgB64 = base64;
                pendingImgCb = callbackId;
                activity.startActivityForResult(intent, SAVE_IMAGE_REQUEST);
            });
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == OPEN_REQUEST) {
            final String cb = pendingImportCb;
            pendingImportCb = null;
            WebView wv = getWebView();
            if (resultCode == Activity.RESULT_OK && data != null && data.getData() != null) {
                Uri uri = data.getData();
                String content = "";
                boolean ok = false;
                try {
                    java.io.InputStream is = getContentResolver().openInputStream(uri);
                    if (is != null) {
                        java.io.ByteArrayOutputStream bos = new java.io.ByteArrayOutputStream();
                        byte[] buf = new byte[4096];
                        int n;
                        while ((n = is.read(buf)) != -1) bos.write(buf, 0, n);
                        is.close();
                        content = new String(bos.toByteArray(), StandardCharsets.UTF_8);
                        ok = true;
                    }
                } catch (Exception e) {
                    ok = false;
                }
                final boolean fok = ok;
                final String fcontent = content;
                final String js = "window.__androidImporterContent=" + org.json.JSONObject.quote(fcontent)
                        + ";if(window.__androidImporterResult)window.__androidImporterResult('" + cb + "'," + (fok ? "true" : "false") + ");";
                if (wv != null) wv.post(() -> wv.evaluateJavascript(js, null));
            } else {
                final String js = "if(window.__androidImporterResult)window.__androidImporterResult('" + cb + "',false);";
                if (wv != null) wv.post(() -> wv.evaluateJavascript(js, null));
            }
            return;
        }
        if (requestCode == SAVE_REQUEST) {
            final String cb = pendingCb;
            final String json = pendingJson;
            pendingCb = null;
            pendingJson = null;
            WebView wv = getWebView();
            if (resultCode == Activity.RESULT_OK && data != null && data.getData() != null) {
                Uri uri = data.getData();
                boolean ok = false;
                try {
                    OutputStream os = getContentResolver().openOutputStream(uri);
                    if (os != null) {
                        os.write(json.getBytes(StandardCharsets.UTF_8));
                        os.close();
                        ok = true;
                    }
                } catch (Exception e) {
                    ok = false;
                }
                final boolean saved = ok;
                final String js = "if(window.__androidSaverResult)window.__androidSaverResult('" + cb + "'," + (saved ? "true" : "false") + ");";
                if (wv != null) wv.post(() -> wv.evaluateJavascript(js, null));
            } else {
                final String js = "if(window.__androidSaverResult)window.__androidSaverResult('" + cb + "',false);";
                if (wv != null) wv.post(() -> wv.evaluateJavascript(js, null));
            }
            return;
        }
        if (requestCode == SAVE_IMAGE_REQUEST) {
            final String cb = pendingImgCb;
            final String b64 = pendingImgB64;
            pendingImgCb = null;
            pendingImgB64 = null;
            WebView wv = getWebView();
            if (resultCode == Activity.RESULT_OK && data != null && data.getData() != null) {
                Uri uri = data.getData();
                boolean ok = false;
                try {
                    String pure = b64;
                    int comma = b64.indexOf(',');
                    if (comma >= 0) pure = b64.substring(comma + 1);
                    byte[] bytes = android.util.Base64.decode(pure, android.util.Base64.DEFAULT);
                    OutputStream os = getContentResolver().openOutputStream(uri);
                    if (os != null) {
                        os.write(bytes);
                        os.close();
                        ok = true;
                    }
                } catch (Exception e) {
                    ok = false;
                }
                final boolean saved = ok;
                final String js = "if(window.__androidImageSaverResult)window.__androidImageSaverResult('" + cb + "'," + (saved ? "true" : "false") + ");";
                if (wv != null) wv.post(() -> wv.evaluateJavascript(js, null));
            } else {
                final String js = "if(window.__androidImageSaverResult)window.__androidImageSaverResult('" + cb + "',false);";
                if (wv != null) wv.post(() -> wv.evaluateJavascript(js, null));
            }
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
}
