!include "nsDialogs.nsh"

; ===== 现代网页风格 UI 主题（必须在 MUI2.nsh 之前定义）=====
!define MUI_BGCOLOR "0xF4F6FB"
!define MUI_TEXTCOLOR "0x1B2440"
!define MUI_INSTFILESPAGE_PROGRESSBAR "smooth"
!define MUI_FINISHPAGE_COLOR "0x1B2440"

; 欢迎页（左侧品牌图 + 右侧现代排版文案）
!define MUI_WELCOMEPAGE_TITLE "立方·3D设计工坊"
!define MUI_WELCOMEPAGE_TEXT "离线桌面版 3D / 2D 场景编辑器$\r$\n支持多语言界面$\r$\n$\r$\n点击「安装」开始，整个过程约需 1 分钟。"

; NSIS 安装脚本增强
; 目标：安装完成后自动建立数据目录，卸载时保留用户作品与语言包。

!macro customInstall
  ; 建立用户数据目录（安装版数据位于 %APPDATA%，目录名须与运行时 userData 一致）
  CreateDirectory "$APPDATA\立方·3D设计工坊"
  CreateDirectory "$APPDATA\立方·3D设计工坊\langpacks"
  CreateDirectory "$APPDATA\立方·3D设计工坊\projects"

  ; 刷新 Shell 图标缓存，使文件关联立即生效
  System::Call 'shell32.dll::SHChangeNotify(i 0x08000000, i 0, i 0, i 0)'
!macroend

!macro customUnInstall
  ; 不删除用户数据：作品、语言包都保留
  ; 如需彻底清理，请手动删除 %APPDATA%\立方·3D设计工坊
  System::Call 'shell32.dll::SHChangeNotify(i 0x08000000, i 0, i 0, i 0)'
!macroend

; ===== 完全自定义完成页（nsDialogs 网页风格布局）=====
!macro customFinishPage
  Var FinishRunCheckbox
  Var FinishRunState

  Function finishPageCreate
    nsDialogs::Create 1018
    Pop $0
    ${If} $0 == "error"
      Abort
    ${EndIf}

    ; 顶部品牌色 banner（深靛蓝底）
    ${NSD_CreateLabel} 0 0 100% 60u ""
    Pop $1
    SetCtlColors $1 "0xFFFFFF" "0x1B2440"

    ; 大标题：安装完成（白字 + 大号粗体）
    ${NSD_CreateLabel} 18u 12u 80% 26u "安装完成"
    Pop $2
    SetCtlColors $2 "0xFFFFFF" "0x1B2440"
    CreateFont $3 "$(^Font)" 14 700
    SendMessage $2 0x30 $3 1

    ; 副标题：品牌 + 状态
    ${NSD_CreateLabel} 18u 38u 80% 16u "立方·3D设计工坊 · 已成功安装到你的电脑"
    Pop $4
    SetCtlColors $4 "0xBFD2FF" "0x1B2440"

    ; 主体说明文字
    ${NSD_CreateLabel} 18u 74u 90% 30u "应用程序已成功安装。$\r$\n勾选下方选项可立即启动程序。"
    Pop $5
    SetCtlColors $5 "0x1B2440" "0xF4F6FB"

    ; 立即启动复选框（默认勾选）
    ${NSD_CreateCheckbox} 18u 116u 90% 16u "立即启动 立方·3D设计工坊"
    Pop $FinishRunCheckbox
    ${NSD_Check} $FinishRunCheckbox

    nsDialogs::Show
  FunctionEnd

  Function finishPageLeave
    ${NSD_GetState} $FinishRunCheckbox $FinishRunState
    ${If} $FinishRunState == 1
      ${if} ${isUpdated}
        StrCpy $1 "--updated"
      ${else}
        StrCpy $1 ""
      ${endif}
      ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
    ${EndIf}
  FunctionEnd

  Page custom finishPageCreate finishPageLeave
!macroend
