# Cube3D Workshop — Manual de usuario

## Material didáctico heurístico de principiante a experto (versión web · versión PC · versión Android, válido para todas)

> Este libro no es una fría lista de funciones, sino un **material que puedes seguir estudiando, haciendo y pensando**.
> Asumimos que nunca has tocado el diseño 3D, ni siquiera has usado software profesional. Seremos como un profesor sentado a tu lado,
> empezando por "qué es el 3D", usando preguntas para guiar tu pensamiento, analogías para ayudarte a construir intuición, y ejercicios para afianzar la destreza,
> para que finalmente pases de "saber pulsar botones" a "poder crear de forma independiente".

> 📦 **Un libro, cuatro formas**: Esta herramienta tiene tres versiones de distribución: web, de escritorio PC y Android,
> de las cuales la versión web se divide automáticamente según tu dispositivo en **modo ratón** y **modo táctil**.
> Este libro **cubre simultáneamente estas cuatro formas**; allí donde la operación difiera, se te indicará con claridad mediante una «marca de forma» qué hacer en cada extremo.

---

## Primer inicio: acuerdo de servicio y política de privacidad

Sin importar qué extremo uses, al **iniciar por primera vez** esta herramienta aparecerá una puerta de consentimiento de «**Acuerdo de servicio y política de privacidad**»:

- La página mostrará tres documentos: «Acuerdo de servicio», «Aviso de exención de responsabilidad» y «Política de privacidad» (haz clic en los enlaces para ver el texto completo);
- Debes **leer primero y marcar la casilla para aceptar todos los términos**, luego pulsar «**Aceptar y continuar**» para entrar al editor;
- Si eliges «**No aceptar y salir**», el programa intentará salir directamente; **no podrás usar el software**.
  - En la versión web, la mayoría de los navegadores bloquean que los scripts cierren automáticamente una página que abriste por tu cuenta; en ese caso se mostrará un panel de fallo de salida que dice «**Debe aceptar los términos para usar**», pulsa «**Volver a leer**» para regresar a la puerta de consentimiento y leer y aceptar de nuevo.

> ⚠️ Este es un paso obligatorio previo: mientras no se acepte, ninguna función estará disponible. Por favor, presta atención a esta ventana emergente la primera vez que abras el programa; no pienses que se ha bloqueado.

---

## Cómo usar este libro
> Sugerencia: haz clic en el «índice» al inicio del manual para saltar al capítulo correspondiente; los botones «capítulo anterior / capítulo siguiente» (◀ ▶) del lector del manual se encuentran en la **barra inferior**, solo visibles en la **forma táctil**, y permiten hojear siguiendo el orden de los capítulos sin volver al índice. Al pulsar el botón de retroceso en dispositivos táctiles y en PC, primero se cerrarán una por una las notas (si hay contenido sin guardar se preguntará), luego se cerrará el índice, y finalmente se saldrá del manual y se mostrará la configuración.

| Elemento | Descripción |
| --- | --- |
| Público objetivo | Usuarios sin experiencia previa; también aficionados que deseen progresar de forma sistemática |
| Estilo de enseñanza | Heurístico: primero preguntar por qué, luego explicar cómo, y al final dar ejercicios |
| Alcance del contenido | Cubre todas las funciones del editor (interfaz, figuras, color, transformación, texto, pincel, borrador, vista, atajos, archivos, avanzado y práctica) |
| Formas compatibles | Cobertura total de las cuatro formas: **versión web (ratón) / versión web (táctil) / versión de escritorio PC / versión Android** |
| Criterio del sistema de coordenadas | Este libro **siempre se basa en las etiquetas de ejes que se muestran realmente en la interfaz** (etiquetas de la página: X azul = adelante-atrás, Y rojo = izquierda-derecha, Z verde = altura, eje Z hacia arriba). La implementación interna de ejes en el código difiere de las etiquetas de la página; los lectores comunes no necesitan preocuparse |
| Sugerencia de lectura | Lee primero [Capítulo 0 Cuatro formas y cómo leer este libro](jump:Capítulo 0: Cuatro formas y cómo leer este libro), y confirma qué extremo usas; lee las primeras cuatro partes en orden; las ocho partes siguientes se pueden consultar según necesidad. Los «Piénsalo» y «Practica» al final de cada capítulo deben hacerse sin falta |
| Dirección en línea | [https://yushichadao.github.io/Cub3D-Editor/Web/index.html](https://yushichadao.github.io/Cub3D-Editor/Web/index.html) (abre la página web y podrás practicar de inmediato) |
| Sitio web oficial | [https://yushichadao.github.io/Cub3D-Editor](https://yushichadao.github.io/Cub3D-Editor) (presentación del producto, cambio de nueve idiomas, entrada de descarga) |
| Repositorio del proyecto | [https://github.com/yushichadao/Cub3D-Editor](https://github.com/yushichadao/Cub3D-Editor) (código fuente, paquetes de instalación y esta documentación están aquí) |

**Convención de marcas de forma**

En todo el libro, donde las operaciones de cada extremo difieran, aparecerán las cuatro marcas siguientes. **Solo lee la línea correspondiente a tu dispositivo**; las demás puedes omitirlas:

| Marca | Significado | Dispositivos típicos |
| --- | --- | --- |
| 🖥️ **Web·Ratón** | Abierto en navegador, y el sistema tiene ratón/trackpad | Escritorio, portátil |
| 📱 **Web·Táctil** | Abierto en navegador, y es un dispositivo con pantalla táctil | Navegador de teléfono, tableta |
| 💻 **Versión PC** | Programa de escritorio Windows descargado e instalado (.exe) | Ordenador Windows |
| 🤖 **Versión Android** | Aplicación de teléfono instalada (.apk) | Teléfono y tableta Android |

💡 Si algún párrafo de operación **no tiene** marca de forma, significa que **los cuatro extremos son totalmente idénticos**; simplemente síguelo.

**Enlaces de salto (jump:) — cómo funcionan**

Cada «Capítulo X …» del índice es un enlace de salto clicable que te lleva a ese capítulo. La coincidencia **no distingue mayúsculas/minúsculas, espacios ni puntuación** (comillas, paréntesis, dos puntos chinos/ingleses, etc.) — aunque el texto del enlace difiera del título en un par de signos de puntuación, el sistema igual encuentra el destino con una regla flexible de «quitar puntuación y espacios, conservar solo letras, dígitos y caracteres chino-japonés-coreanos»; si la coincidencia exacta falla, se aplica automáticamente la flexible, así que los enlaces prácticamente nunca «no saltan». Si no se encuentra el título destino, simplemente no hace nada — sin error.

**Convención de símbolos**
- 💡 Sugerencia: experiencias que ahorran tiempo
- ❓ Piénsalo: preguntas que guían tu reflexión
- ✏️ Practica: ejercicios prácticos
- ⚠️ Atención: errores comunes en los que se suele caer

---

## Índice general

**Parte Cero: Formas (identifica primero tu versión)**

- [Capítulo 0 Cuatro formas y cómo leer este libro](jump:Capítulo 0: Cuatro formas y cómo leer este libro)

**Parte Primera: Inicio y primeros pasos (para principiantes absolutos)**
- [Capítulo 1 Reconocer de nuevo el "3D": empezando por una foto](jump:Capítulo 1: Reconocer de nuevo lo "tridimensional": empezando por una foto)
- [Capítulo 2 Para bien hacer: abrir esta herramienta](jump:Capítulo 2: Para hacer bien el trabajo: abrir esta herramienta)
- [Capítulo 3 Panorama de la interfaz: los cinco espacios ante tus ojos](jump:Capítulo 3: Panorama de la interfaz: las cinco zonas ante tus ojos)
- [Capítulo 4 Sistema de coordenadas: las tres líneas marcadas como X / Y / Z en la página web](jump:Capítulo 4: Sistema de coordenadas: las tres líneas marcadas X / Y / Z en la página web)
- [Capítulo 5 Manos a la obra: tu primera obra 3D](jump:Capítulo 5: Manos a la obra: tu primera obra tridimensional)
- [Capítulo 6 Guardar y compartir: captura de pantalla, exportación y copia de seguridad](jump:Capítulo 6: Guardar y compartir: captura, exportación y respaldo)

**Parte Segunda: Fundamentos de operación (seleccionar · transformar · deshacer)**
- [Capítulo 7 El arte de seleccionar objetos: selección simple, múltiple y por cuadro](jump:Capítulo 7 El arte de seleccionar objetos: selección simple, múltiple y por marco)
- [Capítulo 8 El trío de transformación: mover, rotar, escalar](jump:Capítulo 8 El trío de la transformación: mover, rotar, escalar)
- [Capítulo 9 Modo de transformación y escalado proporcional](jump:Capítulo 9 Modos de transformación y escalado proporcional)
- [Capítulo 10 Deshacer e historial: la confianza para experimentar sin miedo](jump:Capítulo 10 Deshacer e historial: la seguridad para equivocarse sin miedo)

**Parte Tercera: Universo de figuras (cómo usar 20 + 20 tipos)**
- [Capítulo 11 Resumen general de figuras 3D (cómo clasificar las 20)](jump:Capítulo 11: Vista general de figuras 3D (cómo clasificar las 20))
- [Capítulo 12 Resumen general de figuras 2D (las 20 y el pensamiento de "calcomanía")](jump:Capítulo 12: Vista general de figuras 2D (las 20 y la mentalidad de "calcomanía"))
- [Capítulo 13 Detalle de parámetros de cada figura 3D (parte 1): cuerpos básicos](jump:Capítulo 13: Explicación detallada de los parámetros de cada figura 3D (parte 1): cuerpos básicos)
- [Capítulo 14 Detalle de parámetros de cada figura 3D (parte 2): formas especiales](jump:Capítulo 14: Explicación detallada de los parámetros de cada figura 3D (parte 2): formas especiales)
- [Capítulo 15 "De pie" y "tumbado": la diferencia esencial entre 3D y 2D](jump:Capítulo 15: "De pie" y "acostado": la diferencia esencial entre 3D y 2D)

**Parte Cuarta: Color y material**
- [Capítulo 16 Introducción al color: el juego del ojo humano y la luz](jump:Capítulo 16: Introducción al color: el juego del ojo humano y la luz)
- [Capítulo 17 27 colores predefinidos: colorear con un clic](jump:Capítulo 17: 27 colores predefinidos: colorear con un clic)
- [Capítulo 18 Color personalizado: HEX, HSV y selector de color de pantalla](jump:Capítulo 18: Color personalizado: HEX, HSV y el selector de pantalla)
- [Capítulo 19 12 texturas de patrón: dale historia a la superficie](jump:Capítulo 19: 12 patrones de textura: dale historia a la superficie)
- [Capítulo 20 Subir imagen de textura y opacidad](jump:Capítulo 20: Subir textura de imagen y opacidad)

**Parte Quinta: Texto e imagen**
- [Capítulo 21 Añadir texto: haz que la escena hable](jump:Capítulo 21: Añadir texto: haz que la escena hable)
- [Capítulo 22 Fuente, tamaño, grosor y orientación horizontal/vertical](jump:Capítulo 22: Fuente, tamaño, grosor y orientación horizontal/vertical)
- [Capítulo 23 Objeto de imagen: poner una foto en el mundo 3D](jump:Capítulo 23: Objetos de imagen: introduce fotos en el mundo tridimensional)

**Parte Sexta: Pincel y borrador**
- [Capítulo 24 Pincel 2D: dibujar líneas en el suelo](jump:Capítulo 24: Pincel 2D: dibujar líneas en el suelo)
- [Capítulo 25 Pincel 3D y plano de referencia](jump:Capítulo 25: Pincel 3D y plano de referencia)
- [Capítulo 26 Borrador: total y parcial](jump:Capítulo 26: Borrador: total y parcial)

**Parte Séptima: Vista y observación**
- [Capítulo 27 Siete vistas predefinidas: mira el mundo desde otro ángulo](jump:Capítulo 27 Siete vistas predefinidas: mira el mundo desde otro ángulo)
- [Capítulo 28 Ocultar ayudas y pantalla completa](jump:Capítulo 28 Ocultar ayudas y pantalla completa)

**Parte Octava: Eficiencia · Atajos (haz "volar" tus manos)**
- [Capítulo 29 Por qué memorizar atajos: el interés compuesto de la eficiencia](jump:Capítulo 29 Por qué memorizar los atajos: el interés compuesto de la eficiencia)
- [Capítulo 30 Operación con ratón y gestos: explicado para las cuatro formas](jump:Capítulo 30 Operaciones con ratón y gestos: explicadas para las cuatro formas)
- [Capítulo 31 Operación de tecla única y teclas combinadas con Shift](jump:Capítulo 31 Operaciones de una tecla y combinaciones con Shift)
- [Capítulo 32 Barra deslizante/cuadro de entrada y teclas combinadas con Ctrl](jump:Capítulo 32 Controles deslizantes/cuadros de entrada y combinaciones con Ctrl)

**Parte Novena: Controles de transformación (flechas que "hablan")**
- [Capítulo 33 Primer encuentro con los controles de transformación: tres "herramientas de agarre"](jump:Capítulo 33: Primer encuentro con los controles de transformación: tres "herramientas de agarre")
- [Capítulo 34 Modo de traslación: "agarra" el objeto con las flechas y muévelo](jump:Capítulo 34: Modo de traslación: "agarra" el objeto con las flechas y hazlo caminar)
- [Capítulo 35 Modo de rotación: los anillos deciden "alrededor de qué eje girar"](jump:Capítulo 35: Modo de rotación: el anillo decide "alrededor de qué eje girar")
- [Capítulo 36 Modo de escalado: manejadores de bloque y interruptor "proporcional"](jump:Capítulo 36: Modo de escala: manijas de cubo y el interruptor "proporcional")

**Parte Décima: Multitud (gestionar "un grupo" de objetos a la vez)**
- [Capítulo 37 Seleccionar un grupo de una vez: conocer el "conjunto de selección"](jump:Capítulo 37: Seleccionar un grupo de una vez: conocer el "conjunto de selección")
- [Capítulo 38 Mover un grupo junto: el "punto maestro" de la transformación múltiple](jump:Capítulo 38: Mover un grupo junto: el "punto maestro" de la transformación múltiple)
- [Capítulo 39 Producción en masa: copiar, clonar y "matriz"](jump:Capítulo 39: Producción en masa: copiar, clonar y "matrices")

**Parte Undécima: La obra sale de la pantalla (compartir · colaborar · alinear)**
- [Capítulo 40 Guardar y compartir: haz que la obra salga de la pantalla](jump:Capítulo 40: Guardar y compartir: dejar que la obra salga de la pantalla)

**Parte Duodécima: Práctica (construye una escena completa desde cero)**
- [Capítulo 41 Proyecto 1: construye una casita](jump:Capítulo 41 Proyecto 1: construye una casita)
- [Capítulo 42 Proyecto 2: fabrica un letrero con texto en relieve](jump:Capítulo 42 Proyecto 2: haz un rótulo de letras en 3D)
- [Capítulo 43 Proyecto 3: diseña un emblema / icono](jump:Capítulo 43 Proyecto 3: diseña un emblema / icono)
- [Capítulo 44 Proyecto 4: escena integral «Mi pequeño patio»](jump:Capítulo 44 Proyecto 4: escena integral «Mi pequeño patio»)

**Parte Decimotercera: Problemas y apéndices**
- [Capítulo 45 Manual de solución de problemas comunes](jump:Capítulo 45: Manual de solución de problemas frecuentes)
- [Capítulo 46 Glosario de términos (versión china-inglés)](jump:Capítulo 46: Glosario de términos (español-inglés))
- [Capítulo 47 Tabla rápida de atajos](jump:Capítulo 47: Tabla rápida de atajos de teclado)
- [Capítulo 48 Índice de figuras · texturas · colores](jump:Capítulo 48: Índice de figuras · patrones · colores)

**Parte Decimocuarta: Notas · Multilenguaje**
- [Capítulo 49 Anota mientras lees: las notas dentro del manual](jump:Capítulo 49: Anotar mientras lees: las notas del manual)
- [Capítulo 50 Haz que las notas "floten" sobre la pantalla](jump:Capítulo 50: Hacer que las notas "floten" en la pantalla)
- [Capítulo 51 Multilenguaje: el manual también "habla" tu idioma](jump:Capítulo 51: Multilingüe: el manual también "habla" tu idioma)

---

## Prefacio: para ti, que nunca has tocado el 3D

Quizá al abrir esta página web sientas un poco de nervios: ¿3D? ¿modelado? ¿No hay que aprender un software durante mucho tiempo?

Primero respira hondo. 🙂

La herramienta ante ti es un **editor 3D puramente web** — no necesita instalación, no necesita controladores de tarjeta gráfica, no necesita cursos. Comprime el "crear un mundo 3D" a un nivel de "haz clic, arrastra, escribe unas palabras".

Muchos principiantes se traban en el primer paso porque se asustan con un montón de términos: ejes de coordenadas, transformación, malla, textura… En realidad todos son muy cotidianos:

- **Ejes de coordenadas**, como las tres reglas invisibles de "adelante-atrás, izquierda-derecha, arriba-abajo" en tu habitación;
- **Transformación**, es "mover de sitio, girar, agrandar o reducir";
- **Malla**, son los cuadrados en el suelo que te ayudan a juzgar tamaño y distancia;
- **Textura**, es "pegar" una imagen a la superficie de un objeto, como poner papel pintado en la pared.

Este libro desmontará estos conceptos uno por uno, y los explicará con palabras que puedas entender. No seguimos el camino viejo de "primero memorizar definiciones y luego operar", sino que **primero te hacemos crear algo, y luego volvemos atrás para entender por qué es así**. Esto es "heurístico".

Tras leer este libro, serás capaz de:
1. Colocar, ajustar y colorear cualquier figura de forma independiente;
2. Enriquecer tu escena con texto, imágenes y pincel;
3. Elevar la eficiencia con atajos hasta el "flujo natural";
4. Completar obras integrales, desde una casa, un letrero, hasta un emblema.

¿Listo? Primero tomamos cinco minutos para identificar la versión que tienes en tus manos.

---

# Parte Cero: Formas (Identifica tu versión primero)

## Capítulo 0: Cuatro formas y cómo leer este libro

Antes de empezar a usar la herramienta, tómate tres minutos para confirmar: **¿qué forma estás usando ahora mismo?** Esto determina, en cada capítulo posterior, qué anotación de forma debes leer.

### 0.1 Tres versiones de lanzamiento, cuatro formas de uso

Esta herramienta se publica en **tres versiones**, pero como la versión web se adapta automáticamente al dispositivo, en el uso real hay un total de **cuatro formas**:

| Forma | Cómo obtenerla | Cómo confirmar que la estás usando |
| --- | --- | --- |
| 🖥️ **Web · Ratón** | Abrir la dirección en línea en el navegador | Hay un puntero de ratón en la pantalla; la sección de ayuda de «Atajos de teclado» se muestra en la ventana emergente «Configuración → Operaciones rápidas» (no está fija en ningún panel) |
| 📱 **Web · Táctil** | Abrir la misma dirección en el navegador de un teléfono/tableta | En la barra de herramientas inferior aparecen los botones «Selección por cuadro» y «Seleccionar todo»; hay una tabla de ayuda de «Operaciones con gestos» |
| 💻 **Versión PC** | Descargar el `.exe` e instalarlo o ejecutarlo tras descomprimir | En la esquina superior derecha de la ventana hay controles propios de «Minimizar / Maximizar / Cerrar» |
| 🤖 **Versión Android** | Descargar el `.apk` e instalarlo | En la parte inferior hay «Selección por cuadro» y «Seleccionar todo»; al pulsar el botón de retorno del teléfono aparece una confirmación de salida |

💡 **La versión web se determina automáticamente**: detecta si tu dispositivo es un «puntero preciso (ratón)» o un «puntero aproximado (dedo)», y luego cambia automáticamente al modo correspondiente; **no necesitas hacer ninguna configuración**.

⚠️ Si quieres **previsualizar qué aspecto tiene la versión táctil** en el navegador de tu computadora (por ejemplo, para una demostración educativa), puedes añadir `?touch` al final de la URL, por ejemplo:
[`https://yushichadao.github.io/Cub3D-Editor/Web/index.html?touch`](https://yushichadao.github.io/Cub3D-Editor/Web/index.html?touch). A la inversa, la versión Android tiene siempre, por defecto, el diseño táctil.

### 0.2 Tabla general comparativa de capacidades de las cuatro formas

Esta tabla es la hoja de consulta rápida más importante de todo el libro. **Se recomienda echarle un vistazo primero para tener una impresión, y volver a consultarla cuando encuentres una función concreta.**

| Función | 🖥️ Web · Ratón | 📱 Web · Táctil | 💻 Versión PC | 🤖 Versión Android |
| --- | :---: | :---: | :---: | :---: |
| Todos los gráficos / colores / transformaciones / texto / pincel | ✅ | ✅ | ✅ | ✅ |
| Atajos de teclado | ✅ Completo | ⛔ Sin teclado físico | ✅ Completo | ⛔ Sin teclado físico |
| Sección de ayuda de «Atajos de teclado» | ✅ Muestra | ⛔ Oculta | ✅ Muestra | ⛔ Oculta |
| Tabla de ayuda de «Operaciones con gestos» | ⛔ Oculta | ✅ Muestra | ⛔ Oculta | ✅ Muestra |
| Botones «Selección por cuadro» / «Seleccionar todo» | ⛔ Sustituidos por atajos | ✅ Muestra | ⛔ Sustituidos por atajos | ✅ Siempre visibles |
| Botón «Pantalla completa» | ✅ Pantalla completa web | ✅ Pantalla completa web | ⛔ Usar F11 / botón de maximizar ventana | ⛔ Ya es una aplicación a pantalla completa |
| Minimizar/maximizar/cerrar ventana | ⛔ Usar las del navegador | ⛔ | ✅ Propias de la aplicación | ⛔ |
| Capa flotante de notas fijas (capa flotante dentro de la página, no ventana independiente) | ✅ | ✅ | ✅ | ✅ |
| Importación arrastrando y soltando archivos | ✅ | ⛔ | ✅ | ⛔ |
| Recuperación tras fallo / guardado automático | ✅ | ✅ | ✅ | ✅ |
| Captura de color de pantalla (nombre del botón «Captura de color de pantalla», en táctil solo muestrea dentro del lienzo) | ✅ Cualquier parte de la pantalla | ✅ Solo muestreo dentro del lienzo | ✅ Cualquier parte de la pantalla | ✅ Solo muestreo dentro del lienzo |
| Confirmación de guardado al salir (cerrar ventana / salir) | ✅ | ✅ | ✅ | ⛔ (vía confirmación del botón de retorno) |
| Confirmación de salida por capas con el botón de retorno del teléfono | ⛔ | ⛔ | ⛔ | ✅ |
| Uso sin conexión | ⛔ Requiere conexión | ⛔ Requiere conexión | ✅ Totalmente sin conexión | ✅ Totalmente sin conexión |

### 0.3 La diferencia más fundamental: los dedos no tienen «botón derecho» ni «rueda»

De las cuatro formas, lo único que realmente te obliga a cambiar la memoria muscular es, en realidad, una sola cosa: **el modo de entrada**.

El ratón tiene tres señales independientes (botón izquierdo, botón derecho, rueda), mientras que el dedo solo tiene una (pulsar-mover-soltar). Por eso, en táctil hay que usar la **cantidad de dedos** para distinguir la intención:

| Lo que quieres hacer | 🖥️💻 Ratón (Web · Ratón / PC) | 📱🤖 Táctil (Web · Táctil / Android) |
| --- | --- | --- |
| Seleccionar objeto | Clic con botón izquierdo | Tocar con un dedo |
| Colocar figura | Clic con botón izquierdo en el suelo | Tocar con un dedo en el suelo |
| Rotar la vista | Arrastrar con **botón derecho** | Arrastrar con **un dedo** en espacio vacío |
| Desplazar la vista | Arrastrar con **botón central** | Arrastrar **dos dedos** juntos |
| Ampliar/reducir la vista | Desplazar la **rueda** | **Pellizcar / separar** con **dos dedos** |
| Selección múltiple | `Shift` + clic con botón izquierdo | Pulsar «Seleccionar todo», o usar «Selección por cuadro» |
| Selección por cuadro | Arrastrar directamente un rectángulo con el botón izquierdo | Pulsar primero el botón «Selección por cuadro», luego arrastrar con un dedo |

💡 **Una frase para recordar**: **el ratón mira «qué tecla se pulsa», el dedo mira «cuántos dedos se usan».**

### 0.4 Dos botones exclusivos de la versión táctil

Porque no hay teclado, la forma táctil (📱 Web · Táctil y 🤖 Android) añade dos botones en la barra de herramientas inferior, que sustituyen a `Ctrl+A` y al «arrastrar para seleccionar por cuadro»:

- **«Seleccionar todo»**: equivale a `Ctrl + A` del lado del ratón, selecciona con un clic todos los objetos de la escena;
- **«Selección por cuadro»**: pulsa una vez para entrar en el modo de selección por cuadro (el botón se vuelve azul), luego arrastra con un dedo para trazar un rectángulo; los objetos encerrados se seleccionan juntos.
  ⚠️ **Atención**: tras completar **una vez** la selección por cuadro, el modo **se cierra automáticamente** (el botón vuelve a su color original). Para volver a seleccionar por cuadro, hay que **volver a pulsar** «Selección por cuadro». Este es un diseño para evitar toques accidentales.

> 🤖 **Limitación de la versión Android**: los botones «Selección por cuadro» y «Seleccionar todo» solo están disponibles en el modo **selección / transformación**; cuando te encuentras en modos de herramienta como pincel, texto, borrador, etc., se **desactivan y se ponen en gris** con el aviso «Debes cambiar primero al modo 'Selección/Transformación'». Esto es para evitar conflictos con la lógica de clic de las herramientas, no es una falta de función.

### 0.5 Exclusivo de la versión PC: úsala como un «software de verdad»

La versión PC no es simplemente «una web con una carcasa», ofrece además capacidades propias de un software de escritorio:

- **Control de ventana**: botones de minimizar / maximizar / cerrar dibujados en la esquina superior derecha;
- **Importación arrastrando y soltando**: arrastra directamente un archivo de proyecto `.json` **dentro de la ventana** para abrirlo, sin pasar por el cuadro de diálogo «Importar»; 💻 la versión PC también admite arrastrar **archivos de imagen** a la ventana, y al soltarlos se colocan como objetos de imagen;
- **Recuperación tras fallo y guardado automático**: al reabrir tras un cierre inesperado, aparece el aviso «Se detectó una sesión no guardada», preguntándote si deseas recuperar el progreso guardado automáticamente (y mostrando la cantidad actual de objetos); puedes cerrar directamente para descartarlo, pero **aún se recomienda exportar activamente**;
- **Capa flotante de notas fijas**: puedes desplegar una nota como una tarjeta flotante **siempre visible** (capa flotante dentro de la página), para anotar mientras ves otros materiales;
- **Notas**: puedes seleccionar texto en el cuerpo del manual para añadir notas, y desplegar la nota como una capa fija (ver detalles en la Parte XIII).

### 0.6 Exclusivo de la versión Android: el botón de retorno y la protección de salida

Lo más importante a tener en cuenta en la versión Android es el comportamiento del **botón de retorno del teléfono**, que es por capas:

> Pulsar retorno → si hay notas abiertas, cerrarlas una por una (si hay contenido no guardado, te pregunta primero) → luego cerrar el índice → luego salir del manual → finalmente preguntar si deseas salir de la aplicación.

Al salir de la aplicación aparece un cuadro de confirmación con tres opciones: **Guardar y salir / Salir sin guardar / Cancelar**. Esto evita que la escena que construiste con esfuerzo se borre por un toque accidental.

💻 **La versión PC y la versión web** también tienen «confirmación de guardado al salir»: cuando **cierras la ventana / sales del programa**, si la escena no se ha guardado, aparece un cuadro de confirmación —la versión PC muestra «La escena tiene modificaciones no guardadas / ¿Deseas guardar antes de cerrar?», la versión web muestra «¿Deseas guardar la escena actual? El contenido no guardado se perderá tras salir.»— y ofrece tres opciones (en orden «Cancelar / No guardar / Guardar»); si no elegiste una ubicación de guardado o el guardado falló, volverá a confirmar si aún deseas salir. Esto difiere del momento de activación del «retorno por capas» de Android, pero el objetivo es el mismo: proteger tu obra para que no se pierda por error.

💡 La versión Android **no tiene botón de «Pantalla completa»**, porque en sí misma es una aplicación que se ejecuta a pantalla completa.

### 0.7 Sobre la «conexión» y la «seguridad de datos»

| | ¿Requiere conexión? | ¿Dónde están los datos? |
| --- | --- | --- |
| 🖥️📱 Versión web | Sí (al cargar la página) | Todos los cálculos se completan localmente en tu dispositivo, **no se sube ningún dato de tu obra** |
| 💻 Versión PC | **Totalmente no requiere** | Todo en la máquina local |
| 🤖 Versión Android | **Totalmente no requiere** | Todo en la máquina local |

Las tres versiones **no envían tu obra a ningún servidor**. La versión web se conecta solo para descargar la página; una vez abierta, toda la creación ocurre en tu propio dispositivo.

❓ **Piénsalo**: si vas a dar una clase a estudiantes en un aula sin conexión, ¿qué versión elegirías? (Pista: mira la última fila de la tabla anterior)

✏️ **Practica**: comparando la tabla general del 0.2, busca en tu propio dispositivo —¿puedes ver el botón «Selección por cuadro»? ¿puedes ver la sección «Atajos de teclado»?— y con esto confirma qué forma de las cuatro estás usando, y recuérdala. En los capítulos siguientes, cuando encuentres anotaciones de forma, ya sabrás cuál leer.

---

# Parte 1: Puesta en marcha (Principiantes absolutos)

## Capítulo 1: Reconocer de nuevo lo "tridimensional": empezando por una foto

### 1.1 ¿En qué diferen las 2D y las 3D?

Saca tu teléfono y toma una foto de una mesa. La foto es **bidimensional (2D)**: tiene ancho y alto, pero al tocarla con el dedo es plana; solo "parece" tener relieve.

Ahora camina hacia el lado de la mesa y mírala de nuevo. La mesa real es **tridimensional (3D)**: tiene ancho, alto y también **profundidad** (el tramo de las patas que se extiende hacia adelante). Al moverte, la forma que ves cambia; la foto, en cambio, queda fija para siempre.

💡 **En una frase**: lo 2D es una "imagen", lo 3D es un "espacio real en el que puedes caminar".

### 1.2 Lo que esta página web te ofrece es un "escenario tridimensional"

Abre el editor; el lienzo en el centro es precisamente un escenario 3D. Seleccionas una figura en el panel izquierdo, haces clic sobre el "suelo" y, de verdad, la figura "cae" dentro del escenario: puedes rodearla para verla por detrás, levantarla, o mirarla desde arriba en vista cenital.

❓ **Piénsalo**: si tuvieras que describir a un amigo "una bola roja a la izquierda de una caja azul", ¿con una foto 2D o con una escena 3D es menos probable que haya malentendidos? ¿Por qué?

### 1.3 ¿Por qué hacerlo "ligero en tres plataformas"?

El software 3D tradicional (como Blender, Maya) es muy potente, pero sus paquetes de instalación pesan a menudo cientos de megas y sus interfaces están saturadas de controles. Esta herramienta convierte las capacidades centrales en un motor ligero y lo empaqueta en tres versiones:

- 🖥️📱 **Versión web**: se abre con solo visitar la URL, se cierra y te vas, sin ocupar disco duro;
- 💻 **Versión PC**: se instala una vez y luego funciona **totalmente sin conexión**, además permite arrastrar y soltar archivos para abrirlos directamente;
- 🤖 **Versión Android**: se instala en el teléfono, para modelar un modelo en cualquier momento durante el trayecto.

Beneficios comunes a las tres:

- Todos los cálculos se realizan localmente en tu propio dispositivo, **sin subir ningún dato**;
- Se exportan archivos JSON comunes e imágenes PNG, fáciles de guardar y compartir;
- **Los archivos de proyecto son universales en las tres plataformas**: el `.json` que exportas en el teléfono puede seguir editándose en la versión PC.

💡 Esto es importante: **una misma obra puede continuarse entre plataformas**. Si se te ocurre algo en el teléfono, haz primero un borrador; al llegar a casa, perfecciónalo con la versión PC.

✏️ **Practica**: confirma la forma que tienes en tus manos (ver [Capítulo 0](jump:Capítulo 0: Cuatro formas y cómo leer este libro)), abre la herramienta y, cuando veas el lienzo central y los paneles a su alrededor, ya está. No te apresures a operar, solo "familiarízate con el entorno".

---

## Capítulo 2: Para hacer bien el trabajo: abrir esta herramienta

### 2.1 Tres formas de entrar, elige una

#### 🖥️📱 Forma 1: Versión web (la más rápida, sin instalar)

Abre la siguiente dirección pública directamente en el navegador:

> 🌐 **Dirección en línea**: [https://yushichadao.github.io/Cub3D-Editor/Web/index.html](https://yushichadao.github.io/Cub3D-Editor/Web/index.html)

Copia la URL en la barra de direcciones de cualquier navegador moderno y pulsa Enter para entrar a la interfaz principal. Funciona en teléfono, tableta y computadora, siempre que tengas conexión y un navegador. **Detecta automáticamente si usas dispositivo de ratón o táctil** y cambia a la disposición correspondiente.

💡 Al abrir por primera vez hay una carga muy breve (inicialización del motor 3D); cuando desaparece la capa de carga, entras a la interfaz principal.

#### 💻 Forma 2: Versión de escritorio PC (Windows, puede funcionar sin conexión)

Descarga desde la página de **Releases** del repositorio del proyecto; hay dos tipos de paquete, elige según necesites:

| Tipo de paquete | Nombre de archivo similar a | Características | Público recomendado |
| --- | --- | --- | --- |
| **Versión de instalación** | `...-Setup-1.1.0.exe` | Doble clic para instalar, crea acceso en el menú Inicio y en el escritorio, se puede desinstalar desde "Aplicaciones y funciones" | El equipo principal que usas a largo plazo |
| **Versión portátil** | `...-1.1.0-portable.exe` | **Sin instalar**, se ejecuta con doble clic, se puede guardar en un USB | Equipos públicos, sin permisos de administrador, querer llevarlo siempre |

> 📥 Dirección de descarga: [https://github.com/yushichadao/Cub3D-Editor/releases](https://github.com/yushichadao/Cub3D-Editor/releases)

⚠️ Es posible que Windows muestre "publicador desconocido" o bloquee con SmartScreen; esto se debe a que el paquete no tiene firma digital (común en proyectos de código abierto personales). Haz clic en «Más información» → «Ejecutar de todos modos».

#### 🤖 Forma 3: Versión Android (teléfono, puede funcionar sin conexión)

También en la página de Releases descarga el archivo `.apk`, pásalo al teléfono y pulsa para instalar.

⚠️ Antes de instalar debes permitir en «Ajustes → Seguridad» del teléfono la **instalación de aplicaciones de origen desconocido** (la ubicación varía según la marca, normalmente en los permisos de la aplicación que va a instalar).

### 2.2 Entorno de ejecución

| Forma | Requisitos del entorno |
| --- | --- |
| 🖥️📱 Versión web | Cualquier navegador moderno (Chrome, Edge, Firefox, Safari versiones recientes); debe soportar WebGL (los dispositivos de los últimos cinco años lo soportan básicamente); necesita conexión para abrir la página |
| 💻 Versión PC | Windows 10 / 11 (64 bits); tras instalar, funciona **totalmente sin conexión** |
| 🤖 Versión Android | Android 6.0 o superior; tras instalar, funciona **totalmente sin conexión** |

⚠️ **Atención**:
- 🖥️📱 Si la versión web abre una página en blanco, primero pulsa `F12` para abrir la consola y ver si hay errores en rojo; probar con otro navegador suele resolverlo.
- 💻 Si la versión PC muestra pantalla blanca tras iniciar, suele deberse a drivers de tarjeta gráfica obsoletos que impiden WebGL; actualiza los drivers.
- 🤖 Si la instalación de la versión Android se bloquea, comprueba si ya permitiste la instalación de "origen desconocido".

### 2.3 Dónde mirar a primera vista

Al entrar, tu vista debe quedar rodeada por cinco áreas. En el próximo capítulo las desglosamos una a una; aquí recuerda una frase: **"a la izquierda eliges material, en el centro creas, a la derecha ajustas parámetros, arriba gestionas archivos, abajo cambias de vista."**

✏️ **Practica**: siguiendo la frase de abajo, señala en la pantalla dónde están las cinco áreas: (barra superior / panel izquierdo / lienzo / panel derecho / barra inferior).

---

## Capítulo 3: Panorama de la interfaz: las cinco zonas ante tus ojos

Dividimos la interfaz en cinco bloques, cada uno con su función. Mientras lees, localiza en la pantalla la posición correspondiente.

### 3.1 Barra superior (parte más alta)

Una fila horizontal de botones, dividida en tres grupos:

- **Grupo de archivo**: nuevo, importar, exportar, captura de pantalla;
- **Grupo de edición**: deshacer, rehacer, copiar, pegar, clonar, limpiar;
- **Grupo de visualización**: interruptor de ejes de coordenadas, interruptor de malla, interruptor de suelo, ajustes.

**Diferencias de la barra superior según plataforma**:

- 🖥️📱 **Versión web**: además de los botones anteriores, hay un botón «Pantalla completa» que hace que la página ocupe toda la pantalla.
- 💻 **Versión PC**: tres botones de ventana dibujados en la esquina superior derecha (**minimizar / maximizar / cerrar**); pulsar **F11** o hacer clic en el botón «Maximizar» de la barra de título cambia entre **maximizar / restaurar ventana** (no hay botón independiente de «Pantalla completa»).
- 🤖 **Versión Android**: **no hay botón de «Pantalla completa»**: la aplicación ya se ejecuta a pantalla completa, así que es inútil tenerlo.

💡 La mayoría de estos botones tienen atajos (como `Ctrl+Z` para deshacer); se explican en conjunto en la parte de eficiencia más adelante.
⛔ 📱🤖 Las formas táctiles no tienen teclado físico; por favor **pulsa el botón directamente**; los botones táctiles exclusivos «Seleccionar todo» y «Selección por cuadro» se ven en 3.5.

### 3.2 Panel izquierdo (tomar material, elegir herramienta)

El panel izquierdo tiene de arriba abajo cuatro zonas:

1. **Gráficos 3D**: 20 formas sólidas (cubo, esfera, cilindro…);
2. **Gráficos 2D**: 20 formas planas (círculo, corazón, flecha…), como pegatinas;
3. **Herramientas**: seleccionar/transformar, pincel 3D, pincel 2D, borrador, añadir texto, añadir imagen;
4. **Modo de transformación**: trasladar, rotar, escalar, y escalado uniforme.

### 3.3 Lienzo (escenario central)

Aquí se muestran todas las figuras. La forma de operar varía según la plataforma:

- 🖥️💻 **Extremo de ratón (web·ratón / PC)**: arrastrar con el **botón derecho** para girar la vista, **rueda** para zoom, **botón izquierdo** para seleccionar o colocar.
- 📱🤖 **Extremo táctil (web·táctil / Android)**: arrastrar con **un dedo** para girar la vista, **pellizcar con dos dedos** para zoom y arrastrar con dos dedos para trasladar, **tocar con un dedo** para seleccionar o colocar.

💡 La comparación completa está en la tabla de modos de entrada de [Capítulo 0 sección 0.3](jump:Capítulo 0: Cuatro formas y cómo leer este libro).

### 3.4 Panel derecho (ajustar parámetros tras seleccionar)

Solo cuando seleccionas un objeto, el panel derecho "cobra vida": cambiar color, aplicar textura, ajustar opacidad, fijar valores de transformación, editar texto… Este es el lugar donde controlas tu obra con precisión.

### 3.5 Barra inferior (parte más baja)

Una fila de 7 botones de vista: perspectiva, cenital, inferior, frontal, posterior, izquierda, derecha. Un clic para cambiar de ángulo y ver la escena.

📱🤖 **El extremo táctil muestra además dos botones**:

- **«Seleccionar todo»**: selecciona con un clic todos los objetos de la escena (sustituye el `Ctrl + A` del extremo de ratón);
- **«Selección por cuadro»**: pulsa para entrar en modo de selección por cuadro, arrastra con un dedo para trazar un rectángulo que selecciona un grupo de objetos. **Al terminar sale automáticamente del modo**; para volver a seleccionar por cuadro hay que pulsar otra vez.

🖥️💻 El extremo de ratón no muestra estos dos botones, porque puedes pulsar directamente `Ctrl+A`, o arrastrar con el botón izquierdo para seleccionar por cuadro, sin necesidad de botones extra.

### 3.6 Ayuda de atajos: consultar en «Ajustes → Operaciones rápidas»

La interfaz **no muestra de forma permanente** la lista de atajos / gestos. Las instrucciones de operación correspondientes para el extremo de ratón y el táctil están todas en la ventana emergente «Ajustes → Operaciones rápidas»:

- 🖥️💻 **Extremo de ratón**: la ventana muestra la lista de «**Atajos de teclado**»;
- 📱🤖 **Extremo táctil**: la ventana muestra la tabla de comparación de «**Operaciones con gestos**».

Cuando necesites consultar, pulsa el botón «Ajustes» de la barra superior y elige «Operaciones rápidas».

💡 Esto es intencional: guardar la ayuda en una ventana en vez de un panel permanente evita ocupar el espacio de creación.

### 3.7 ¿Qué hacer en pantallas estrechas?

En teléfono o ventana estrecha (ancho menor a unos 960 píxeles), los paneles izquierdo y derecho se **ocultan automáticamente**; pulsa el pequeño botón en el borde para desplegarlos. Por diseño se garantiza que "también funcione en pantallas pequeñas".

📱🤖 El extremo táctil suele entrar ya en estado oculto; primero abre el panel izquierdo para tomar material, y tras colocar vuelve a ocultarlo para obtener el máximo espacio de lienzo.

❓ **Piénsalo**: ¿por qué "ajustar parámetros" va a la derecha y "elegir material" va a la izquierda? Detrás está el hábito común de la mayoría del software de diseño de "material a la izquierda, parámetros a la derecha"; ¿estás de acuerdo?

✏️ **Practica**:
- 🖥️💻 Pasa el ratón por cada botón de la barra superior y comprueba si aparece un tooltip (sugerencia de texto).
- 📱🤖 **Mantén pulsado** cada botón de la barra superior para ver la sugerencia; y busca dónde están «Seleccionar todo» y «Selección por cuadro» en la barra inferior.

### 3.8 Estilo de tema: cambiarle "ropa" a la interfaz

En «Ajustes → Estilo de tema» hay un total de **12 colores de tema** para elegir; un clic los aplica al instante, con vista previa inmediata, sin necesidad de reiniciar:

| Tema | Nombre | Tema | Nombre |
| --- | --- | --- | --- |
| Neon | Azul púrpura neón | Gray | Gris nocturno quieto |
| Sunset | Naranja cálido de atardecer | Light | Cian blanco cristalino |
| Forest | Verde bosque | Aurora | Púrpura nocturno |
| Ember | Rojo de brasas | Bubblegum | Rojo encantador |
| Slate | Amarillo cálido crepúsculo | Paper | Marfil matutino |
| Sky | Verde menta claro | Blossom | Amarillo pálido elegante |

💡 Tu elección se **recuerda**: al iniciar la próxima vez se mantiene el tema actual, sin que lo sobrescriba la configuración del sistema.

---

## Capítulo 4: Sistema de coordenadas: las tres líneas marcadas X / Y / Z en la página web

Este es el capítulo más importante de todo el libro. Muchos abandonan el software 3D justo por no entender "los ejes de coordenadas". Vamos despacio.

### 4.1 Suelta primero la carga de "los ejes matemáticos"

Quizá en clase de matemáticas viste tres ejes y aprendiste la "regla de la mano derecha". Olvídalo por ahora. En esta herramienta, **los ejes de coordenadas son simplemente tres flechas con color y etiqueta de letra**, que sirven para responder una pregunta: "¿en qué posición y hacia qué dirección está este objeto en el espacio?"

### 4.2 Lo que realmente ves marcado en la página web

Activa la visualización de "ejes de coordenadas" (el botón 📐 de la barra superior) y verás tres flechas cuyos extremos dicen **X, Y, Z**, cada una de distinto color.

> ⚠️ **Importante**: el X/Y/Z que escribe este libro y que aparece en la interfaz de la herramienta **es la marca de la página web**, y no es exactamente igual al eje usado internamente por el software. El lector común **solo debe mirar la marca de la página web**; la correspondencia de abajo es lo que realmente ves en pantalla:

| Marca web | Color de flecha | Dirección representada | Metáfora cotidiana |
| --- | --- | --- | --- |
| **X** | 🔵 Azul | **Frente/atrás** (profundidad) | "avanzas / retrocedes" |
| **Y** | 🔴 Rojo | **Izquierda/derecha** | "te mueves a la izquierda / a la derecha" |
| **Z** | 🟢 Verde | **Arriba/abajo** (altura) | "te pones de puntillas / te agachas" |

Es decir, en esta página web: **el eje Z es el que apunta hacia arriba (verde), X es frente/atrás (azul), Y es izquierda/derecha (rojo).**

💡 Recuerda un dicho: **"azul frente/atrás, rojo izquierda/derecha, verde arriba/abajo (Z al cielo)."**

### 4.3 ¿Por qué la "altura" es Z y no Y?

En bastante software 3D la altura es Y. Pero la **marca de la página** de esta herramienta pone la altura como Z (la verde). No es que te hayas equivocado al memorizar; es que **esta página web así lo marca**. Este libro explica todo según la "marca de la página web" de principio a fin; solo tienes que fijarte en el color y la letra en pantalla y no te confundirás.

❓ **Piénsalo**: si pudieras rediseñarlo, ¿qué letra pondrías a la "altura"? La letra en sí es solo un nombre; lo clave es que "nombre, color y dirección" coincidan.

### 4.4 El suelo y "altura = 0"

En el fondo del escenario hay una **malla de suelo**. El suelo es la referencia de "altura cero": cualquier cosa colocada sobre el suelo tiene Z (altura) igual a 0; al levantarla, Z aumenta.

Bajo la marca de la página web, el suelo es el plano horizontal formado por **X (frente/atrás) e Y (izquierda/derecha)**, cuya fórmula es "Z = 0". No hace falta memorizar la fórmula; basta con entender: **el suelo es "donde pisas", hacia arriba (eje verde Z) es subir.**

### 4.5 Sentir los tres ejes con el cuerpo

Levántate y haz tres movimientos:
- Un paso al frente, un paso atrás → te mueves a lo largo de **X (azul)**;
- Cruzar a la izquierda, cruzar a la derecha → te mueves a lo largo de **Y (rojo)**;
- Puntillas, agacharte → te mueves a lo largo de **Z (verde)**.

Graba esto en los músculos; más adelante todas las operaciones de "mover objetos" tendrán una referencia.

✏️ **Practica**: activa los ejes de coordenadas, cambia respectivamente a "vista cenital" y "vista frontal" (botones de la barra inferior) y observa si la dirección de las tres flechas coincide con lo que sientes en tu cuerpo. En vista cenital ves el plano X–Y; en vista frontal ves el plano X–Z.

---

## Capítulo 5: Manos a la obra: tu primera obra tridimensional

Ver sin practicar no sirve de nada. En este capítulo hacemos de verdad una pequeña obra que puedes capturar y compartir: **un cubo de colores de pie sobre el suelo.**

### 5.1 Paso 1: Elegir la figura

1. Mira el panel izquierdo y encuentra la zona «Gráficos 3D» (📱🤖 si el panel táctil está oculto, primero pulsa el botón pequeño del borde para desplegarlo);
2. Pulsa el primer «Cubo» (o cualquier sólido que te guste);
3. Entras en "modo de colocación":
   - 🖥️💻 Extremo de ratón: al entrar el cursor en el lienzo hay una **previsualización que sigue al cursor**;
   - 📱🤖 Extremo táctil: el dedo no tiene "hover", así que **no hay previsualización de seguimiento**, se coloca donde toques.

### 5.2 Paso 2: Colocarlo

Haz **un clic** en el suelo central (📱🤖 extremo táctil: **tocar con un dedo**). El cubo "¡paf!" cae sobre la malla. Felicidades, acabas de crear tu primer objeto tridimensional.

💡 Si no viste bien el punto de caída, no te apures: en el próximo capítulo aprendes "seleccionar" y podrás moverlo cuando quieras.

### 5.3 Paso 3: Seleccionarlo

Pulsa la herramienta «Seleccionar / Transformar» del panel izquierdo y luego **haz clic** sobre ese cubo (📱🤖 extremo táctil: **tocar con un dedo**). Alrededor aparecen flechas o un borde, indicando que "está seleccionado". En ese momento el panel derecho se ilumina.

### 5.4 Paso 4: Darle color

En la zona «Color» del panel derecho:

- Pulsa directamente un **color predefinido** (por ejemplo un naranja brillante) y el cubo cambia de color al instante;
- Para algo más personal, usa la función «Selector» de los colores personalizados.
⚠️ **Atención**: si pulsas "sin color" o bajas la opacidad a 0.1, el objeto se vuelve transparente o casi "invisible"; no ha desaparecido, solo ajústalo de nuevo.

### 5.5 Paso 5: Moverlo y girarlo

Manteniendo la selección, arrastra las flechas para mover (azul frente/atrás / rojo izquierda/derecha / verde subir) y arrastra los anillos para rotar. Siente los tres ejes aprendidos en el Capítulo 4.

### 5.6 Paso 6: Guardar el resultado

En la barra superior pulsa «Captura» (o `Ctrl+P`) para obtener un PNG. También puedes «Exportar» JSON como respaldo y la próxima vez «Importar» para seguir editando.

✏️ **Practica**: repite los pasos anteriores para hacer una pequeña escena de "cubo rojo a la izquierda de una bola azul" y guárdala con una captura. ¿Puedes describir con movimientos corporales (frente/atrás, izquierda/derecha, arriba/abajo) la posición de cada objeto a un amigo?

---

## Capítulo 6: Guardar y compartir: captura, exportación y respaldo

Lo que creas, por supuesto, hay que guardarlo y mostrarlo. Este capítulo explica cuatro formas de "guardar" y sus escenarios de uso.

### 6.1 Por qué "guardar a tiempo" es un buen hábito

Cerrar la página, recargar o tocar por error el botón de retroceso hace que la escena no exportada desaparezca. Adquirir el hábito de "exportar JSON tras terminar una parte" te salvará innumerables veces.

💻 **La versión PC y la versión web son la excepción**: tienen **guardado automático y recuperación tras cierre** (por defecto guardan automáticamente cada 5 minutos, conservando las 10 instantáneas más recientes); tras un cierre accidental, al reabrir aparece el diálogo «Se detectó una sesión no guardada» preguntando si deseas recuperar el progreso del último guardado automático (incluyendo la cantidad de objetos). Pero esto es solo una "red de seguridad"; **no sustituye la exportación activa**.

### 6.2 Captura: hacer una foto a la obra (Ctrl + P)

«Captura» guarda la pantalla actual como una **imagen PNG**.

- Ideal para: compartir en redes, hacer ilustraciones, entregar a otros para "ver el efecto";
- Sugerencia: antes de capturar, pulsa en la barra superior para **ocultar ejes de coordenadas y malla**, para una imagen más limpia;
- El tamaño de salida se **amplía automáticamente según la relación de píxeles del dispositivo** (al menos **3×**), por lo que el PNG capturado es más nítido y de mayor resolución que lo que ves en pantalla — no es simplemente igual a los píxeles de visualización del lienzo actual.

**¿Dónde se guarda la imagen? Varía según plataforma:**

| Forma | Forma de guardado |
| --- | --- |
| 🖥️📱 Versión web | Va por la **descarga** del navegador, cae en la carpeta «Descargas» del sistema (el navegador móvil puede primero mostrar un aviso de "guardar imagen") |
| 💻 Versión PC | Aparece el **diálogo de guardado del sistema**, donde eliges carpeta y nombre de archivo |
| 🤖 Versión Android | Se guarda en el almacenamiento de la aplicación y se puede enviar directamente vía el panel de **compartir del sistema** a WeChat / galería / otras aplicaciones |

💡 La captura solo guarda la "apariencia", no contiene datos reeditables. Si quieres poder modificarla después, usa la "exportación" de abajo.

### 6.3 Exportar escena: guardar el "proyecto editable" (Ctrl + S / botón `导出`)

«Exportar» genera un **archivo JSON** que registra la posición, color, parámetros… de cada objeto; al «Importar» la próxima vez se recupera tal cual.

- Ideal para: obras a medio hacer, que necesiten seguir puliéndose;
- El nombre de archivo suele llevar marca de tiempo; se recomienda renombrarlo con algo significativo (por ejemplo `房子_v1.json`).

La forma de guardado es igual que la captura: 🖥️📱 la versión web va por descarga del navegador; 💻 la versión PC abre el diálogo de guardado del sistema (puede elegir directorio); 🤖 la versión Android guarda en el almacenamiento de la aplicación y puede compartir la exportación.

> ✅ **Importante**: este `.json` es **universal en las tres plataformas**. El proyecto exportado en el teléfono puede importarse directamente en la versión PC para seguir editando, y viceversa.

💻 **El guardado de archivos en la versión PC (distinto de "exportar" en la web)**: la versión de escritorio PC gestiona la escena como un **archivo local**, no como una simple "exportación JSON":
- **`Ctrl + S` = Guardar**: sobrescribe y escribe directamente en el archivo de escena local abierto actualmente (si nunca se ha guardado en disco, aparece "Guardar como" para que elijas la ubicación);
- **`Ctrl + Shift + S` = Guardar como**: guarda la escena actual como un **nuevo** archivo local, sin afectar al archivo original.
> El extremo web·ratón / web·táctil no tiene el concepto de "archivo actual"; `Ctrl + S` es la "exportar escena" del 6.3 (descargar un JSON), así que los significados difieren; por favor distingue.

### 6.4 Importar: leer de vuelta el proyecto (Ctrl + O)

Elige un `.json` exportado antes y la escena se reconstruye. ⚠️ Importar **reemplaza** la escena actual; recuerda guardar primero el trabajo en curso.

Cómo tomar el archivo según plataforma:

- 🖥️📱 **Versión web**: pulsa «Importar» y elige el archivo en el cuadro de selección que abre el navegador;
- 💻 **Versión PC** y 🖥️ **extremo web·ratón**: además de pulsar «Importar», también puedes **arrastrar directamente el archivo `.json` dentro de la ventana** (los tipos de archivo no compatibles mostrarán "solo se admiten archivos de escena"); 💻 la **versión PC** admite además arrastrar **archivos de imagen** a la ventana, y al soltarlos se colocan como objetos de imagen;
- 🤖 **Versión Android**: pulsa «Importar» y localiza tu `.json` en el selector de archivos del sistema.

### 6.5 Nuevo: empezar desde cero (Ctrl + N)

«Nuevo» vacía toda la escena. Operación peligrosa, pero combinada con "exportar respaldo primero" es segura.

### 6.6 🤖 Exclusivo Android: el botón de retroceso no te hará "perder el trabajo"

Al pulsar el botón de retroceso para salir de la aplicación en la versión Android, aparece un cuadro de confirmación con tres opciones:

- **Guardar y salir**: exporta la escena actual antes de salir (recomendado);
- **Salir directamente**: sin guardar, úsalo con cuidado;
- **Cancelar**: quedarse y seguir editando.

💡 Así que en Android tocar por error el botón de retroceso no es grave; pero sigue recomendándose adquirir el hábito de exportar por etapas.

### 6.7 Un ritmo de respaldo sólido

> Exporta una vez antes de empezar → exporta de nuevo en puntos clave (con nombres de archivo distintos) → deshacer y retroceder en cualquier momento.
> (🖥️💻 extremo de ratón pulsa `Ctrl+Z`; 📱🤖 extremo táctil pulsa el botón «Deshacer» de la barra superior.)

✏️ **Practica**: toma la escena "cubo rojo + bola azul" del Capítulo 5 y guárdala una vez con «Captura» y otra con «Exportar»; luego «Importa» para leerla de vuelta y confirma que el contenido es igual.
Avanzado: si tienes a la vez teléfono y computadora, prueba **exportar en un extremo e importar en el otro** para experimentar la compatibilidad entre plataformas de los archivos de proyecto.

---

# Parte 2: Fundamentos de operación

## Capítulo 7 El arte de seleccionar objetos: selección simple, múltiple y por marco

En el mundo tridimensional, **"primero selecciona, luego opera"** es una regla de hierro. Este capítulo explica a fondo ese pequeño asunto de "seleccionar".

### 7.1 Por qué hay que seleccionar primero

Los parámetros del panel derecho y las flechas de transformación son todos "para el objeto actualmente seleccionado". Sin seleccionar, la herramienta no sabe a quién quieres modificar. Es como no poder entregar a toda la clase el mismo certificado que solo lleva un nombre — hay que nombrar primero.

### 7.2 Selección simple: un clic

Con la herramienta «Seleccionar / Transformar», haz clic sobre el objeto. Se resalta y aparecen los controles, lo que indica "seleccionado".

- 🖥️💻 **Ratón**: **clic izquierdo**;
- 📱🤖 **Pantalla táctil**: **toque con un dedo** (toca y levanta, no arrastres).

### 7.3 Selección múltiple: añadir el segundo, el tercero…

| Forma | Cómo seleccionar múltiples |
| --- | --- |
| 🖥️💻 Web·ratón / PC | Mantén pulsado `Shift` y haz clic en otros objetos para **acumular** selección; si ya está seleccionado, al hacer clic de nuevo se **cancela** ese objeto |
| 📱🤖 Web·táctil / Android | No hay tecla `Shift`, pero puedes **mantener pulsado con un dedo** sobre un objeto — si no está seleccionado se añade, si lo está se descuenta (equivalente al clic con Shift en ratón); también puedes usar «**Marco**» en la barra inferior para rodear un área, o «**Seleccionar todo**» para tomarlos todos de una vez |

💡 Tras seleccionar varios, al transformar, todos los objetos se mueven como un conjunto, tomando como base su "centro de grupo".

### 7.4 Marco: arrastrar un rectángulo

El marco sirve para "atrapar un montón de golpe", pero los dos extremos comienzan de forma totalmente distinta; es el punto más fácil de confundir:

**🖥️💻 Ratón (Web·ratón / PC)**

En un **espacio vacío, mantén pulsado el botón izquierdo y arrastra un rectángulo**; los objetos dentro del marco quedan seleccionados. Disponible en cualquier momento, sin cambiar de modo.

⚠️ El marco debe comenzar desde "un espacio vacío". Si empiezas arrastrando sobre un objeto, se convierte en **mover ese objeto**.

**📱🤖 Pantalla táctil (Web·táctil / Android)**

El arrastre con el dedo es por defecto "girar la vista", así que primero debes indicar al programa "ahora quiero hacer un marco":

1. Toca el botón «**Marco**» de la barra inferior; el botón se pone azul indicando que entraste en modo marco;
2. **Arrastra con un dedo** un rectángulo que encierre los objetos a seleccionar;
3. Suelta; la selección se completa — **el modo marco se cierra automáticamente** y el botón recupera su color.

⚠️ **Importante**: El marco en pantalla táctil es **de una sola vez**. Para hacer un segundo marco seguido, debes **tocar de nuevo** el botón «Marco». Esto evita marcar por error cuando quieres girar la vista.

### 7.5 Seleccionar todo

Selecciona de un golpe todos los objetos de la escena. Muy cómodo junto con «Vaciar» o una transformación global.

- 🖥️💻 **Ratón**: pulsa `Ctrl + A`;
- 📱🤖 **Pantalla táctil**: toca el botón «**Seleccionar todo**» de la barra inferior.

### 7.6 Cancelar selección

- **Común a las cuatro formas**: toca un espacio vacío del lienzo;
- 🖥️💻 **Ratón además**: pulsa la tecla `Esc`.

### 7.7 Indicador de selección: la pantalla "te dice qué seleccionaste"

Desde esta versión, cada vez que cambia el estado de selección, aparece arriba del lienzo una **barra de aviso ligera** (desaparece sola tras unos segundos, sin bloquear la operación):

| Situación | Contenido del aviso |
| --- | --- |
| Solo 1 figura seleccionada | `Seleccionado「Cubo」` (muestra el nombre del objeto, entre corchetes 「」) |
| Solo 1 texto seleccionado | `Seleccionado「Texto: contenido real」` (nombre del objeto + dos puntos + texto) |
| 2 o más seleccionados | `Seleccionados 5 objetos` (muestra el total actual) |
| Shift añadir / quitar | Cada clic refresca a la cantidad **actual**, por ejemplo 3 → 4 → 3 |
| Cancelar toda la selección | `Se canceló la selección` |

💡 El uso más práctico de este aviso es el **marco** y los **clics con Shift**: no necesitas contar uno por uno; con mirar el número sabes si marcaste de más o de menos.

### 7.8 Tocar la barra de herramientas estando seleccionado: salida automática de selección

Tras seleccionar un objeto, si haces clic en las siguientes **5 herramientas** del panel izquierdo, el editor primero **cancelará automáticamente la selección actual**, luego entrará en esa herramienta y mostrará `Salió del modo de selección`:

- Texto
- Imagen
- Pincel 3D
- Pincel 2D
- Borrador

Estas 5 herramientas son operaciones de "trazar algo nuevo en el lienzo"; conservar la selección vieja solo estorba.

⚠️ Las demás herramientas (los diversos botones de figuras 3D / 2D) **al hacer clic con un objeto seleccionado no surten efecto** — es una protección deliberada, para evitar que al querer ajustar parámetros coloques por error una figura nueva. Para colocar una figura nueva, cancela primero la selección (🖥️💻 pulsa `Esc` o toca un espacio vacío; 📱🤖 toca un espacio vacío del lienzo).

### 7.9 ¿No logras seleccionar? Revisa estos puntos

1. ¿Sigues en "modo colocación"? Vuelve primero a la herramienta «Seleccionar / Transformar»;
2. ¿El objeto que quieres seleccionar está tapado por otro? Cambia de vista (barra inferior) para rodearlo y verlo de frente;
3. ¿Está transparente (opacidad bajada al mínimo 0.1)? Sube la opacidad primero;
4. ¿Es un trazo 2D? Algunos objetos de pincel requieren el borrador o lógica especial; un clic simple no siempre los selecciona.

❓ **Piénsalo**: De la selección múltiple y el marco, ¿cuál conviene más para "elegir con precisión tres objetos no adyacentes"? ¿Cuál para "seleccionar toda una fila"?

✏️ **Practica**: Coloca 5 figuras distintas y practica ① selección simple de una ② añadir con Shift hasta tres (observa el cambio de número en la barra de aviso) ③ marco de toda un área ④ Ctrl+A seleccionar todo ⑤ tocar la herramienta «Texto» y observar cómo sale automáticamente de la selección.

---

## Capítulo 8 El trío de la transformación: mover, rotar, escalar

"Transformar" es la acción más frecuente en la creación 3D; en esencia son tres cosas: **mover de sitio, girar la orientación, cambiar el tamaño**.

### 8.1 Qué son las tres transformaciones

| Transformación | Analogía cotidiana | Controles en pantalla |
| --- | --- | --- |
| Traslación (mover) | Llevar la taza de la izquierda de la mesa a la derecha | Tres flechas de colores |
| Rotación | Voltear la boca de la taza hacia ti | Círculos / asas en arco |
| Escalado | Agrandar o reducir la taza | Asas en cuadrado |

### 8.2 Traslación: arrastrar por los tres ejes

Tras seleccionar el objeto aparecen flechas roja, verde y azul (la web las etiqueta como Y rojo = izquierda-derecha, Z verde = altura, X azul = frente-detrás).

- Arrastra la **flecha roja** → se mueve en Y (izquierda-derecha);
- Arrastra la **flecha verde** → sube / baja en Z (altura);
- Arrastra la **flecha azul** → se mueve en X (frente-detrás).

💡 Si arrastras solo una flecha, el objeto se mueve solo en esa dirección, sin desviarse. Para mover libremente en diagonal, arrastra el "cuadrado de plano" entre flechas.

### 8.3 Rotación: girar en torno a un eje

Cambia a modo «Rotar»; el objeto queda rodeado por anillos:

- Arrastra un anillo → gira en torno al eje correspondiente. Por ejemplo, pasar la "cara frontal" de mirar al frente a mirar a la izquierda es girar en Z (eje verde de altura).

⚠️ **Atención**: Rotar es "en torno a qué eje". Recuerda el truco: girar en eje verde (Z) = como girar sobre sí mismo; girar en eje azul (X, frente-detrás) = como asentir; girar en eje rojo (Y, izquierda-derecha) = como inclinar la cabeza a un lado.

### 8.4 Escalado: cambiar el tamaño

Cambia a «Escalar» y arrastra las asas para agrandar o reducir. Por defecto es **proporcional** (el candado se explica en el Capítulo 9).

### 8.5 ¿Quieres precisión? Usa los valores del lado derecho

Arrastrar depende del pulso; los parámetros dependen de la entrada. En el panel derecho cada transformación tiene una caja numérica:

- Posición: tres números X / Y / Z (en la web se etiquetan como frente-detrás / izquierda-derecha / altura);
- Rotación: tres ángulos;
- Escalado: valor de proporción.

💡 Para un diseño "muy alineado", poner los mismos valores directamente es mucho más preciso que arrastrar a ojo.

✏️ **Practica**: Coloca un cubo, primero arrástralo con las flechas hacia arriba a la derecha; luego en las cajas de la derecha cambia X, Y, Z a números enteros (ej. 2, 0, 3) y observa su ubicación exacta.

---

## Capítulo 9 Modos de transformación y escalado proporcional

El capítulo anterior explicó las acciones; este explica "cómo cambiar de modo" y "cómo bloquear la proporción".

### 9.1 Dónde cambiar los tres modos

En la parte inferior del panel derecho (tras seleccionar un objeto) hay tres botones «Trasladar / Rotar / Escalar», también se pueden usar atajos (se detalla en la parte de eficiencia). Al cambiar, los controles del objeto adoptan la forma correspondiente.

### 9.2 Qué es el escalado proporcional

Al escalar hay un interruptor «Escalado proporcional»:

- **Activado**: escala sincrónica en cualquier dirección, la forma **no se deforma** (la esfera sigue siendo esfera, el cubo sigue siendo cubo);
- **Desactivado**: permite **estirar en un solo eje**, por ejemplo aplastar la esfera en elipse o estirar el cubo en barra.

⚠️ **Atención**: La fila de escalado proporcional solo se muestra cuando "hay selección simple y el escalado proporcional está activado". En selección múltiple queda deshabilitada (se usa el control de transformación para escalar el conjunto).

### 9.3 El texto no admite escalado proporcional

Al seleccionar un **objeto de texto**, notarás:

- La barra del «Escalado proporcional» en el panel derecho **desaparece** por completo;
- La casilla «Escalado proporcional» **desaparece**;
- El botón «Escalar» de los modos se pone **gris y no se puede tocar** (si estabas en modo escalar, vuelve automáticamente a trasladar).

Motivo: el texto es una lámina de textura generada en tiempo real por parámetros tipográficos (tamaño, fuente, grosor, etc.); estirarlo directamente emborrona y deforma los glifos. **Para cambiar el tamaño del texto, usa el parámetro «Tamaño de fuente» del panel derecho** — es sin pérdida.

### 9.4 Cuándo desactivar el bloqueo

Cuando quieras hacer "arandelas aplastadas", "columnas alargadas", "lentes elípticas planas", desactiva el bloqueo y arrastra en un solo eje. Esta es la llave para pasar de "cuerpo estándar" a "cuerpo personalizado".

❓ **Piénsalo**: ¿Por qué "esfera aplastada" y "esfera estándar" son dos lenguajes visuales distintos en 3D? ¿Qué objetos conviene representar con cada una?

✏️ **Practica**: Coloca una esfera, desactiva el bloqueo proporcional y aplástala solo en Z (eje verde de altura) hasta 0.3, obteniendo un "platillo / disco plano", y siente el escalado en un solo eje.

---

## Capítulo 10 Deshacer e historial: la seguridad para equivocarse sin miedo

El mayor obstáculo psicológico de los novatos es "temor a hacer clic mal". Este capítulo te da una pastilla de calma.

### 10.1 Deshacer y rehacer

- `Ctrl + Z`: deshacer el último paso;
- `Ctrl + Y`: rehacer.

Puedes retroceder varios pasos seguidos, y también avanzar de nuevo con redo.

### 10.2 Qué es la "pila de historial"

El software guarda internamente una **lista de operaciones** (como el historial de retroceso del navegador). Cada operación importante empuja una entrada; deshacer saca la última.

⚠️ **Atención**: El historial tiene **límite de pasos**. Operaciones muy antiguas pueden ser "expulsadas" de la lista y ya no se podrán deshacer — por eso en nodos clave hay que exportar respaldo JSON (ver [Capítulo 6](jump:Capítulo 6: Guardar y compartir: captura, exportación y respaldo)).

### 10.3 Qué entra al historial y qué no

- **Entra al historial**: añadir/eliminar objetos, cambiar color, transformar, texturizar, etc. — "cambios al contenido de la obra";
- **No entra**: simplemente girar la vista, hacer zoom de observación (esto es "tu forma de mirar", no cambia la obra en sí).

Así puedes girar y observar tranquilo, sin preocuparte de que el movimiento de vista se registre como montones de pasos de deshacer.

### 10.4 La mentalidad para equivocarse sin miedo

> Cada operación se puede deshacer + en nodos clave hay respaldo = no hay un "arruinar" real.

Grábate esto en el corazón y ya te atreverás a clicar a lo loco.

✏️ **Practica**: Haz 5 operaciones distintas seguidas (añadir objeto, cambiar color, mover, escalar, borrar uno), luego pulsa `Ctrl+Z` repetido para ver cómo retrocede paso a paso, y luego `Ctrl+Y` para avanzar, y siente la "máquina del tiempo".

---

# Parte 3: Universo de figuras

La creación 3D, en el fondo, consiste en "colocar la forma correcta en el lugar correcto". Esta parte primero te muestra todas las **40 figuras** de un vistazo, y luego explica la diferencia fundamental entre 3D y 2D.

## Capítulo 11: Vista general de figuras 3D (cómo clasificar las 20)

### 11.1 Qué es una "figura 3D"

Las figuras 3D tienen **volumen**: pueden recibir luces y sombras, pueden bloquear lo que hay detrás, y se pueden rodear para verlas. Esta herramienta ofrece 20 formas sólidas, desde el cubo más común hasta el peculiar nudo toroidal.

### 11.2 Vista rápida de las veinte figuras

| N.º | Clave | Nombre en CN | Cómo reconocerla a primera vista | Parámetros exclusivos |
| --- | --- | --- | --- | --- |
| 1 | box | Cubo | Seis caras rectangulares | Longitud / Ancho / Altura |
| 2 | sphere | Esfera | Redonda y abombada | Radio |
| 3 | cylinder | Cilindro | Dos círculos arriba y abajo, tubo recto | Radio / Altura |
| 4 | cone | Cono | Punta afilada, base redonda | Radio de la base / Altura |
| 5 | torus | Toro | Dona | Radio exterior / Radio interior |
| 6 | knot | Nudo | Anillo en forma de trenza | Radio / Grosor del tubo |
| 7 | icosa | Icosaedro regular | 20 caras triangulares | Longitud de arista |
| 8 | octa | Octaedro regular | Picos arriba y abajo, abultado en el medio | Longitud de arista |
| 9 | dodeca | Dodecaedro regular | 12 caras pentagonales | Longitud de arista |
| 10 | capsule | Cápsula | Barra de puntas redondas | Radio / Longitud del cilindro |
| 11 | pyramid | Pirámide de base cuadrada | Base cuadrada y punta | Lado de la base / Altura |
| 12 | prism | Prisma triangular regular | Columna triangular | Lado de la base / Altura |
| 13 | tube | Tubo | Tubo curvado | Luz / Altura del arco / Radio del tubo / Segmentos de curvatura |
| 14 | lathe | Cuerpo de revolución | Forma de jarrón / trompo | Segmentos / Radio de la base / Radio medio / Radio máximo / Altura |
| 15 | tetra | Tetraedro regular | Pirámide de cuatro caras | Lado de la base |
| 16 | barrel | Cuerpo cilíndrico | Tubo cuyos diámetros superior e inferior pueden diferir | Radio superior / Radio inferior / Altura |
| 17 | dome | Semiesfera | Medio huevo / media cúpula | Radio |
| 18 | helix | Toro abierto | Anillo con un hueco | Radio exterior / Radio interior / Ángulo principal de barrido |
| 19 | octaPrism | Prisma octogonal regular | Columna recta de ocho lados | Lado de la base / Altura |
| 20 | star3d | Estrella 3D | Estrella con grosor | Radio exterior / Radio interior / Número de puntas / Grosor |

💡 **¿Dónde están los "parámetros exclusivos"?** Después de seleccionar un objeto, debajo de «Opacidad» en el panel derecho aparecerán los deslizadores de parámetros exclusivos de esa figura. Los cambios **reconstruyen la geometría en tiempo real**, y no afectan el color, la textura ni la transformación que ya hayas configurado.

### 11.3 Tres formas de clasificar (para ubicar rápido entre las 20)

- **Por familiaridad cotidiana**: caja (box), esfera (sphere), cilindro (cylinder), cono (cone) se parecen más a objetos de la vida real, ideales para principiantes;
- **Por "sensación geométrica"**: los sólidos platónicos (icosa/octa/dodeca/tetra) son muy "matemáticos"; knot/helix/tube son muy "fluidos";
- **Por uso**: para arquitectura usa box/cylinder/prism/pyramid/dome; para decoración usa torus/star3d/heart (2D)/lightning (2D); para formas orgánicas usa sphere/capsule/lathe/barrel.

### 11.4 Cómo elegir la primera

¿No sabes cuál usar? Primero practica con **box** para coger el tacto, luego usa **sphere** para sentir el "sombreado de superficie curva", y finalmente usa **torus** para experimentar la diversión tridimensional de "poder atravesar por el medio".

❓ **Piénsalo**: entre cubo, esfera y cono, ¿cuál "ahorra más material para contener más cosas"? En realidad es un problema del mundo real (contenedores, tanques de almacenamiento se diseñan según esto).

---

## Capítulo 12: Vista general de figuras 2D (las 20 y la mentalidad de "calcomanía")

### 12.1 Qué es 2D

Las figuras 2D **no tienen grosor**, son como un recorte de papel, y **yacen planas sobre el suelo** (plano XY, Z=0). Son adecuadas para símbolos, hitos, y patrones decorativos.

### 12.2 Presentación una por una de las veinte

| Clave | CN | A qué se parece / uso | Parámetros exclusivos |
| --- | --- | --- | --- |
| square2 | Cuadrado | Baldosa, fondo de señal | Longitud / Ancho |
| circle2 | Círculo | Botón, sol, punto | Radio |
| triangle | Triángulo isósceles | Advertencia, pico de montaña | Base / Altura |
| star | Estrella | Puntuación, decoración | Radio exterior / Radio interior / Número de puntas |
| hexagon | Hexágono regular | Panal, tuerca, sensación tecnológica | Lado |
| heart | Corazón | Amor, me gusta | Ancho / Altura / Profundidad de la punta del corazón |
| pentagon | Pentágono regular | Planta de casa, emblema | Lado |
| octagon | Octágono regular | Señal de estacionamiento, tapa de alcantarilla | Lado |
| ellipse | Elipse | Lente, órbita | Eje mayor / Eje menor |
| parallelogram | Paralelogramo | Tirante oblicuo, bloque en perspectiva | Base / Altura / Inclinación |
| trapezoid | Trapecio | Cuerpo troncocónico, lateral de techo | Ancho inferior / Ancho superior / Altura |
| diamond | Rombo | Diamante, indicador | Lado / Ángulo interior A / Ángulo interior B / Diagonal p / Diagonal q |
| rightTri | Triángulo rectángulo | Rampa, marca de ángulo recto | Base / Altura |
| arrow | Flecha | Dirección, flujo | Longitud / Ancho |
| crescent | Media luna | Luna, gancho curvo | Radio exterior / Radio interior / Desplazamiento |
| semicircle | Semicírculo | Arco, sector | Radio |
| ring2d | Anillo (con agujero) | Centro de diana, halo | Radio exterior / Radio interior |
| cross | Cruz | Médico, posicionamiento | Longitud / Ancho del brazo |
| lightning | Relámpago | Energía, advertencia | Altura / Ancho |
| teardrop | Gota de agua | Lágrima, colgante | Ancho / Altura / Agudeza de la punta |

💡 **Ahora todas las 20 figuras 2D tienen parámetros exclusivos**. Antes heart / arrow / crescent / cross / lightning solo podían escalarse en conjunto; ahora se puede especificar su tamaño con precisión.

💡 **Dos detalles fáciles de pasar por alto**:
- El borde recto del **semicírculo** ahora apunta hacia **abajo** y la curva hacia arriba, lo que facilita hacer "arcos" o "salidas del sol";
- El orden de los parámetros del **anillo (ring2d)** es "radio exterior primero, radio interior después", coherente con el toro 3D; el radio interior siempre se limita automáticamente a ser **menor** que el radio exterior.

### 12.3 La mentalidad de "calcomanía"

Imagina el 2D como una calcomanía pegada en el suelo: siempre está "acostado", nunca se levanta. La ventaja es que, en vista cenital, es una imagen de símbolos clara; combinado con patrones y colores, puede servir para líneas guía en el suelo, logos corporativos en el piso, tableros de ajedrez, etc.

### 12.4 Cuidado con la oclusión

El 2D está pegado en el suelo; si un objeto 3D lo cubre, lo ocultará; desde ciertos ángulos, el fino 2D "desaparece" convirtiéndose en una línea. Cuando necesites que sea visible, súbelo un poco (a lo largo del eje verde Z) o colócalo en un lugar despejado.

✏️ **Practica**: Coloca una de cada: square2, heart, arrow, star; cambia a "vista superior" para ver su apariencia más clara; luego cambia a "perspectiva" para ver cómo "yacen" en el suelo.

---

## Capítulo 13: Explicación detallada de los parámetros de cada figura 3D (parte 1): cuerpos básicos

> Esta sección explica una por una las 10 formas sólidas más usadas. Cada una sigue cuatro secciones: "apariencia / analogía / uso / consejo", para que construyas intuición.

### 13.1 Cubo box
- **Parámetros**: `Longitud` / `Ancho` / `Altura` (los tres son independientes; puedes hacer directamente un cuboide sin tener que desactivar el bloqueo de proporción para estirarlo).
- **Apariencia**: un cuerpo de caras rectangulares con ángulos rectos.
- **Analogía**: caja de envío, dado, ladrillo.
- **Uso**: muros de edificios, basamentos, y todo lo "cuadrado".
- **Consejo**: la forma más estable de "cimiento"; para hacer un muro bajo, simplemente reduce la `Altura`, más preciso que escalar.

### 13.2 Esfera sphere
- **Parámetros**: `Radio`.
- **Apariencia**: esfera perfecta.
- **Analogía**: balón de baloncesto, planeta, burbuja.
- **Uso**: cabeza, cuerpos celestes, esferas decorativas.
- **Consejo**: sobre la esfera las texturas/imágenes se "despliegan" mejor, ideal para hacer esferas con iconos.

### 13.3 Cilindro cylinder
- **Parámetros**: `Radio` / `Altura` (mismo diámetro arriba y abajo, es un cilindro recto de verdad; si quieres diámetros distintos usa **barrel**).
- **Apariencia**: círculos iguales arriba y abajo, pared recta.
- **Analogía**: lata, columna, vela.
- **Uso**: vigas y columnas, cuerpo de tubo, cuerpo de torre.
- **Consejo**: recuerda la división con barrel: **cylinder solo maneja "un radio", barrel maneja "dos radios"**.

### 13.4 Cono cone
- **Parámetros**: `Radio de la base` / `Altura`.
- **Apariencia**: base redonda, punta afilada.
- **Analogía**: cono de helado, cono de tráfico, punta de tienda de campaña.
- **Uso**: punta aguda, luz indicadora, cada nivel del árbol de Navidad.
- **Consejo**: apilando varios cone reduciendo gradualmente el `Radio de la base` se puede formar una "torre por niveles".

### 13.5 Toro torus
- **Parámetros**: `Radio exterior` / `Radio interior` (**describe directamente los dos círculos que ves**: qué tan grande es el exterior, qué tan grande es el agujero del medio. El antiguo "radio del tubo" ha sido eliminado).
- **Apariencia**: dona, con agujero en el medio.
- **Analogía**: aro de hula, neumático, anillo.
- **Uso**: decoración anular, codos de tubería, halo.
- **Consejo**: el `Radio interior` se limita automáticamente a ser menor que el `Radio exterior`; cuanto más cercanos estén ambos, más fino es el anillo, como un aro de alambre.

### 13.6 Nudo knot
- **Parámetros**: `Radio` / `Grosor del tubo` (el límite superior del `Grosor del tubo` sigue automáticamente al `Radio`, aproximadamente 0.4 veces el radio, para evitar que se autointerseque en un bulto).
- **Apariencia**: como un anillo hecho de trenzas.
- **Analogía**: nudo de cuerda, símbolo de energía.
- **Uso**: decoración tecnológica, cuerpo principal de logotipos.
- **Consejo**: forma compleja, se recomienda color sólido o patrón simple, para evitar texturas desordenadas.

### 13.7 Icosaedro regular icosa
- **Parámetros**: `Longitud de arista` (**no es radio** — da directamente la longitud real de cada arista, más acorde con la intuición geométrica).
- **Apariencia**: poliedro casi esférico formado por 20 triángulos equiláteros.
- **Analogía**: balón de fútbol (pariente cercano de la versión clásica de 32 caras), cristal mineral.
- **Uso**: gema, dado, esfera de estilo low-poly.
- **Consejo**: representante de la estética "low-poly", con color sólido se ve muy elegante.

### 13.8 Octaedro regular octa
- **Parámetros**: `Longitud de arista`.
- **Apariencia**: dos puntas arriba y abajo, abultado en ocho caras en el medio.
- **Analogía**: corte de diamante, doble cono.
- **Uso**: cristal, gema, escultura abstracta.
- **Consejo**: al rotar, los cambios de luz y sombra son ricos, ideal para "decoración de foco".

### 13.9 Dodecaedro regular dodeca
- **Parámetros**: `Longitud de arista`.
- **Apariencia**: poliedro con sensación esférica de 12 caras pentagonales regulares.
- **Analogía**: piedra mágica, dado (D12).
- **Uso**: símbolo de misterio, ornamento.
- **Consejo**: con la misma longitud de arista, el dodecaedro parece "más grande" que el icosaedro, porque su coeficiente de radio circunscrito es mayor.

### 13.10 Cápsula capsule
- **Parámetros**: `Radio` / `Longitud del cilindro` (altura total = Longitud del cilindro + 2 × Radio).
- **Apariencia**: cilindro con hemisferios en ambos extremos.
- **Analogía**: cápsula de medicina, pista de atletismo, bolo.
- **Uso**: simplificación de torso humano, manguera, columna redondeada.
- **Consejo**: más "suave" que el cilindro puro, usado a menudo para personajes o seres vivos.

✏️ **Practica**: Usa box + cylinder + cone para armar una "lámpara de calle": cilindro para el poste, box para la caja de la lámpara, cone para la cubierta superior. Experimenta el poder de combinar cuerpos básicos.

---

## Capítulo 14: Explicación detallada de los parámetros de cada figura 3D (parte 2): formas especiales

### 14.1 Pirámide de base cuadrada pyramid
- **Parámetros**: `Lado de la base` / `Altura` (el antiguo "número de lados" ha sido eliminado — por naturaleza ya debía ser pirámide de **base cuadrada**).
- **Apariencia**: base cuadrada + una punta.
- **Analogía**: pirámide de Egipto, techo de casa.
- **Uso**: torre, edificio de punta, monumento.
- **Consejo**: esta versión recalculó sus normales; las cuatro caras inclinadas ahora tienen **sombreado plano nítido**, sin la iluminación "borrosa" de la versión anterior.

### 14.2 Prisma triangular regular prism
- **Parámetros**: `Lado de la base` / `Altura`.
- **Apariencia**: columna recta con sección triangular equilátera.
- **Analogía**: prisma triangular, obstáculo vial, viga de techo.
- **Uso**: viga triangular, cuña, componente tecnológico.
- **Consejo**: también se corrigieron las normales; los tres lados tienen aristas marcadas; acostado sirve como "bloque de rampa".

### 14.3 Tubo tube
- **Parámetros**: `Luz` / `Altura del arco` / `Radio del tubo` / `Segmentos de curvatura`.
- **Apariencia**: un tramo de tubo circular en arco elevado, con ambos extremos en el suelo.
- **Analogía**: puente en arco, arcoíris, manija en forma de puerta.
- **Uso**: puentes, arcos, cintas decorativas.
- **Consejo**: la `Luz` es la distancia horizontal entre los dos extremos, la `Altura del arco` es la altura levantada en el medio — **la relación entre ambos decide si es "arco plano" o "arco alto"**. El límite superior del `Radio del tubo` se ajusta automáticamente según la luz/altura del arco, para evitar que el tubo sea tan grueso que tape el hueco del arco. Cuantos más `Segmentos de curvatura`, más redondeado; cuantos menos, más con sensación de líneas quebradas.

### 14.4 Cuerpo de revolución lathe
- **Parámetros**: `Segmentos` (≥ 3) / `Radio de la base` / `Radio medio` / `Radio máximo` / `Altura`.
- **Apariencia**: un cuerpo generado al rotar un perfil alrededor del eje central (forma de jarrón / trompo).
- **Analogía**: jarrón, bombilla, trompo, copa.
- **Uso**: recipientes simétricos, vajilla, escultura.
- **Consejo**: los tres radios controlan respectivamente **la base, la cintura y la parte más abultada**. Para hacer "jarrón" haz que `Radio máximo` > `Radio medio` > `Radio de la base`; para hacer "trompo" al revés. `Segmentos` controla la precisión circular, mínimo 3 segmentos (en ese caso se ve como un tronco de pirámide triangular).

### 14.5 Tetraedro regular tetra
- **Parámetros**: `Lado de la base`.
- **Apariencia**: el poliedro mínimo de 4 caras triangulares regulares.
- **Analogía**: pirámide triangular, fragmento de cristal.
- **Uso**: piedra triturada, decoración low-poly, símbolo afilado.
- **Consejo**: pocas caras y aristas duras, muy adecuado para un estilo "duro/tecnológico".

### 14.6 Cuerpo cilíndrico barrel
- **Parámetros**: `Radio superior` / `Radio inferior` / `Altura` (el antiguo y ambiguo "radio" ha sido eliminado).
- **Apariencia**: tubo cuyos diámetros superior e inferior pueden diferir.
- **Analogía**: barril de madera, maceta, vaso de papel, sección media de cohete.
- **Uso**: recipiente, fuselaje, depósito.
- **Consejo**: **este es el cuerpo cilíndrico más flexible** — radios iguales = cilindro; superior pequeño e inferior grande = maceta; superior grande e inferior pequeño = vaso de papel; llevando el `Radio superior` cerca de 0 se obtiene un cono.

### 14.7 Semiesfera dome
- **Parámetros**: `Radio`.
- **Apariencia**: media esfera (mitad superior).
- **Analogía**: cúpula de yurta, observatorio, campana de cristal.
- **Uso**: techo, cubierta, planetario.
- **Consejo**: combinada con box se puede hacer una "casita con techo"; dada la vuelta (rotada) es un "bol".

### 14.8 Toro abierto helix
- **Parámetros**: `Radio exterior` / `Radio interior` / `Ángulo principal de barrido` (el antiguo "radio del tubo" ha sido eliminado, usando en su lugar los dos radios interior y exterior consistentes con el toro).
- **Apariencia**: un anillo con un hueco — al toro se le recortó un arco.
- **Analogía**: clip en C, pulsera abierta, una vuelta de resorte.
- **Uso**: decoración dinámica, símbolo de remolino, anillo de energía, estructura de clip.
- **Consejo**: el `Ángulo principal de barrido` es "cuántos grados gira en total este anillo": 360° es un toro completo, 270° es la clásica C, 180° es medio anillo. **Cambiando este único parámetro pasas suavemente de "cerrado" a "abierto"**.

### 14.9 Prisma octogonal regular octaPrism
- **Parámetros**: `Lado de la base` / `Altura` (el antiguo "radio" se cambió por el más intuitivo lado).
- **Apariencia**: columna recta de ocho caras verticales.
- **Analogía**: columna octogonal, faro, pared de pozo.
- **Uso**: columna regular, cuerpo de torre, basamento.
- **Consejo**: más "aristado" que el cilindro, más "redondeado" que box, buen punto medio.

### 14.10 Estrella 3D star3d
- **Parámetros**: `Radio exterior` / `Radio interior` / `Número de puntas` / `Grosor`.
- **Apariencia**: estrella extruida en un sólido con grosor.
- **Analogía**: medalla, adorno de estrella, condecoración, engranaje.
- **Uso**: símbolo de recompensa, cuerpo decorativo, Logo.
- **Consejo**: el `Número de puntas` puede ser mucho más que 5 — a 3 es estrella triangular, aumentándolo con "radil interno y externo cercanos" se vuelve un **engranaje**. El `Radio interior` se limita automáticamente a ser menor que el `Radio exterior`.

❓ **Piénsalo**: Si pudieras usar no más de 4 figuras 3D para armar un "robot", ¿cuáles 4 elegirías? ¿Qué parte representaría cada una?

---

## Capítulo 15: "De pie" y "acostado": la diferencia esencial entre 3D y 2D

### 15.1 Volumen vs área

- **3D tiene volumen**: ocupa espacio, proyecta sombras, puede ocultarse mutuamente. "Está de pie" sobre el suelo, tiene altura (eje verde Z).
- **2D solo tiene área**: se extiende en una lámina, grosor cero. "Yace" sobre el suelo (Z=0).

Entender esto te explica por qué los objetos 3D pueden "apilarse" y el 2D solo puede "cubrir el piso".

### 15.2 Por qué uno está de pie y otro acostado

En el código, 3D usa `seatOnGround` para bajar la base a y=0 (la interfaz web marca Z=0); 2D usa `shape2D` para rotar al plano XZ (suelo) y pegarse al suelo. Por lo tanto:
(Nota: el "suelo / plano XY / Z=0" anterior es la forma de llamarlo de la **interfaz web**; aquí `y=0` / `plano XZ` es la forma de llamarlo del **sistema de coordenadas interno de Three.js** — ambos se refieren al mismo suelo, solo que el sistema de nombres es distinto: Three.js usa internamente el eje Y para la "altura", que corresponde al eje verde Z que esta guía marca en la UI; los ejes X, Z internos corresponden al X (adelante-atrás) y Y (izquierda-derecha) que esta guía marca en la UI.)
- coloca un box, naturalmente "se sienta" en el suelo;
- coloca un heart, naturalmente "se pega" en el suelo.

### 15.3 Trucos de uso combinado

- ¿Quieres que el 2D se "levante"? gíralo 90° alrededor del eje rojo (Y), pasará de "acostado" a "de pie" — sirve para letreros, rótulos;
- ¿Quieres que el 3D se "acueste"? gíralo para que caiga de lado, para hacer "árbol caído", "tabla apoyada";
- símbolos en el suelo (flecha indicadora) + edificios sólidos es la combinación más común en una escena.

✏️ **Practica**: Coloca una arrow (2D), selecciónala y gírala 90° alrededor de Y (rojo/izquierda-derecha), observa cómo pasa de "flecha en el suelo" a "letrero indicador erguido". Esta es la conmutación libre entre "de pie y acostado".

---

# Parte 4: Color y materiales

El color es la "emoción" de la obra. Este capítulo parte de "qué es la luz", pasa por los 27 colores predefinidos, la selección de color personalizada, los 12 patrones, y termina hablando de las texturas de imagen y la opacidad.

## Capítulo 16: Introducción al color: el juego del ojo humano y la luz

### 16.1 El color no es "propio" del objeto

Una manzana roja en la oscuridad es negra: ves el rojo porque la luz incide sobre ella y es "reflejada" hacia tus ojos. Por eso **color = objeto + luz**. Esta herramienta usa `MeshStandardMaterial` (material sensible a la luz); solo cuando en la escena hay luz ambiental (intensidad 1.0) y luz direccional (intensidad 2.6), el objeto muestra claroscuro.

💡 Por esto mismo, un mismo color, al girar hacia la cara en sombra, se "oscurece": no es que el color cambie, es que hay menos luz.

### 16.2 RGB: la pantalla mezcla los tres colores primarios

Los monitores mezclan todos los colores con tres haces de luz: **rojo (R), verde (G), azul (B)**. En los colores predefinidos de esta herramienta, `0xff0000` es "rojo máximo, sin verde ni azul = rojo puro".

### 16.3 HSV: la intuición del cerebro humano para elegir colores

Comparado con RGB, a las personas les resulta más natural elegir usando **tono (H, qué color), saturación (S, qué tan vivo), valor/brillo (V, qué tan claro)**. Cuando arrastras en el selector de color, en realidad estás ajustando HSV.

- Tono = rojo, naranja, amarillo, verde, cian, azul, violeta dando una vuelta;
- saturación baja → se vuelve gris; saturación alta → vibrante;
- valor bajo → oscuro; alto → claro (incluso blanquecino).

### 16.4 Los dos parámetros ocultos del material

La superficie del objeto tiene `roughness` (rugosidad/0.6, cuanto mayor, más mate) y `metalness` (sensación metálica/0.0, cuanto mayor, más parecido a metal). Por defecto ahora es más bien "plástico mate". Lo que cambias es el color; estos dos generalmente no se tocan, pero saber que existen ayuda a entender "por qué no hay reflejo especulado".

### 16.5 Opacidad: dejar pasar la luz

Además del color está lo de "si deja pasar o no". Se explica en detalle en el Capítulo 20 más adelante; aquí solo recuerda: opacidad 1 = sólido, 0 = invisible.

❓ **Piénsalo**: ¿Por qué las paredes de los hospitales y los uniformes quirúrgicos suelen usar "azul claro/verde claro de baja saturación"? ¿Cómo afecta la saturación del color al estado de ánimo de las personas?

✏️ **Practica**: Coloca una esfera blanca, cambia a distintas vistas y observa si su cara en sombra se oscurece. Esta es la evidencia直观 de que "la luz moldea el color".

---

## Capítulo 17: 27 colores predefinidos: colorear con un clic

La forma más rápida de colorear es hacer clic directo en un predefinido. Esta herramienta incluye **27**, divididos en cuatro grupos según los comentarios del código fuente:

### 17.1 Blanco, negro y gris (1–3)
| Nombre | HEX | A qué se parece |
| --- | --- | --- |
| Negro | `#000000` | tinta, noche, contorno |
| Blanco | `#ffffff` | papel, nieve, brillo |
| Gris | `#888888` | cemento, fondo neutro |

### 17.2 Tres colores primarios RGB (4–6)
| Rojo | Verde | Azul |
| --- | --- | --- |
| `#ff0000` | `#00ff00` | `#0000ff` |

### 17.3 Tres colores secundarios CMY (7–9)
| Cian | Magenta | Amarillo |
| --- | --- | --- |
| `#00ffff` | `#ff00ff` | `#ffff00` |

### 17.4 Colores extendidos (10–27, paleta moderna más suave)
Rojo brillante `#ff4444`, naranja `#ff8800`, amarillo dorado `#ffcc00`, verde brillante `#44ff44`, azul verdoso `#00cc88`, azul brillante `#4488ff`, violeta `#8844ff`, rosa fucsia `#ff44aa`, cian claro `#6ee7ff`, violeta claro `#c084fc`, rosa claro `#fb7185`, verde esmeralda `#34d399`, ámbar `#fbbf24`, azul cielo `#60a5fa`, rosa `#f472b6`, lavanda `#a78bfa`, rojo coral `#f87171`, gris pizarra `#94a3b8`.

💡 Los colores predefinidos son "combinaciones seguras" ajustadas por el diseñador; los principiantes haciendo clic directo básicamente no quedan feos. Para hacer un color de marca, usa la personalización del Capítulo 18.

✏️ **Practica**: Usa los colores predefinidos para colorear la "farola" del Capítulo 13: el poste en gris pizarra, la caja de la lámpara en ámbar, la cubierta superior en rojo coral. Siente que "la combinación de colores es el carácter".

---

## Capítulo 18: Color personalizado: HEX, HSV y el selector de pantalla

### 18.1 Qué es HEX

HEX es `#` seguido de 6 dígitos hexadecimales, en grupos de dos que representan R, G, B. Por ejemplo el color de marca `#1e90ff` (azul dodger). Para replicar con precisión algún color, rellenar HEX directamente es lo más exacto.

### 18.2 Cómo arrastrar el selector

Haz clic en el botón «selector» del panel derecho y aparecerá una ventana de selección de color, con "gran bloque de color + barra de tono + campos HEX/RGB":
- Haz clic/arrastra en el gran bloque de color → eliges **saturación + valor** (izquierda-derecha controla la intensidad, arriba-abajo controla el brillo);
- arrastra la **barra de tono** de abajo → ajustas el **tono** (recorres el círculo rojo, naranja, amarillo, verde, cian, azul, violeta);
- para precisión absoluta, rellenar números directo en los campos HEX o R/G/B es lo más seguro.

💡 Para buscar "tonos claros/oscuros de la misma familia", fija la **barra de tono sin moverla** y solo arrastra arriba-abajo en el gran bloque de color (cambias el valor), así la combinación queda más armoniosa.

### 18.3 Selector de color de pantalla (cuentagotas)

Algunas versiones ofrecen "tomar color de la imagen": haz clic en el cuentagotas y luego haz clic en cualquier parte de la escena (incluyendo el color de otros objetos, el fondo) y tomas ese color. Es muy conveniente para hacer combinaciones "basadas en la realidad".

### 18.4 Qué es "sin color" (NO_COLOR)

En el código fuente hay una marca especial `NO_COLOR = -1`. Al elegirla, el objeto **no aplica sombreado de color sólido** (a menudo combinado con textura de imagen o material especial, dando un efecto de "sin color de fondo").

⚠️ **Atención**: Si por error eliges "sin color", el objeto se verá "sin pintar/oscuro"; no está roto, solo vuelve a elegir un color normal.

✏️ **Practica**: Con HEX ingresa algún color que te guste (como `#ff6b6b`) y aplícalo a un cubo; luego usa el cuentagotas para tomar un color de algún lugar de la página y compara ambos.

---

## Capítulo 19: 12 patrones de textura: dale historia a la superficie

El color sólido es muy plano; los patrones dan "contenido" al objeto. Esta herramienta incluye **12 patrones** (`PATTERNS`):

| Patrón | A qué se parece / uso |
| --- | --- |
| Sólido | sin patrón, el más limpio |
| Cuadros | tablero de ajedrez, mantel, baldosa |
| Rayas | cebra, señal de advertencia, tela |
| Puntos | vestido de lunares, dulces |
| Degradado | cielo, transición metálica |
| Ladrillo | pared, arquitectura |
| Diagonal | sensación de velocidad, tecnología |
| Onda | ondas de agua, seda |
| Puntos matriz | píxel, panel tecnológico |
| Cruzado | tela de malla, vendaje |
| Cuadrícula | papel milimetrado, ingeniería |
| Espiral | remolino, tubo roscado |

💡 El color del patrón se deriva automáticamente del «color / color de relleno» actual (sin color, el color del patrón es blanco); el panel derecho **no tiene un control separado de "color de patrón"**, cambiar el color cambia el color general.

⚠️ **Atención**: Los patrones complejos (como ladrillo, cuadrícula) aplicados a una esfera con pocas caras se "estiran y deforman", lo cual es normal; para que quede ordenado,优先 aplícalos a cuerpos con muchas caras planas como box/cylinder.

✏️ **Practica**: Coloca un box, prueba sucesivamente "ladrillo", "cuadros", "rayas", y percibe cómo el patrón cambia al instante "a qué se parece" (una pared vs un trozo de tela vs un letrero de advertencia).

---

## Capítulo 20: Subir textura de imagen y opacidad

### 20.1 Subir imagen: pega una foto en la superficie

Además de los patrones predefinidos, también puedes **subir tu propia imagen** (PNG/JPG) como textura de superficie: el logo de la empresa, una foto, un dibajo a mano, todo vale. Una vez pegada, la superficie del objeto "imprime" esa imagen.

- Apto para: paneles con fotos reales, medallas con logo impreso, suelo con mapa pegado;
- tip: la imagen mejor que sea cuadrada y nítida; pegada en la cara frontal del box se ve más clara.

### 20.2 Opacidad (opacity)

El panel derecho puede ajustar la "opacidad":

1 = completamente sólido;
0.1 = casi invisible;
valor intermedio = semitransparente (vidrio, fantasma, sensación de agua).

💡 Hacer "campana de vidrio", "hielo", "aparición fantasmal" depende totalmente de esto. En semitransparencia, los objetos de atrás se traslucen y la sensación de capas se enriquece al instante.

### 20.3 Combinaciones

- patrón + semitransparente = velo difuminado;
- sólido + alta transparencia = ladrillo de vidrio.

❓ **Piénsalo**: Si quisieras representar "un bloque de hielo", ¿cómo combinarías color, opacidad y patrón? Si representaras "una pared de ladrillo pero semitransparente", ¿para qué efecto sería?

✏️ **Practica**: Sube una imagen de tu computadora y pégala en un box plano; luego baja la opacidad de ese box a 0.5 y observa el efecto de "imagen semitransparente".

# Parte 5: Texto e imágenes

Además de las formas, en la escena también se necesitan "texto" y "fotografías" para transmitir información. Esta parte trata sobre los dos tipos de objetos "de contenido": texto e imágenes.

## Capítulo 21: Añadir texto: haz que la escena hable

### 21.1 El texto es una "placa delgada que habla"

Letreros, nombres, avisos, eslóganes… el texto aporta semántica a la escena tridimensional. El objeto de texto es, en esencia, una "superficie plana delgada con texto pegado", que puede ser seleccionada, movida, rotada, escalada y coloreada como un objeto normal.

### 21.2 Tres pasos para añadir texto

1. En el panel izquierdo «Herramientas» selecciona «Añadir texto»;
2. Haz clic una vez en el suelo central y aparecerá un **cuadro de entrada** (el texto de marcador de posición es «Introducir texto······»);
3. Introduce el texto y pulsa **Enter** para confirmar; el texto cae al suelo; dentro del cuadro de entrada, pulsa **Shift + Enter** para cambiar de línea (texto multilínea).

💡 El texto de marcador de posición «Introducir texto······» solo te recuerda "escribe aquí"; no es contenido en sí y no aparecerá en la obra final.

### 21.3 Cambiar el contenido: doble clic

¿Quieres cambiar el texto una vez colocado? **Doble clic** en el objeto de texto y el cuadro de entrada volverá a aparecer; cambia y pulsa Enter. No es necesario borrarlo y volver a añadirlo.

### 21.4 El texto también es un objeto completo

El texto admite todas las operaciones habituales: seleccionar, trasladar (azul adelante/atrás, rojo izquierda/derecha, verde elevar), rotar, escalar, cambiar color y ajustar la opacidad. Puedes hacer "texto luminoso" o "texto semitransparente".

✏️ **Practica**: Añade una línea "Bienvenido" y muévela a la entrada de la escena; luego haz doble clic para cambiarla a "Bienvenido y pase", y Experimenta la comodidad de la edición instantánea.

---

## Capítulo 22: Fuente, tamaño, grosor y orientación horizontal/vertical

Al seleccionar un texto, en el panel derecho aparecen los controles exclusivos de texto. Esta herramienta ofrece **varios conjuntos de fuentes integradas** (5 por idioma, que cambian con el idioma actual de la interfaz) y varios interruptores de composición.

### 22.1 Cómo elegir fuentes (cambia con el idioma)

La lista de fuentes **no es fija**: cambia con el idioma actual de la interfaz — cada idioma tiene 5 fuentes integradas propias. Por ejemplo, el chino simplificado usa por defecto 雅黑 / 宋体 / 楷体 / 黑体 / 仿宋; el inglés usa Arial / Georgia / Times / Courier / Verdana, etc. La tabla siguiente es un ejemplo bajo la interfaz en chino:

| Fuente | Carácter / Uso |
| --- | --- |
| 雅黑 | Moderno, claro; opción predeterminada preferida para chino |
| 宋体 | Formal, con aire de libro |
| 楷体 | Sensación manuscrita, tradicional, rótulos |
| 黑体 | Pesado, títulos llamativos |
| 仿宋 | Documentos oficiales, elegante |
| Arial | Occidental moderno sans-serif |
| Times | Occidental serif, formal |
| Courier | Occidental monoespaciado, sensación de código/máquina de escribir |

💡 El contenido en chino prioriza las cinco primeras; el texto puramente en inglés puede usar las tres últimas para expresar distintos caracteres. Tras cambiar el idioma de la interfaz, el desplegable de fuentes mostrará las fuentes propias de ese idioma.

### 22.2 Tamaño de fuente (predeterminado 80)

El tamaño de fuente predeterminado es **80**, y se puede ajustar en el panel derecho. Demasiado grande fácilmente "rompe" la proporción de la escena; demasiado pequeño no se ve bien.

⚠️ **Atención**: El tamaño de fuente es relativo a las unidades de la escena y debe combinarse con el tamaño de tu figura: asignar un tamaño de 500 a un cubo de 1.2 unidades hará que el texto sea mucho más grande que el objeto.

### 22.3 Grosor (interruptor de negrita)

Un clic para poner en negrita, los títulos resaltan más. Combinado con 黑体/楷体, logra un gran efecto de "rótulo".

### 22.4 Horizontal / Vertical

- **Horizontal**: una línea normal de texto, de izquierda a derecha;
- **Vertical**: se dispone de arriba abajo, adecuado para rótulos chinos, títulos de libros y letreros.

💡 Sugerencia de combinación: vertical + 楷体 + gran tamaño = rótulo tradicional; horizontal + 黑体 + tamaño medio = letrero moderno.

⚠️ **Atención**: Un texto demasiado largo puede exceder el ancho de la placa delgada; dentro del cuadro de entrada pulsa **Shift + Enter** para cambiar de línea, o reduce adecuadamente el tamaño de fuente.

✏️ **Practica**: Haz un rótulo vertical "Casa de té" (楷体, vertical, gran tamaño, color madera) y Experimenta el "carácter" de la combinación de fuentes.

### 22.5 Solo lectura entre idiomas: al cambiar de idioma solo se puede ver

Un objeto de texto **recuerda el idioma en que se creó** (el idioma de los textos de la interfaz). Cuando cambias el idioma de la interfaz a **otro idioma**, los controles exclusivos de ese cuadro de texto **se vuelven automáticamente solo lectura / deshabilitados**: el cuadro de edición del cuerpo, la fuente, el grosor y la orientación horizontal/vertical ya no se pueden cambiar — solo ver. Esto evita que, al reescribir con una fuente de idioma no coincidente, el texto se corrompa o se rompa la composición. En ese momento el desplegable de fuentes solo conserva la fuente propia de ese cuadro de texto, y ya no lista todo el conjunto de fuentes del idioma.

> 📌 ¿Quieres seguir editando? Vuelve el idioma de la interfaz al que se usó al crear el cuadro de texto para recuperar todos los controles.

### 22.6 Árabe prohíbe la disposición vertical

Al cambiar a la interfaz en **árabe (ar)**, el botón de disposición vertical se **deshabilita por fuerza y se fija en horizontal** (el árabe se escribe de derecha a izquierda, y la disposición vertical desordenaría el sentido de lectura). Esta es una prohibición rígida para ese idioma, independiente de la "solo lectura entre idiomas" del 22.5 — no entran en conflicto.

---

## Capítulo 23: Objetos de imagen: introduce fotos en el mundo tridimensional

### 23.1 Añadir un objeto de imagen

En el panel izquierdo «Herramientas» elige «Añadir imagen» → selecciona un archivo de imagen local → haz clic en el suelo y la imagen aparecerá como **placa plana** (como una foto de pie).

### 23.2 Manipúlalo como un objeto normal

Una vez seleccionado se puede mover, rotar y escalar. Puede apoyarse inclinado en la pared, colocarse plano como decoración del suelo o elevarse como rótulo.

### 23.3 La imagen también puede ser "textura"

Como se explicó en el Capítulo 20, la imagen se puede "pegar" en la superficie de cualquier objeto 3D (como material de superficie). Por lo tanto, una misma imagen tiene dos usos:

- **Como placa independiente**: como una "foto" en la escena;
- **Como textura de superficie**: impresa en la superficie de objetos como box / cylinder.

### 23.4 Imagen vs figura 2D

| | Objeto de imagen | Figura 2D |
| --- | --- | --- |
| Contenido | Tu propia foto / Logo | Formas generadas por el software |
| ¿Se puede cambiar de color? | Generalmente como textura, ajuste global | Se puede cambiar a color sólido / patrón |
| Uso típico | Fotos realistas, Logo real | Símbolos, hitos, decoración |

Ambos son "delgados", pueden estar de pie o tumbados; elige según necesites.

✏️ **Practica**: Importa una de tus fotos y haz una "placa plana" de pie en la escena; luego usa la misma imagen como textura en la cara frontal de un box, y compara la diferencia entre los dos usos.

# Parte 6: Pincel y borrador

Los dos capítulos anteriores trataban sobre las "formas estándar"; este trata sobre "dibujo a mano alzada": el pincel te permite dibujar líneas en la escena como si sostuvieras un bolígrafo, y el borrador te permite eliminarlas.

## Capítulo 24: Pincel 2D: dibujar líneas en el suelo

### 24.1 Qué es el pincel 2D

El pincel 2D dibuja **líneas planas** sobre el **suelo (plano XZ)**, como dibujar con un bolígrafo sobre el papel. Es ideal para dibujar patrones adhesivos en el suelo, rutas, garabatos e indicaciones en el suelo.

### 24.2 Cómo usarlo

1. En el panel izquierdo, en «Herramientas», selecciona «Pincel 2D»;
2. En el suelo central, **mantén pulsado el botón izquierdo y arrastra**; al soltar se completa un trazo;
3. Puedes dibujar varios trazos de forma continua.

### 24.3 Mantener Shift para restringir líneas rectas

Mientras arrastras, mantén pulsado **Shift** y la línea se **restringirá a una línea recta** (entre dos puntos). Es muy útil para dibujar "caminos rectos" o "bordes regulares".

> Bloqueo de dirección: una vez activada la restricción de línea recta, **durante este trazo (dibujado manteniendo pulsado el botón izquierdo) y antes de terminarlo, la dirección permanece bloqueada en la dirección horizontal / vertical / 45° determinada la primera vez**, aunque el ratón se desvíe durante el trazado no cambiará. Para cambiar de dirección, debes soltar el botón izquierdo y empezar un nuevo trazo.

### 24.4 Las cuatro propiedades del pincel

En el panel derecho (cuando el pincel está activo) puedes configurar:

| Propiedad | Función |
| --- | --- |
| Color | El color de la línea |
| Grosor | Qué tan ancha es la línea |
| Opacidad | Si la línea es sólida o no |
| Espaciado mínimo | La distancia mínima entre puntos de muestreo; cuanto menor, más suave y más densos los puntos |

💡 Cuanto menor sea el "espaciado mínimo", más fina será la línea pero más vértices tendrá; cuanto mayor, más ahorro, pero con mayor sensación de polilínea. Reduce el valor para dibujar curvas precisas; aumenta el valor para bocetos.

### 24.5 Pincel vs figura 2D

- Las figuras 2D son "formas estándar" (círculo, corazón…), cuyo color y patrón se pueden modificar;
- El pincel 2D es "cualquier línea dibujada a mano", libre pero irregular.

Para símbolos estándar usa figuras; para garabatear a mano alzada usa el pincel.

✏️ **Practica**: con el pincel 2D dibuja un símbolo "∞" en el suelo, luego mantén Shift y dibuja una línea recta que lo atraviese, para sentir la diferencia entre línea libre y línea restringida.

---

## Capítulo 25: Pincel 3D y plano de referencia

### 25.1 Qué es el pincel 3D

El pincel 3D dibuja **tubos tridimensionales en el espacio** — no se adhieren al suelo, sino que son "líneas de tubo" suspendidas en el aire. Te permite "pintar en el aire".

### 25.2 Plano de referencia: el primer trazo decide "en qué capa se dibuja"

Cuando el pincel 3D se hace clic por primera vez, se determina un **plano de referencia semitransparente**. Los arrastres posteriores se refieren a este plano, y las líneas caen cerca de él.

💡 ¿Quieres dibujar **líneas horizontales**? Primero cambia a «Vista superior», haz clic para determinar un plano de referencia horizontal; ¿quieres dibujar **líneas verticales**? Cambia a «Vista frontal / Vista izquierda / Vista derecha» y luego determina un plano vertical. La orientación del plano de referencia decide la "dimensión" de lo que dibujas.

### 25.3 Dibujar en el plano, Shift restringe líneas rectas

- Arrastra libremente sobre el plano de referencia para dibujar;
- Mantén pulsado **Shift** y arrastra para restringir a una línea recta (igual que la restricción Shift del pincel 2D, pero aplicada a los tubos espaciales).

> Bloqueo de dirección: igual que antes, tras restringir la línea recta con Shift, **la dirección queda bloqueada hasta que termina el trazo**, no se puede cambiar a mitad, hay que soltar y empezar un nuevo trazo para cambiar de dirección.

### 25.4 Tapa esférica en los extremos

Ambos extremos de cada trazo se cierran automáticamente con **tapas esféricas**, de modo que los inicios y fines de la línea son redondeados y no se rompen, como si a un tubo real se le añadieran tapas en los extremos.

### 25.5 Usos

- Esculpir al azar cintas, conexiones, haces de energía;
- Dibujar "líneas dinámicas" en la escena (más orgánicas que colocar cuerpos estándar);
- Hacer arte abstracto, esquemas de circuitos.

❓ **Piénsalo**: ¿el concepto de "plano de referencia" del pincel 3D es lo mismo que cuando un pintor "primero monta una hoja de papel"? ¿Por qué en tres dimensiones se necesita especialmente ese "papel virtual"?

✏️ **Practica**: cambia a «Vista superior», usa el pincel 3D para determinar un plano de referencia horizontal y dibuja una línea ondulada; luego cambia a «Vista frontal» y dibuja otra línea vertical, para sentir la diferencia de dimensión de las líneas espaciales.

---

## Capítulo 26: Borrador: total y parcial

Si te equivocas al dibujar, debes poder borrar. Esta herramienta de borrador tiene dos modos, con comportamientos distintos; conviene distinguirlos bien.

### 26.1 Dónde cambiar entre los dos modos

En las propiedades del borrador del panel derecho está «Modo de borrador»: **Borrado total / Borrado parcial**.

### 26.2 Borrado total (predeterminado)

Arrastra el círculo del borrador; lo que toque se **elimina como objeto completo** (un pincel entero, una figura completa). Es una limpieza "a lo grande".

💡 Para eliminar rápidamente un trazo 3D completo o una figura completa, usa el modo total: encerrando se elimina.

### 26.3 Borrado parcial

Al activar «Borrado parcial»:

- **Trazo 2D**: solo se borra **el segmento que intersecta** el círculo del borrador, el resto se conserva (retoque fino de líneas);
- **Trazo 3D**: igualmente solo se borran **los puntos de trayectoria del segmento que intersecta** el círculo del borrador, el resto se conserva (tanto los trazos 2D como 3D admiten borrado parcial por segmentos);
- **Otros objetos** (figuras 3D/2D estándar, texto, imágenes): siguen eliminando el **objeto completo** (eliminación total).

⚠️ **Atención**: el modo parcial solo borra por segmentos los "trazos de pincel (2D y 3D)"; para las figuras estándar, texto e imágenes, sigue siendo eliminación de objeto completo. No esperes usar el modo parcial para "mordisquear una esquina de un cubo".

### 26.4 Tamaño del borrador

Usa el deslizador «Tamaño del borrador» para ajustar el radio del círculo del borrador; tanto el retoque fino de detalles como la limpieza de gran alcance dependen de él. Un círculo demasiado pequeño requiere muchos borrados, uno demasiado grande borra fácilmente por error a los vecinos.

### 26.5 Borrar por error se puede recuperar

Los objetos eliminados por el borrador entran en el historial como cualquier otra operación — pulsando `Ctrl+Z` se pueden recuperar. Así que borra con confianza.

✏️ **Practica**: con el pincel 2D dibuja una curva larga, primero activa «Borrado parcial» y borra un pequeño segmento de ella (el resto sigue ahí); luego cambia a «Borrado total», encierra otro trazo y observa cómo se elimina por completo. Compara los dos modos.

---

# Parte 7: Vistas y observación

"Mirar desde otro ángulo" a menudo lo aclara todo. Esta parte explica cómo observar y fijar tu ángulo de observación.

## Capítulo 27 Siete vistas predefinidas: mira el mundo desde otro ángulo

### 27.1 Por qué cambiar de vista

El ojo humano solo tiene un ángulo, lo que facilita juzgar mal "adelante/atrás, izquierda/derecha, quién es más alto". Cambiar de vista con un clic equivale a dar una vuelta alrededor de la obra. En la barra inferior hay **7 botones de vista**.

### 27.2 Las siete vistas una por una

| Vista | Parece que estás… | Plano principal visible (etiqueta web) |
| --- | --- | --- |
| Perspectiva | De pie, viendo con normalidad | Cercano grande, lejano pequeño, lo más natural |
| Vista superior | Mirando desde arriba, en picado | Plano X (azul/delante-detrás) × Y (rojo/izquierda-derecha) |
| Vista inferior | Mirando desde abajo, en contrapicado | Igual que la vista superior, pero invertida |
| Vista frontal | Mirando de frente, a la altura de los ojos | Plano Y (rojo/izquierda-derecha) × Z (verde/altura) |
| Vista posterior | Mirando desde atrás, a la altura de los ojos | Igual que la vista frontal, sentido opuesto |
| Vista izquierda | Mirando desde la izquierda, a la altura de los ojos | Plano X (azul/delante-detrás) × Z (verde/altura) |
| Vista derecha | Mirando desde la derecha, a la altura de los ojos | Igual que la vista izquierda, sentido opuesto |

💡 Recuerda la etiqueta web: **X azul=delante-detrás, Y rojo=izquierda-derecha, Z verde=altura**. La vista superior muestra "delante-detrás × izquierda-derecha" (suelo), la vista frontal muestra "izquierda-derecha × altura" (fachada).

### 27.3 Cuándo usar cada una

- **Perspectiva**: observación general, capturas de pantalla para mostrar;
- **Vista superior**: posicionamiento preciso, alinear una fila de objetos (la planta superior es la más precisa);
- **Vista frontal / izquierda / derecha**: comprobar "si está recto" "si está alineado", hacer composiciones simétricas;
- **Vista inferior / posterior**: poco comunes, pero sirven para verificar si "la parte trasera / la base" es como se espera.

❓ **Piénsalo**: ¿Por qué los arquitectos dibujan "planos, alzados, alzados laterales"? De estas siete vistas, ¿cuáles corresponden a estos tres tipos de planos técnicos?

✏️ **Practica**: coloca 3 figuras distintas, haz clic en vista superior, frontal y derecha respectivamente, y observa las diferencias de "apariencia" de la misma escena bajo distintas vistas.

---

## Capítulo 28 Ocultar ayudas y pantalla completa

### 28.1 Ocultar ejes y cuadrícula

En la barra superior hay tres interruptores: «ejes», «malla» y «suelo»:

- Ocultar ejes: elimina las tres flechas con letras;
- Ocultar cuadrícula: elimina los cuadros del suelo;
- Alternar suelo: controla la visualización y ocultación del plano de referencia semitransparente (plano de referencia donde caen los objetos). Al exportar la obra o buscar una imagen limpia, se pueden ocultar todos a la vez.

⚠️ **Atención**: antes de capturar pantalla / exportar imagen de presentación, se recomienda **ocultar primero los ejes y la cuadrícula**, para una imagen más limpia y con más "sensación de producto terminado". Son solo ayudas y no afectan a la obra en sí.

### 28.2 Pantalla completa

| Forma | Modo de pantalla completa |
| --- | --- |
| 🖥️📱 **Versión web** | Haz clic en el botón «Pantalla completa» de la barra superior; 🖥️ en la versión de ratón también se puede pulsar **F11**. Entra en **pantalla completa del navegador**, la página ocupa toda la pantalla |
| 💻 **Versión PC** | Sin botón «Pantalla completa»; pulsar **F11** o el botón «Maximizar» de la barra de título equivale a **maximizar / restaurar ventana** (no es pantalla completa real) |
| 🤖 **Versión Android** | **Sin botón de pantalla completa** — la aplicación se ejecuta a pantalla completa por sí misma, no es necesario cambiar |

🖥️ En la versión web·ratón, pulsar **Esc** solo cierra controles / cancela la selección, **no** sale de pantalla completa; para salir de pantalla completa pulsa **F11** otra vez o haz clic de nuevo en el botón «Pantalla completa». 💻 En la **versión PC**, pulsar **F11** es maximizar/restaurar, y volver a pulsar **F11** sale de ese estado (la versión PC no tiene botón «Pantalla completa»).

### 28.3 Una combinación útil

> Para obtener una imagen de presentación limpia: ocultar ejes + ocultar cuadrícula + cambiar a perspectiva + (🖥️📱💻 opcional) pantalla completa + captura de pantalla.

✏️ **Practica**: crea una pequeña escena, primero oculta ejes/cuadrícula y captura una "imagen limpia"; luego muéstralos y captura una "imagen con líneas de ayuda", y compara la diferencia de impresión que dan a otros.

---

# Parte 8: Eficiencia — haz "volar" tus manos

> Si comparamos los siete artículos anteriores con "aprender los movimientos", este artículo es "cultivar la fuerza interna". Por muy familiarizados que estés con los movimientos, si cada vez que mueves un objeto tienes que arrastrar el control deslizante de la derecha y cada vez que borras algo tienes que hacer clic en un botón, la velocidad no mejorará.
>
> Quienes realmente lo usan con soltura casi no tocan los controles deslizantes: usan el **teclado**. Este capítulo te libera de tu "dependencia del ratón".

> 📌 **Cómo leer esta parte (importante)**
> - 🖥️💻 **Web·ratón / PC**: Todo este artículo es aplicable y es clave para aumentar tu velocidad; léelo con atención.
> - 📱🤖 **Web·táctil / Android**: Sin teclado físico, los **atajos de teclado** de los capítulos 29, 31 y 32 **no son aplicables**,
>   y la zona de ayuda «atajos de teclado» no se mostrará dentro de la aplicación. Por favor, **salta directamente a la [tabla de gestos del Capítulo 30](jump:Capítulo 30 Operaciones con ratón y gestos: explicadas para las cuatro formas)**, esa es tu herramienta de eficiencia.
>   (Si conectas un teclado físico a tu tablet, los atajos también funcionarán y puedes leerlos juntos.)

---

## Capítulo 29 Por qué memorizar los atajos: el interés compuesto de la eficiencia

### 29.1 Un hecho subestimado

Haz un pequeño experimento: coloca un cubo en la escena, luego arrastra 10 veces hacia adelante y hacia atrás el control deslizante "escala uniforme" en su "panel de propiedades derecho" con el ratón, y luego pulsa 10 veces las teclas `+` / `-` del teclado.

Casi con seguridad descubrirás: **el teclado es más rápido, más preciso y menos cansado.**

Hay tres razones:
1. **Las manos no abandonan la zona central del teclado** — los ojos miran la pantalla, los dedos están sobre las teclas de letras, y el cerebro no tiene que alternar repetidamente entre "mirar la pantalla → buscar el panel → mover el ratón → arrastrar el control deslizante".
2. **Tiene un paso fijo** — pulsar una vez la tecla de dirección mueve el objeto exactamente "0.1 de celda"; pulsar 10 veces son exactamente 1 celda. Arrastrar el control deslizante 10 veces, no tienes ni idea de cuánto se movió.
3. **Se puede acumular y deshacer** — cada operación de teclado entra en la pila de historial (ver [Capítulo 32](jump:Capítulo 32 Controles deslizantes/cuadros de entrada y combinaciones con Ctrl)), si te equivocas basta un `Ctrl+Z` para retroceder; en cambio, arrastrar el control deslizante es un cambio continuo, y al deshacer suele "saltar" de forma brusca.

💡 **Una frase de principio**: el ratón se encarga de "seleccionar" y "dibujar", el teclado se encarga de "modificar" y "ajustar". Trabajando en equipo, la eficiencia se duplica.

### 29.2 Los atajos también dependen de "la situación"

Los atajos de esta herramienta no significan "lo mismo de forma global", sino que **dependen de si hay un objeto seleccionado en ese momento**:

| Estado actual | ¿Qué hacen las teclas de dirección / A D W S? |
|---|---|
| **Ningún objeto seleccionado** | Se mueve la **cámara** (estás observando la escena girando en torno a ella) |
| **Objeto seleccionado** | Se mueve **ese objeto** (el objeto se desplaza/gira en la escena) |

Una misma tecla `↑`, cuando no hay nada seleccionado significa "empujar la cámara hacia adelante" y cuando hay algo seleccionado significa "el objeto avanza". Esta diferencia es el núcleo de todo el sistema de atajos; grábala en la mente primero para no confundirte después.

❓ **Piénsalo**: ¿por qué es un diseño razonable que "sin selección se mueva la cámara"? — Porque en ese momento lo más probable es que estés "buscando un ángulo, viendo el conjunto", y dejar que el teclado desplace/rote la vista directamente es más preciso que arrastrar un espacio en blanco (arrastrar en blanco es continuo y sin paso fijo).

### 29.3 Repasemos primero el "lenguaje de los ejes de coordenadas"

Todas las expresiones "a lo largo del eje X / Y / Z" de este artículo se memorizan según la **marcación de la página** (coincide con las etiquetas de ejes que ves en la pantalla):

- **Eje X (azul) = dirección frontal/trasera** (azul ≈ "deep/profundidad")
- **Eje Y (rojo) = dirección izquierda/derecha** (rojo ≈ "izquierda/derecha")
- **Eje Z (verde) = dirección de altura, hacia arriba es positivo** (verde ≈ "altura")

> ⚠️ Recordatorio: estos son los "ejes según la marcación de página". Internamente el código usa otro sistema (X rojo, Y verde, Z azul, Y hacia arriba), pero lo que ves en la interfaz, en el manual y en el panel de ayuda siempre es el sistema de marcación de arriba. Basta con memorizar los ejes de marcación; no te dejes distraer por la implementación interna.

Memoriza esta tabla; cada capítulo posterior "construye frases" con ella.

---

## Capítulo 30 Operaciones con ratón y gestos: explicadas para las cuatro formas

Las "operaciones rápidas" de esta herramienta se **cambian automáticamente según el dispositivo**:

- 🖥️💻 **Web·ratón y PC** → muestra y usa «operaciones con ratón» (30.1);
- 📱🤖 **Web·táctil y Android** → muestra y usa «operaciones con gestos» (30.2).

Las dos tablas siguientes son **idénticas** a las secciones "operaciones con ratón" y "operaciones con gestos" en «Configuración → Operaciones rápidas» dentro de la aplicación; consúltalas según la forma que tengas en mano.

### 30.1 Operaciones con ratón (🖥️ Web·ratón / 💻 PC)

| Operación | Descripción |
|---|---|
| Clic izquierdo | Seleccionar objeto/control |
| Doble clic izquierdo | Editar texto |
| Mantener clic izquierdo | Operar objeto/control |
| Mantener clic derecho | Rotar la vista |
| Mantener rueda | Desplazar la vista |
| Deslizar rueda | Zoom de la vista |

### 30.2 Operaciones con gestos (📱 Web·táctil / 🤖 Android)

| Operación | Descripción |
|---|---|
| Tocar con un dedo | Seleccionar objeto/control |
| Doble toque con un dedo | Editar texto |
| Mantener un dedo sobre objeto | Añadir/quitar selección (equivale a clic con `Shift`) |
| Arrastrar objeto con un dedo | Operar objeto/control |
| Arrastrar espacio en blanco con un dedo | Rotar la vista |
| Tocar suavemente espacio en blanco con un dedo | Cancelar selección |
| Botón «Seleccionar todo» | Seleccionar todos los objetos |
| Botón «Selección de cuadro» | Al activarlo, arrastrar con un dedo para selección de cuadro de objetos |
| Arrastrar con dos dedos | Desplazar la vista |
| Pellizcar con dos dedos | Zoom de la vista |
| Clic en botón de retroceso (🤖 **solo Android**) | Mismo efecto que `Esc`: primero cierra capa por capa las ventanas superiores como notas/menú/manual, luego cierra el control / cancela la selección; si no hay ventana, ni herramienta, ni selección, muestra **confirmación de salida** |

⚠️ 📱🤖 El extremo táctil solo tiene el comportamiento "clic en botón de retroceso" en la versión **Android** (el botón de retroceso del navegador/sistema del teléfono **abandonará la página** o saldrá de la aplicación, y no activa esta lógica). Para la web·táctil fuera de juegos móviles, usa en su lugar los botones de cierre de la interfaz y la operación equivalente a `Esc` (tocar suavemente el espacio en blanco con un dedo para cancelar la selección).

### 30.3 Tabla de correspondencia uno a uno ratón ↔ gestos

Los dos conjuntos de operaciones son esencialmente dos formas de entrada de una misma acción:

| Intención | 🖥️💻 Ratón | 📱🤖 Gesto |
|---|---|---|
| Seleccionar | Clic izquierdo | Tocar con un dedo |
| Editar texto | Doble clic izquierdo | Doble toque con un dedo |
| Añadir / quitar selección | `Shift` + clic | Mantener un dedo sobre objeto |
| Operar objeto | Arrastrar con clic izquierdo mantenido | Arrastrar objeto con un dedo |
| Rotar la vista | Mantener clic derecho | Arrastrar espacio en blanco con un dedo |
| Desplazar la vista | Mantener rueda | Arrastrar con dos dedos |
| Zoom de la vista | Deslizar rueda | Pellizcar con dos dedos |
| Seleccionar todo | `Ctrl + A` | Botón «Seleccionar todo» |
| Selección de cuadro | Arrastrar directo en espacio en blanco | Botón «Selección de cuadro» → arrastrar con un dedo |
| Cancelar / retroceder | `Esc` | Tocar suavemente espacio en blanco con un dedo |

💡 Solo cambia el "órgano de entrada". El extremo táctil no tiene teclado; estos gestos y los dos botones exclusivos son todas tus "operaciones rápidas".

---

## Capítulo 31 Operaciones de una tecla y combinaciones con Shift

Los atajos de teclado tienen una regla central: **depende de si hay un objeto seleccionado en ese momento**. Las dos tablas siguientes son **idénticas** a las secciones "operaciones de una tecla" y "combinaciones con Shift" en «Configuración → Operaciones rápidas» dentro de la aplicación; úsalas directamente como referencia.

### 31.1 Operaciones de una tecla

> Con objeto seleccionado: desplazar 0.1 celda (0.15 de longitud) / rotar 5°; sin selección: desplazar la vista 0.1 celda / rotar 5°.

| Tecla | Con objeto seleccionado | Sin selección |
|---|---|---|
| `↓` / `↑` | Desplazar a lo largo del eje X +/− | Desplazar la vista hacia atrás / adelante |
| `→` / `←` | Desplazar a lo largo del eje Y +/− | Desplazar la vista hacia la derecha / izquierda |
| `PgUp` / `PgDn` | Desplazar a lo largo del eje Z +/− | Desplazar la vista hacia arriba / abajo |
| `A` / `D` | Rotar en sentido horario / antihorario alrededor del eje Z | Rotar la vista a la izquierda / derecha |
| `W` / `S` | Rotar en sentido horario / antihorario alrededor del eje Y | Rotar la vista hacia arriba / abajo |
| `E` / `Q` | Rotar en sentido horario / antihorario alrededor del eje X | — |
| `+` / `-` | Ampliar / reducir 5% | — |
| `Esc` | Cancelar operación | Cerrar control |
| `F11` | 🖥️📱 Pantalla completa / salir de pantalla completa; 💻 Maximizar / restaurar | (igual que arriba) |
| `Del` / `Backspace` | Eliminar objeto seleccionado | — |

✏️ **Practica**: coloca un cubo → selecciónalo y pulsa `↑` para verlo "avanzar"; cancela la selección (haz clic en espacio en blanco) y vuelve a pulsar `↑`, esta vez la cámara avanza. Una misma tecla, dos identidades.

### 31.2 Combinaciones con Shift

> Con objeto seleccionado: desplazar 1 celda (1.5 de longitud) / rotar 90°; sin selección: desplazar la vista 1 celda / rotar 90°.

| `Shift` + tecla | Con objeto seleccionado | Sin selección |
|---|---|---|
| `↓` / `↑`, `→` / `←`, `PgUp` / `PgDn` | Desplazar 1 celda | Desplazar la vista 1 celda |
| `A` / `D`, `W` / `S`, `E` / `Q` | Rotar 90° | Rotar la vista 90° |
| `+` / `-` | Ampliar ×2 / reducir ×0.5 | — |
| Clic izquierdo | Añadir objeto a selección (selección puntual) | (igual que arriba) |
| Mantener clic izquierdo (herramienta de pincel) | — | Modo de línea recta restringida del pincel (al dibujar, el trazo se restringe a horizontal / vertical / 45°, mismo efecto que la restricción `Shift`) |

💡 Truco: **la tecla normal acerca, la tecla Shift coloca**. Primero usa las teclas de dirección para ajustar hasta que esté más o menos, y luego `Shift`+tecla de dirección da el último salto grande de 1 celda para alinear al instante; lo mismo para rotar: primero `A` rota 5°, luego `Shift+A` completa directo a 90° para enderezar.

---

## Capítulo 32 Controles deslizantes/cuadros de entrada y combinaciones con Ctrl

### 32.1 Controles deslizantes / cuadros de entrada

Cuando sitúas el cursor en un control deslizante o en un cuadro de entrada numérico, las teclas de abajo "modifican el número de ese cuadro" en lugar de manipular el objeto — los atajos originales **se desactivan temporalmente**. Esta tabla es **idéntica** a la sección "controles deslizantes / cuadros de entrada" en «Configuración → Operaciones rápidas» dentro de la aplicación.

| Tecla | Control deslizante | Cuadro de entrada |
|---|---|---|
| `→` / `←` | Aumentar / reducir | Mover el cursor |
| `↑` / `↓` | Aumentar / reducir | Aumentar / reducir |
| `+` / `-` | — | Ingresar signo positivo / negativo |
| `PgUp` / `PgDn` | Aumentar / reducir en gran cantidad | Desplazar hacia arriba / abajo la barra derecha |

⚠️ Si quieres usar los atajos de objeto, primero haz clic en un espacio en blanco de la pantalla o en un objeto, para que el foco salga del cuadro de entrada.

### 32.2 Combinaciones con Ctrl

| `Ctrl` + tecla | Combinación |
|---|---|
| `A` | Seleccionar todo |
| `N` | Nueva escena |
| `O` | Importar escena |
| `S` | Exportar escena |
| `P` | Captura de pantalla y exportar imagen |
| `Z` | Deshacer |
| `Y` | Rehacer |
| `C` | Copiar |
| `V` | Pegar |
| `D` | Clonar |
| `Del` / `Backspace` | Vaciar escena (muestra el cuadro de confirmación "¿Confirmar vaciar la escena? Esta operación se puede deshacer.", y al confirmar vacía; el `Delete`/`Backspace` normal sin `Ctrl` solo elimina los objetos ya seleccionados) |

⚠️ `Ctrl + Del` borra todos los objetos de una vez, pero **muestra un cuadro de confirmación** y la operación de vaciado **se puede deshacer** (recuperar con `Ctrl + Z`). Aun así se recomienda exportar una copia de respaldo con `Ctrl + S` antes de vaciar.

### 32.3 Práctica integral: construir un "pequeño faro" solo con el teclado

Une lo aprendido en este artículo en una línea de producción:

1. Arrastra un **cilindro** desde el panel a la escena (solo se puede arrastrar con ratón, aceptémoslo);
2. Selecciónalo y pulsa `Shift + PgUp` varias veces para "alargarlo" hasta una posición adecuada;
3. `Ctrl + D` clona uno como "cámara de la luz", `PgUp` para moverlo a la cima de la columna;
4. `Shift + A` endereza la cámara de la luz 90° (si es necesario);
5. `Ctrl + A` selecciona todo, `Ctrl + S` guarda;
6. Pulsa el botón "vista frontal" para enderezar la vista, `Ctrl + P` captura y entrega.

A excepción del paso 1 de colocar la forma, casi no tocaste el panel del ratón — este es el final de la "parte de eficiencia": dejar que las manos crezcan sobre el teclado.

---

✏️ **Resumen de esta parte**: la esencia de los atajos es "mapear las acciones frecuentes a los puntos donde los dedos caen más naturalmente". Recuerda dos líneas maestras — **sin selección = mover la cámara, con selección = mover el objeto**; recuerda los tres ejes — **X frontal/trasera, Y izquierda/derecha, Z altura**; recuerda una tecla de aceleración — **Shift para el gran paso**. En el próximo artículo explicaremos "el control de transformación (esa flecha que se puede arrastrar directamente)" y cómo combinarlo con el teclado para que tu control sea más fluido.

---

# Parte 9: Transformación — las flechas que "hablan"

> En el capítulo 32 usaste el teclado para mover objetos de aquí para allá, y ya era bastante rápido. Pero el teclado tiene un "paso fijo" —es ideal para movimientos precisos y repetitivos, pero no sirve para tareas como "arrastrar a ojo hasta que quede justo pegado a otro objeto".
>
> El protagonista de esta parte son ese grupo de **flechas / anillos / cubos de colores** que aparecen sobre el objeto cuando lo seleccionas; en la jerga se llaman "controles de transformación" (gizmo). Te permiten "agarrar" el objeto directamente con el ratón y arrastrarlo.

---

## Capítulo 33: Primer encuentro con los controles de transformación: tres "herramientas de agarre"

### 33.1 Cuándo aparecen

Siempre que **selecciones un objeto** (haz clic sobre él y aparecerá el recuadro de selección), en el centro del objeto flotará un conjunto de manijas. Eso son los controles de transformación.

Tienen tres "apariencias", que corresponden a tres operaciones, y se cambian desde el área «Modo de transformación» del panel derecho (una pequeña zona con tres botones cuadrados ⇔ ↻ ⤢):

| Modo | Icono del botón | Aspecto de la manija | Para qué sirve |
|---|---|---|---|
| **Traslación** | ⇔ | Tres **flechas** | Mover el objeto de un lado a otro |
| **Rotación** | ↻ | Tres **anillos** | Girar el objeto |
| **Escala** | ⤢ | Tres **cubos** (pequeños cubos en las esquinas) | Agrandar o reducir el objeto |

Por defecto se entra en el modo **Traslación**. Para cambiar de modo, haz clic en el botón correspondiente; al cambiar, también aparecerá un texto de sugerencia en la parte inferior ("Traslación/Rotación/Escala").

💡 Dato útil: los controles de transformación y los atajos de teclado son **dos formas de entrada para la misma cosa** —el teclado es "paso preciso" y los controles son "arrastre libre". Ambos se pueden combinar: primero arrastra con los controles para un borrador, y luego usa el teclado `↑` para ajustar unos pocos espacios y alinear. El capítulo 36 explicará específicamente cómo combinarlos.

### 33.2 Una "trampa de color" que debe aclararse de antemano

⚠️ **El aviso más importante de toda la parte, léelo sí o sí.**

Las **etiquetas de los ejes de coordenadas** en la escena usan "colores de anotación de página":
- **X = azul = adelante/atrás**
- **Y = rojo = izquierda/derecha**
- **Z = verde = altura**

Pero el coloreado de las manijas de los controles de transformación sigue la **convención de ejes de código de three.js** (rojo=X, verde=Y, azul=Z), ¡que **no coincide con los colores** de arriba! Así que los colores de las manijas que ves hay que traducirlos así:

| Color de la manija | Eje de código que representa en realidad | Eje de anotación de página correspondiente | Qué significa en pantalla |
|---|---|---|---|
| 🔴 Manija roja | Código X | Página **Y** | Movimiento **izquierda/derecha** / alrededor del eje izquierda-derecha |
| 🟢 Manija verde | Código Y | Página **Z** | **Altura** (arriba/abajo) movimiento / alrededor del eje de altura |
| 🔵 Manija azul | Código Z | Página **X** | Movimiento **adelante/atrás** / alrededor del eje adelante-atrás |

> Si no lo recuerdas, recuerda una frase: **manija roja = izquierda/derecha, manija verde = arriba/abajo, manija azul = adelante/atrás** (según la anotación de página). No dejes que su rojo/verde/azul superficial te engañe para aplicar "el color de las etiquetas de ejes de la escena".

✏️ **Practica (para verificar)**: selecciona un cubo y cambia al modo de traslación. Primero arrastra la **flecha roja**; ¿el objeto se desliza "izquierda/derecha" o "adelante/atrás"? —Debería ser izquierda/derecha. Luego arrastra la **flecha azul**, ¿se desliza "adelante/atrás"? Usa este experimento para grabar la tabla de arriba en tu cabeza; más adelante, todos los ejes de rotación/escala no se desordenarán.

### 33.3 Mientras arrastras manijas, ¿se puede mover la vista?

Sí, y este es un diseño muy cómodo de esta herramienta:

- **Arrastrar manija con botón izquierdo** = manipular el objeto;
- **Arrastrar con botón derecho** = rotar la vista (gira la cámara);
- **Arrastrar con botón central** = trasladar la vista;
- **Rueda** = escalar la vista.

Es decir, con la mano izquierda mantienes el botón derecho para girar un ángulo y ver el lado del objeto, y la mano derecha (o la misma mano cambiando de botón) puede seguir arrastrando la manija —la vista y la transformación **no se estorban**. Ya no tienes que "salir de la transformación, girar la vista, y volver a entrar" con tanto lío.

---

## Capítulo 34: Modo de traslación: "agarra" el objeto con las flechas y hazlo caminar

### 34.1 Tres formas de arrastrar

En el modo de traslación, además de las tres flechas de eje, los controles ofrecen **dos bloques planos** (pegados al plano formado por dos ejes). Así tienes tres formas de agarrar:

1. **Agarrar una sola flecha** (roja/verde/azul) → solo puedes ir en línea recta a lo largo de ese único eje, es lo más preciso y no se desvía;
2. **Agarrar el bloque plano** (por ejemplo, la cara entre la flecha roja y la verde) → te deslizas libremente en ese plano, pero restringido por los dos ejes a la vez;
3. ¿Quieres arrastrar libremente "pegado al suelo sin rumbo"? Primero cambia al plano correspondiente y luego arrastra.

💡 Experiencia: para hacer "alineación precisa", siempre **agarra una sola flecha**, no agarres el plano —el plano fácilmente lleva el objeto en una dirección que no quieres.

### 34.2 Cómo reconocer el plano (combinado con la trampa de color)

Los planos en el modo de traslación son "la zona triangular/cuadrada formada entre dos flechas adyacentes". Según la traducción de la sección 33.2:

- El plano formado por la flecha roja (izquierda/derecha) + flecha verde (arriba/abajo) = plano **izquierda/derecha × altura** (el "lado" del objeto);
- El plano formado por la flecha verde (arriba/abajo) + flecha azul (adelante/atrás) = plano **altura × adelante/atrás** (el "frente/espalda" del objeto);
- El plano formado por la flecha roja (izquierda/derecha) + flecha azul (adelante/atrás) = plano **izquierda/derecha × adelante/atrás** = **suelo** (el plano sobre el que el objeto "pisa").

✏️ **Practica**: coloca el objeto sobre el suelo y agarra el bloque plano formado por "rojo + azul" para arrastrar —¿se desliza obediente pegado al suelo, sin subir ni hundirse? Esta es la postura más estable para "trasladar sobre el suelo".

### 34.3 Aprende contrastando con la traslación por teclado

| Acción deseada | Con controles | Con teclado (capítulo 32) |
|---|---|---|
| Mover con precisión 0.1 espacio adelante/atrás | Arrastrar **flecha azul** | `↑`/`↓` |
| Mover con precisión 0.1 espacio izquierda/derecha | Arrastrar **flecha roja** | `←`/`→` |
| Subir/bajar con precisión en altura | Arrastrar **flecha verde** | `PgUp`/`PgDn` |
| Mover de un gran paso 1 espacio | Arrastrar fuerte la flecha con controles | `Shift`+teclas de dirección |

💡 Truco: **los controles manejan el "tacto", el teclado maneja la "precisión"**. Primero arrastra con los controles hasta que esté casi perfecto, y luego usa el teclado `↑`/`←`/`PgUp` para ajustar unos pocos espacios y pegarte a las líneas de la cuadrícula.

---

## Capítulo 35: Modo de rotación: el anillo decide "alrededor de qué eje girar"

### 35.1 Tres anillos = la rotación de tres ejes

Cambia al modo de rotación (↻) y el objeto se convierte en tres anillos de colores; cada anillo representa "girar alrededor de ese eje":

| Color del anillo | Eje de código | Eje de anotación de página | Sensación (recuerda la analogía del capítulo 32) |
|---|---|---|---|
| 🔴 Anillo rojo | Código X | Página **Y** (eje izquierda/derecha) | Como dar **vueltas de frente/caer hacia atrás** |
| 🟢 Anillo verde | Código Y | Página **Z** (eje de altura) | Como un **plato giratorio/trompo** girando en su sitio |
| 🔵 Anillo azul | Código Z | Página **X** (eje adelante/atrás) | Como **caer a la izquierda/derecha** volteándose de lado |

⚠️ Fíjate en la correspondencia entre el color del anillo y "alrededor de qué eje gira";同样 hay que aplicar la tabla de traducción de la sección 33.2 —**anillo rojo alrededor del eje izquierda/derecha, anillo verde alrededor del eje de altura (el más usado, para enderezar), anillo azul alrededor del eje adelante/atrás**.

### 35.2 Agarrar el anillo para girar es lo mismo que el teclado A/D/W/S/E/Q

En el capítulo 32 usaste el teclado para girar objetos, donde se decía:
- `A`/`D` giran alrededor del **eje de altura** (página Z, eje vertical);
- `W`/`S` giran alrededor del **eje izquierda/derecha** (página Y);
- `E`/`Q` giran alrededor del **eje adelante/atrás** (página X).

Correspondiente a los anillos de los controles:
- Teclado `A`/`D` ↔ arrastrar **anillo verde** (eje de altura);
- Teclado `W`/`S` ↔ arrastrar **anillo rojo** (eje izquierda/derecha);
- Teclado `E`/`Q` ↔ arrastrar **anillo azul** (eje adelante/atrás).

✏️ **Practica**: selecciona un objeto con "frente", pulsa `Shift + A` para que gire exactos 90° (enderezar), y luego cambia al modo de rotación para arrastrar el **anillo verde** —verás que arrastrando a mano también gira alrededor del mismo eje vertical, y además puede detenerse en cualquier ángulo (el teclado solo salta de 5°/90°, los controles pueden parar en valores intermedios). Esto se complementa perfectamente.

### 35.3 Giro libre vs giro preciso

- Anillo de controles: puede detenerse en **cualquier ángulo**, ideal para "girar hasta que se vea cómodo";
- Teclado `Shift`+letra: solo salta enteros de **90°**, ideal para "debe quedar enderezado, debe ser ángulo recto";
- Teclado letra normal: solo paso de **5°**, ideal para "ajustar unos pocos grados".

💡 En la práctica: primero arrastra con controles a un ángulo aproximado → luego usa `Shift+A` (eje verde) para completar a exactos 90°/180°; esto se usa muchísimo en trabajos "que deben quedar rectos" como texto 3D y fachadas de edificios.

---

## Capítulo 36: Modo de escala: manijas de cubo y el interruptor "proporcional"

### 36.1 Manijas de cubo: estirar un eje, o inflar todo

Cambia al modo de escala (⤢) y aparecen pequeñas manijas de cubo en las esquinas del objeto. Arrastrar un solo cubo = **solo alargar/aplanar a lo largo de ese único eje** (por ejemplo, aplastar una esfera en elipsoide, o alargar una columna en una columna alta); arrastrar el cubo central = escala global.

| Color de la manija | Eje de anotación de página | Efecto de arrastrarla |
|---|---|---|
| 🔴 Cubo rojo | izquierda/derecha (Y) | ensanchar / estrechar |
| 🟢 Cubo verde | altura (Z) | crecer en alto / bajar |
| 🔵 Cubo azul | adelante/atrás (X) | profundizar / aplanar en profundidad |

### 36.2 Bloqueo de "escala proporcional": el interruptor que más debe activar un principiante

Debajo del área de modo de transformación del panel derecho hay una casilla de verificación **«Escala proporcional»** (está marcada por defecto). Cuando está marcada, sin importar qué cubo arrastres, el objeto se **escala globalmente en proporción**, sin deformarse —esto normalmente es justo lo que quieres.

⚠️ Si desmarcas y luego arrastras un solo cubo, el objeto se deformará por "estiramiento unidireccional". Esto tiene usos creativos (por ejemplo, arandelas aplastadas, vigas alargadas), pero un principiante fácilmente la desactiva por error y se pregunta "¿por qué se torció?". Si no estás seguro, mantenla marcada.

### 36.3 Contrasta con la escala por teclado, y la "prohibición de escalar en multiselección"

| Lo que quieres hacer | Con controles | Con teclado (capítulo 32) |
|---|---|---|
| Agrandar 5% global | Arrastrar cubo central (proporcional marcado) | `+` |
| Reducir 5% global | Arrastrar cubo central | `-` |
| Duplicar / reducir a la mitad | Arrastrar fuerte el cubo central | `Shift`+`+` / `Shift`+`-` |
| Aplanar unidireccional | Desmarcar proporcional, arrastrar un solo cubo | el teclado no lo soporta |

⚠️ **Limitación importante**: cuando **seleccionas varios objetos a la vez**, el modo de escala se **desactiva automáticamente** (el botón se pone gris, y si en ese momento estabas en modo de escala volverá automáticamente a traslación). La razón es la misma que la prohibición de escalar en multiselección con el teclado `+`/`-` —forzar a escalar juntos varios objetos de distinto tamaño queda muy raro.

💡 Entonces, ¿cómo ajustar el tamaño de todos a la vez en multiselección? Dos caminos: ① primero `Ctrl + A` y luego procesar uno por uno con controles/teclado; ② usar un método distinto a «Escala proporcional» —por ejemplo, agruparlos primero en grupos y confiar en la traslación para colocarlos en lugar de escalarlos.

### 36.4 Cuándo los controles de transformación "no te dejan usarlos"

Además de la prohibición de escalar en multiselección, hay otras situaciones en que los botones de modo de transformación se ponen grises y no se pueden hacer clic:

- Cuando estás en modo de herramienta de **pincel / texto / borrador** (estas herramientas toman el control del clic, y los controles de transformación ceden el paso primero);
- Mientras **editas texto** (cuando aparece el cuadro de entrada en línea), los botones de transformación se desactivan temporalmente y se restauran al terminar;
- El **objeto de texto** en sí no soporta escala proporcional; al seleccionar texto se ocultan los controles relacionados con escala proporcional y se desactiva el modo de escala, volviendo automáticamente a traslación; las imágenes y los trazos de pincel sí se pueden escalar con normalidad.

⚠️ Si ves que los tres botones de modo no se pueden hacer clic y están grises, primero revisa: ¿sigues parado dentro de alguna herramienta sin salir? Pulsa `Esc` o haz clic en el botón de tipo "seleccionar" en la parte superior para salir de la herramienta, y los controles de transformación reviven.

### 36.5 Controles y cuadros numéricos: sincronización bidireccional

En el área «Transformación» de la derecha también hay **deslizadores/cuadros de entrada numéricos** correspondientes (posición, ángulo de rotación, valor de escala). Están en **sincronización bidireccional** con los controles:
- Cuando arrastras los controles, el cuadro numérico cambia en tiempo real;
- Cuando introduces directamente un valor preciso en el cuadro numérico (por ejemplo, rotación pon `45`, escala pon `2.5`), el objeto también cambia de inmediato.

💡 Cuando necesites "precisión absoluta" (por ejemplo, la rotación debe ser exactamente 30°, la escala debe ser exactamente 1.5 veces), **introducir directamente en el cuadro numérico** es mucho más fiable que arrastrar los controles. Los controles sirven para "buscar el tacto", el cuadro numérico sirve para "fijar valores".

---

✏️ **Resumen de la parte**: los controles de transformación son la "versión de arrastre libre" del teclado. Recuerda tres cosas —① tiene tres apariencias: traslación/rotación/escala, correspondientes a flechas/anillos/cubos; ② **manija roja = izquierda/derecha, verde = arriba/abajo, azul = adelante/atrás** (traduce siempre según la anotación de página, no te engañes por el color superficial); ③ botón izquierdo arrastra el objeto, derecho/central/rueda manejan la vista, y los tres no se estorban. En la próxima parte hablaremos de "combinar y agrupar, alinear y distribuir", para que pases de "mover un solo objeto" a "colocar un gran grupo de objetos".

---

# Parte 10: Multitudes — gestionar "un grupo" de objetos a la vez

> Al final de la parte anterior anuncié que "hablaríamos de agrupar, alinear y distribuir". Aquí debo ser honesto contigo desde el principio: **esta herramienta no tiene un botón independiente de "agrupar", ni tampoco un botón de "alineación/distribución con un clic"** — sigue una ruta más ligera y también más flexible: **selección múltiple + transformación conjunta + clonar en matriz**.
>
> Esta parte te enseña "cómo gestionar eficientemente un gran grupo de objetos". No hay bala de plata, pero sí un conjunto de 'métodos caseros' suficientes, que al disponerlos quedan igual de ordenados.

---

## Capítulo 37: Seleccionar un grupo de una vez: conocer el "conjunto de selección"

### 37.1 Por qué seleccionar múltiples

Antes ibas "punto uno, modifico uno". Pero la creación real suele ser un montón de cosas: una fila de árboles, una columna de luces, piedras por todo el suelo. Si ajustas 100 uno por uno, te vuelves loco primero.

La solución: primero**los seleccionas de una vez en el "conjunto de selección"**, y luego operas de forma unificada. Este es el sentido de la selección múltiple.

### 37.2 Tres métodos para selección múltiple

| Método | Cómo operar | Escenario adecuado |
|---|---|---|
| **Seleccionar todo** | `Ctrl + A`, o tocar el botón 「全选」(Seleccionar todo) en la parte inferior en pantalla táctil | Quieres seleccionar todos los objetos de la escena |
| **Añadir / quitar selección** | Mantén pulsado `Shift` y luego haz clic en un objeto: al hacer clic en uno no seleccionado = se añade; al hacer clic en uno ya seleccionado = se expulsa | Elegir unos pocos específicos (por ejemplo "estas dos luces + aquel árbol") |
| **Selección por cuadro** | En un espacio en blanco **mantén pulsado y arrastra**, trazando un cuadro de líneas punteadas; los objetos dentro del cuadro se seleccionan de una vez | Un grupo denso de objetos, sin ganas de hacer clic uno por uno |

✏️ **Practica**: Coloca 5 formas dispersas en la escena. Primero `Ctrl + A` para ver si se iluminan todas → haz clic en el espacio en blanco para cancelar → mantén pulsado `Shift` y haz clic para quitar 2 de ellas (se vuelven grises) → luego arrastra un cuadro en el espacio en blanco y enmarca las 3 restantes. Siente el "conjunto de selección" como una pila de notas adhesivas, añadiendo o quitando a voluntad.

💡 Detalle pequeño de la selección por cuadro: el cuadro aparece solo al arrastrar en un espacio en blanco; en pantalla táctil, como no existe el concepto de "arrastrar en espacio en blanco", se hizo un botón especial 「框选」(Selección por cuadro); al activarlo, arrastrar con un dedo realiza la selección por cuadro (al abrirlo, la parte inferior muestra "Modo selección por cuadro"). Si la selección por cuadro no enmarca ningún objeto, también te avisa suavemente "Selección por cuadro no dio en ningún objeto", no falla silently.

### 37.3 "Casos límite" de la selección

- Hacer clic en **espacio en blanco** (sin arrastrar) = cancelar toda la selección;
- Si al seleccionar por cuadro el cuadro está **completamente vacío**, el conjunto de selección se vacía (equivalente a "invertir a nada");
- Cuando estás **editando texto** o en la herramienta de **pincel/borrador**, la lógica de selección cede ante la herramienta, y la selección múltiple queda temporalmente no disponible.

❓ **Piensa**: ¿Por qué "Shift+clic" puede tanto añadir como quitar? — Porque el conjunto de selección no es binario "activado/desactivado", sino un **conjunto**. Al hacer clic en un elemento existente se debe eliminar, al hacer clic en uno inexistente se añade. Esta lógica de "alternar" la encontrarás por todas partes más adelante, en el gestor de archivos, en el correo, etc.

---

## Capítulo 38: Mover un grupo junto: el "punto maestro" de la transformación múltiple

### 38.1 El "punto maestro" invisible

Cuando seleccionas **varios** objetos, la herramienta no cuelga los controles de un objeto concreto (colgarlo de cualquiera sería injusto), sino que coloca un **punto proxy invisible** (en el código se llama `multiTransformProxy`) en **el centro exacto de este grupo de objetos**.

Los controles de transformación que ves (flechas/anillos) en realidad están colgados de este "punto maestro". Cuando lo arrastras, el algoritmo calcula el **incremento** de movimiento/rotación del punto maestro, y luego lo **distribuye sincronizadamente a cada objeto seleccionado**.

> En palabras simples: **arrastras un "interruptor general" invisible, y todas las cosas seleccionadas se mueven juntas, manteniendo sus posiciones relativas entre sí.**

### 38.2 Qué se puede hacer con selección múltiple

| Operación | ¿Disponible con selección múltiple? | Explicación |
|---|---|---|
| **Trasladar** juntos (arrastrar flecha/plano) | ✅ Disponible | Todo el grupo se mueve en bloque a lo largo de un eje |
| **Rotar** juntos alrededor del centro (arrastrar anillo) | ✅ Disponible | Todo el grupo gira alrededor del centro del grupo, como girar un tablero de fichas |
| **Escalar** juntos | ❌ Deshabilitado | En selección múltiple el botón de modo de escala se pone gris y salta automáticamente a traslación |

✏️ **Practica**: Selecciona 3 objetos dispersos → cambia al modo de rotación → arrastra el **anillo verde** (alrededor del eje de altura) → mira si giran como "girados a la vez por una mano", girando alrededor del centro común, manteniendo sus distancias mutuas. Esta es la satisfacción de la "rotación en grupo".

### 38.3 Por qué la selección múltiple no puede escalar junta

⚠️ Esta es una **limitación intencional**, no un bug:

- Varios objetos de distinto tamaño y forma escalados proporcionalmente juntos suelen dar un resultado muy raro (los grandes se vuelven enormes, los pequeños se reducen a una semilla);
- por eso la herramienta **deshabilita directamente el modo de escala** en selección múltiple, forzándote a "o escalar uno por uno, o clonar primero y luego ajustar".

💡 Solución alternativa:
1. Si quieres que un grupo "mida lo mismo" — primero `Ctrl + D` para clonar una fila idéntica; como ya tenían el mismo tamaño, luego ajustas uno por uno;
2. Si de verdad necesitas escalar todo un grupo — ¿**primero seleccionar todo, exportar JSON, cambiar valores y volver a importar**? Demasiado lío. Lo más práctico es: trátalos como un "grupo temporal", y dispónalos con **escala individual + desplazamiento uniforme**.

### 38.4 Selección múltiple + Shift de paso grande, sigue siendo útil

El paso grande de `Shift` (1 cuadrícula / 90°) que aprendiste en el Capítulo 32 **también se aplica** a la selección múltiple. Tras seleccionar un grupo, mantén pulsado `Shift` y arrastra las teclas de dirección; todo el grupo salta 1 celda a la vez, ideal para formar matrices (lo usaremos en el próximo capítulo).

---

## Capítulo 39: Producción en masa: copiar, clonar y "matrices"

Al hacer objetos repetidos, nunca dibujes a mano el 2.º, el 3.º… Usa "copiar/clonar" para que la computadora los genere por ti.

### 39.1 Tres formas de "generar copias"

| Tecla | Nombre | Característica |
|---|---|---|
| `Ctrl + C` | Copiar | Guarda el objeto seleccionado en el **portapapeles** (no aparece de inmediato) |
| `Ctrl + V` | Pegar | **Saca** del portapapeles y lo pega cerca de la posición original |
| `Ctrl + D` | **Clonar** | De una vez: copia en el sitio y **se desplaza automáticamente un poco** |

💡 **La más usada es `Ctrl + D`**. Tiene un paso menos que "copiar→pegar", y la copia clonada se separa automáticamente un poco, la ves de inmediato y la puedes reubicar enseguida — el estándar para hacer matrices.

✏️ **Practica**: Coloca 1 cubo → `Ctrl + D` una vez, ¿aparece uno más, ligeramente separado? → selecciona el nuevo → pulsa `→` para moverlo a la siguiente celda → otra vez `Ctrl + D` → otra vez `→`… en pocos pasos llenas una fila. Sin tocar el panel del ratón en todo el proceso.

### 39.2 Disponer una matriz ordenada con "clonar + teclado"

¿Sin botón de "alineación/distribución"? No importa, dispón manualmente con el **paso de cuadrícula**, queda igual de ordenado:

1. Selecciona un objeto, `Ctrl + D` para clonar;
2. Pulsa las teclas de dirección para moverlo a **exactamente 1 celda** (paso por defecto 0.1 cuadrícula, pulsa 10 veces; o `Shift`+tecla de dirección una vez = 1 celda);
3. Repite `Ctrl + D` + tecla de dirección, y sale una fila;
4. Tras hacer una fila, `Ctrl + A` selecciona toda la fila, `Shift`+tecla de dirección mueve "toda la fila" de un salto a la siguiente línea, y sigues clonando — así obtienes también una matriz bidimensional (cuadrícula).

💡 **Truco para hileras circulares**: clona uno → muévelo a una distancia fija del centro → todo el grupo gira alrededor del centro (Capítulo 38) → cada vez que gira un ángulo, clona una vez. Gira unas cuantas vueltas y sale una "matriz circular". Esta es la versión manual de "distribuir".

### 39.3 Límites de copiar y pegar

⚠️ Dos avisos en los que podrías tropezar (la herramienta muestra un pequeño texto):
- **"Transformación en curso, no se puede copiar/clonar"**: si estás arrastrando un control (transformación activa), los botones de copiar/clonar se desactivan temporalmente. Suelta (termina el arrastre) y vuelve a pulsar.
- **"Selecciona un objeto antes de copiar"**: si no hay nada seleccionado y pulsas `Ctrl + C`, te avisa que selecciones primero. Si el portapapeles está vacío, `Ctrl + V` también avisa "El portapapeles está vacío".

❓ **Piensa**: ¿Cuál es la diferencia subyacente entre clonar y copiar-pegar? — Clonar es "generar de inmediato una copia desplazada", sin depender de almacenamiento intermedio alguno; copiar-pegar es "guardar primero en el portapapeles, luego recuperar", por eso puedes copiar de la escena A, cambiar a la escena B y pegar (el portapapeles de esta herramienta es a nivel de memoria, común dentro de la misma página). Entendiendo esto, sabes por qué a veces `Ctrl + V` no responde — probablemente el portapapeles está vacío.

---

## Capítulo 40: Guardar y compartir: dejar que la obra salga de la pantalla

¿La escena que construiste con esfuerzo se pierde al cerrar la página? No — esta herramienta puede **exportar** a un archivo, **importar** de vuelta y **capturar** como imagen.

### 40.1 Tres teclas de "guardar/recuperar"

| Tecla | Función | Producto |
|---|---|---|
| `Ctrl + S` | Exportar escena | Un **archivo JSON** (descripción completa de la escena) |
| `Ctrl + O` | Importar escena | Lee de vuelta el JSON exportado previamente |
| `Ctrl + P` | Exportar imagen | Una **imagen PNG** (foto del encuadre actual) |

💡 Flujo de trabajo: **construyes un tramo → `Ctrl + S` para guardar → al día siguiente `Ctrl + O` para recuperar y continuar**. El JSON es tu "archivo de proyecto", el PNG es tu "foto del resultado", cada uno con su función.

### 40.2 Qué guarda exactamente el JSON

El JSON exportado no es una imagen, sino una **lista de objetos**, que registra aproximadamente:

- El **tipo/forma** de cada objeto (si es esfera o texto, parámetros de largo/ancho/alto);
- La **transformación** de cada objeto (posición, rotación, escala — es decir, dónde está, si está torcido, qué tamaño tiene);
- La **apariencia** de cada objeto (color, patrón, transparencia, textura);
- La **configuración de entorno** de la escena (ejes de coordenadas, visualización/ocultamiento de la superficie de cuadrícula, etc.).

⚠️ Como lo que se guarda son "parámetros" y no "píxeles", tras importar puedes **seguir editando** — no es una imagen muerta, sino un proyecto vivo. Esto también explica por qué todas las operaciones anteriores pueden entrar en la "pila de historial" y deshacerse: en esencia todas modifican estos parámetros.

### 40.3 Sugerencias de compartir y colaborar

- **Mostrar el efecto a un colega**: enviar PNG (`Ctrl + P`) es lo más rápido;
- **Que el colega siga modificando**: enviar JSON (`Ctrl + S`), el otro lo abre con `Ctrl + O` y puede editar;
- **Entre dispositivos**: pasa el JSON a un disco en la nube/WeChat, abre la página en otra computadora e importa — la escena te acompaña.
- ⚠️ No olvides que `Ctrl + Del` **vacía toda la escena**, mostrará un cuadro de confirmación "¿Confirmar vaciar la escena?" y el vaciado se puede deshacer. Antes de vaciar, haz `Ctrl + S` para respaldar; no dejes que tu esfuerzo se evapore con un clic.

### 40.4 "Alinear y distribuir" manualmente: sin botón también se puede ordenar

Volviendo a la promesa del inicio de la parte — como no hay alineación/distribución con un clic, aquí van tres métodos **puramente manuales** para ordenar, combinando lo aprendido antes:

1. **Usar la cuadrícula**: el paso de movimiento por defecto es 0.1 cuadrícula (=0.15 unidades), pulsar un número entero de veces = caer exactamente sobre las líneas de la cuadrícula. `Shift`+tecla de dirección una vez = 1 celda, ideal para "ajustar a las líneas de la cuadrícula".
2. **Usar el clonado**: como en el Capítulo 39, clonar + paso fijo = matriz equiespaciada (esto es "distribuir").
3. **Usar la vista**: primero toca 「正视/顶视」(Vista frontal/vista superior) en la parte inferior para poner el objeto en una cámara estándar, luego muévelo a lo largo de un solo eje con el teclado, evitando "ordenar torcido".

✏️ **Práctica integral (trabajo de graduación de esta parte)**: con "cubo + `Ctrl + D` clonar + `Shift`+tecla de dirección" dispón una cuadrícula de 5×3; tras `Ctrl + A` seleccionar todo, `PgUp` para subir todo un grupo a una celda del suelo; `Ctrl + S` para guardar. Ya puedes "producir en lote + ordenar + guardar resultados".

---

✏️ **Resumen de la parte**: Esta herramienta no depende de botones de "agrupar/alinear", sino de **selección múltiple + punto maestro proxy + matriz de clonado** para lograr la gestión de multitudes. Recuerda — tres métodos de selección múltiple (seleccionar todo / Shift añadir / selección por cuadro), la selección múltiple puede trasladar y rotar pero no escalar, clonar `Ctrl + D` es la navaja suiza de las matrices, el JSON es tu archivo de proyecto vivo. En la próxima parte haremos un **combate integral**: construir desde cero una escena pequeña completa (casa pequeña / patio pequeño), encadenando las habilidades de las diez partes anteriores en una línea, viviendo el "último kilómetro" de "de principiante a experto".

# Parte 11: Práctica — construye una escena completa desde cero

> En los diez tomos anteriores ya has reconocido todas las "piezas": figuras, colores, texturas, texto, pincel, ángulos de vista, atajos de teclado, controles de transformación, y clonación múltiple.
>
> Pero saber usar las piezas ≠ saber construir cosas. En esta parte ya no explicamos nuevos botones, sino que te guiamos para **encadenar lo aprendido en una línea de producción** y hacer cuatro proyectos completos. Cada proyecto presenta "objetivo → descomposición → pasos → errores comunes → reto avanzado".
>
> ⚠️ Por favor **sigue haciéndolo tú mismo**. Verlo diez veces no vale tanto como construirlo una vez: el valor de esta parte está enteramente en tu ratón y tu teclado.

---

## Capítulo 41 Proyecto 1: construye una casita

### 41.1 Primero mira el resultado, luego piensa cómo desmontarlo

Lo que vamos a hacer es muy sencillo: una casita con techo, puerta y ventana, de pie sobre un césped.

Antes de arrastrar figuras, tómate 10 segundos para pensar una pregunta:

❓ **Piénsalo**: una casa, si solo pudieras ensamblar con formas básicas como "cubo, cono, pirámide de base cuadrada, cilindro, plano", ¿cómo la desmontarías?

Este es el pensamiento central de la creación 3D: **descomponer un objeto complejo en la combinación de figuras geométricas simples**. En términos profesionales se llama "análisis de volúmenes", pero en el fondo es "jugar con bloques".

Descomposición de referencia:

| Pieza | Qué figura usar | Por qué |
|---|---|---|
| Muro (cuerpo principal) | `box` cubo | Una casa es esencialmente una caja |
| Techo | `pyramid` pirámide de base cuadrada | Base cuadrada y punta, encaja justo sobre el muro cuadrado |
| Puerta | `box` placa fina aplanada | Pegada a la pared, más fácil de colocar que una figura 2D |
| Ventana | `box` placa fina más pequeña | Igual que arriba, se puede ajustar semitransparente como vidrio |
| Chimenea | `cylinder` cilindro | Delgada y alta, sobresale del techo |
| Césped del suelo | `square2` cuadrado | 2D tumbado en el suelo, como césped |

💡 **Principio**: cualquier forma primero pregunta "¿de cuántos volúmenes está compuesta?". Incluso haciendo un coche o un robot, el razonamiento es exactamente el mismo.

### 41.2 Paso 1: echa los cimientos (el césped)

1. En el panel izquierdo cambia a **Figuras 2D**, arrastra un `square2` **cuadrado** al centro de la escena;
2. Selecciónalo, en el panel derecho elige el color de la **gama verde**;
3. En textura elige **Cuadrícula** — de lejos parece una textura de césped recortado;
4. Usa **escala proporcional** (control deslizante del panel derecho o `Shift + +`) para ampliarlo visiblemente un poco más grande que la casa.

⚠️ **Error común**: las figuras 2D son "calcomanías tumbadas en el suelo (Z=0)". Si descubres que "se ha levantado", probablemente la giraste sin querer con el control de rotación — pulsa `Ctrl + Z` para deshacer, no forcees.

✏️ Ejercicio rápido: pulsa el botón «**Vista superior**» en la parte inferior, míralo desde arriba para ver si el césped es lo bastante grande; luego pulsa «Perspectiva» para volver a la vista habitual. Este hábito de "cambiar de vista para revisar" se recomienda en cada paso de esta parte en adelante.

### 41.3 Paso 2: levanta el muro

1. Cambia a **Figuras 3D**, arrastra un `box` **cubo** al centro del césped;
2. Selecciónalo, usa `PgUp` para subirlo hasta que **repose justo sobre el suelo** (la base toca el suelo, ni flotando ni hundido);
3. En el panel derecho cámbialo a **beige / amarillo claro** (color del muro);
4. En textura elige **Pared de ladrillos** — de repente pasa de "un bloque" a "una casa".

💡 **Truco para juzgar "tocar el suelo"**: pulsa el botón «**Vista frontal**» en la parte inferior, míralo de frente a la altura de los ojos; de un vistazo verás si el objeto flota en el aire o está hundido en la tierra. En perspectiva es fácil equivocarse, la vista frontal no engaña.

⚠️ **Error común**: muchos principiantes ajustan la altura en vista de perspectiva y sienten que "algo raro" por más que ajustan. Cambia a vista frontal y se resuelve en dos segundos.

### 41.4 Paso 3: encaja el techo

1. Arrastra una `pyramid` **pirámide de base cuadrada**;
2. Usa `PgUp` para subirla **justo encima del muro**, dejando que la base del cono repose justo sobre la cima del muro;
3. ¿Los lados no están alineados? Usa `↑↓←→` para microajustar (paso de 0.1 celda); si no encaja en números grandes, usa `Shift +` tecla de dirección para saltar una celda entera;
4. Cambia el color a **rojo-marrón / gris oscuro** (color de teja).

❓ **Piénsalo**: ¿por qué usar "pirámide de base cuadrada" en lugar de "cono" para el techo? — porque el muro es cuadrado. Techo cuadrado sobre muro cuadrado, los bordes encajan perfectamente; un cono sobre un muro cuadrado dejaría los cuatro vértices al descubierto. **La coincidencia de formas es la clave de que "se vea correcto".**

✏️ **Practica**: cámbialo a propósito por un `cone` cono e inténtalo una vez, míralo desde la vista frontal y la superior, y siente la extrañeza de "vértices al descubierto". Luego pulsa `Ctrl + Z` para volver.

### 41.5 Paso 4: abre puerta y ventana

La forma de hacer puerta y ventana es "**una placa fina aplanada pegada a la pared**":

1. Arrastra un `box`, primero **desmarca «Escala proporcional»** (sección 36.2), y estíralo en **una lámina muy fina**;
2. Vuelve a marcar escala proporcional (para evitar deformarlo por error más adelante);
3. Usa las teclas de dirección para pegarlo a la **parte frontal del muro** — ojo: debe sobresalir un poquito de la superficie de la pared, si no "peleará" con el muro (ver error común abajo);
4. Elige el color **marrón oscuro** (puerta de madera).

Las ventanas se hacen igual: dos láminas más pequeñas, color **azul claro**, y ajusta la **opacidad a unos 0.5** — el efecto de vidrio aparece al instante (sección 20.2).

⚠️ **Error común importante: Z-fighting (parpadeo y pelea)**
Si la placa de la puerta y la superficie del muro están **totalmente coincidentes en el mismo plano**, verás que parpadean y se atraviesan mutuamente — no es un bug, son dos superficies "disputándose la posición" a la misma profundidad.
**Solución**: usa las teclas de dirección para mover la puerta un paso hacia afuera (1～2 pasos de 0.1 celda basta), para que flote claramente frente a la pared.

💡 Para hacer la segunda ventana no la redibujes — selecciona la primera, `Ctrl + D` para clonar, luego usa `←` o `→` para moverla al otro lado. Esta es la primera aparición en la práctica del arreglo de clonación de la sección 39.

### 41.6 Paso 5: añade la chimenea y termina

1. Arrastra un `cylinder` **cilindro**, ajusta su grosor con escala proporcional, sube con `PgUp` hasta la pendiente del techo, dejándolo sobresalir un tramo;
2. Color **gris oscuro**;
3. ¿Quieres más ambiente de vida? Usa una `sphere` esfera, clona unas pocas, apílalas en la boca de la chimenea como "humo", y baja la opacidad a 0.3.

**Lista de comprobación final** (se recomienda hacerla en cada proyecto):

| Ítem de comprobación | Cómo revisarlo |
|---|---|
| ¿Flota / se hunde en el suelo? | Pulsa «Vista frontal» y míralo de frente |
| ¿Hay penetración de posición delante/detrás? | Pulsa «Vista izquierda» o «Vista derecha» |
| ¿El layout general está centrado? | Pulsa «Vista superior» y miralo desde arriba |
| ¿El resultado se ve bien? | Pulsa «Perspectiva» para volver a la vista habitual |

Una vez confirmado: `Ctrl + S` exporta JSON y guarda el proyecto, `Ctrl + P` captura un PNG y entrega el trabajo.

### 41.7 Reto avanzado

1. **Haz una fila de casas adosadas**: selecciona toda la casa (`Ctrl + A`) → `Ctrl + D` clona → `Shift +` tecla de dirección la mueve un espacio entero → repite tres veces. Ojo: al clonar en múltiple selección la posición relativa del grupo completo no cambia (mecanismo del "punto maestro" de la sección 38).
2. **Cambia de estación**: cambia la textura del césped por "Puntos", el color por blanco → se vuelve terreno nevado; baja la opacidad del muro a 0.4 → se vuelve iglú.
3. **Añade una placa de puerta**: usa la herramienta de texto del capítulo 21, añade una línea "Nº 1" encima de la puerta, fuente **Heiti (negrita sans)》, reduce el tamaño de fuente para que sea proporcional a la casa.

⚠️ Recordatorio: el tamaño de fuente predeterminado del texto es **80**, mientras que los volúmenes de la casa suelen tener solo 1～2 unidades — añadir texto directamente te dará una "letra gigante más grande que la casa". Debes reducir el tamaño de fuente (o reducir el texto en conjunto) para que quede armonioso. Este es el punto de frustración más común para los principiantes al hacer carteles; no entres en pánico, solo cambia el tamaño de fuente.

---

## Capítulo 42 Proyecto 2: haz un rótulo de letras en 3D

### 42.1 Objetivo y planteamiento

Haz una **cartelera de lemas de pie en la escena**: panel base + texto + decoración, por ejemplo "Bienvenido", "Gran inauguración" o una frase que te guste.

⚠️ Aclaremos primero un punto fácil de malinterpretar: el texto de esta herramienta es una «**lámina fina con letras pegadas**» (sección 21.1), no un texto extruido con grosor real en 3D. Por tanto, la "sensación tridimensional" que buscamos se basa en la combinación de **panel base + texto + disposición en capas**, no en el grosor del propio texto.

Entendiendo esto, el planteamiento queda claro:

| Capa | Qué usar | Función |
|---|---|---|
| Panel trasero | `box` placa fina aplanada | Dar a las letras una "superficie de apoyo" |
| Texto principal | Objeto de texto | Cuerpo del contenido |
| Texto sombra | Objeto de texto (oscuro, desplazado hacia atrás) | Crear la ilusión de grosor |
| Soporte | Dos `cylinder` | Hacer que el cartel "esté de pie" en el suelo |

### 42.2 Paso 1: haz el panel base

1. Arrastra un `box`, desmarca «Escala proporcional», aplánalo en una **lámina fina vertical** (ancho > alto > grosor);
2. Vuelve a marcar escala proporcional;
3. Usa `PgUp` para subirlo a la altura de los ojos (a cierta distancia del suelo, no pegado);
4. Elige un color **oscuro** (azul oscuro / verde oscuro / color madera sirven) — fondo oscuro con letras claras se ve más nítido.

💡 **Principio de color**: texto y panel base deben tener **diferencia de luminosidad**. Fondo oscuro con letras claras, o fondo claro con letras oscuras, elige uno de los dos. Combinaciones de misma luminosidad (como fondo gris medio + letras verde medio) se ven borrosas de lejos; esta es la regla más básica del diseño y también la más ignorada.

### 42.3 Paso 2: pon el texto

1. Panel izquierdo «Herramientas» → «**Añadir texto**»;
2. Haz clic en la escena, aparece un cuadro de entrada (texto de marcador de posición «Introduce el texto······»);
3. Introduce tu lema y pulsa **Enter** para confirmar;
4. Selecciónalo, ajusta en el panel derecho:
   - **Fuente**: para moderno usa «Heiti (negrita sans)», para tradicional usa «Kaiti (cursiva regular)»;
   - **Tamaño de fuente**: predeterminado 80, normalmente hay que **reducirlo** para que quepa con los volúmenes (ver recordatorio en 41.7);
   - **Negrita**: se recomienda activarla para lemas, se ve más llamativo de lejos;
   - **Color**: elige un color claro de fuerte contraste con el panel base.

5. Usa las teclas de dirección para mover el texto al **frente del panel base**, y recuerda sobresalir un poco hacia afuera (previene Z-fighting, igual que sección 41.5).

✏️ **Practica**: después de escribir, **haz doble clic** en él (sección 21.3) y cambia el contenido por otra frase. Aprecia lo cómodo de "no tener que borrar y empezar de nuevo" — esto ahorra mucho trabajo cuando iteras el texto repetidamente.

### 42.4 Paso 3: haz el "texto sombra" para crear grosor

Esta es la técnica central de este capítulo, muy simple pero con efecto sobresaliente:

1. Selecciona el texto principal, `Ctrl + D` **clona** una copia;
2. Cambia esta copia clonada a un color **oscuro** (un poco más oscuro que el panel base, o negro puro);
3. Usa las teclas de dirección para moverla **hacia atrás y hacia abajo 1～2 pasos pequeños** (paso de 0.1 celda basta);
4. Si tapa el texto principal, significa que la relación delante/detrás está invertida — simplemente mueve el texto principal un paso más hacia adelante.

Ahora, visto desde la perspectiva: letras oscuras detrás, letras claras delante, **visualmente "flota"**. Este es el "método de sombreado" del diseño plano, y también funciona en 3D.

❓ **Piénsalo**: ¿por qué un desplazamiento "hacia atrás + hacia abajo" funciona mejor que "solo hacia atrás"? — porque en la realidad la luz normalmente cae desde **arriba**, y la sombra cae naturalmente **debajo y ligeramente detrás** del objeto. Un desplazamiento coherente con la experiencia de iluminación cotidiana es lo que el cerebro acepta como "real".

💡 ¿Quieres más sensación 3D? **Clona el texto sombra dos o tres veces más**, cada copia desplazada un poco más hacia atrás y con color gradualmente más oscuro — así logras un efecto de falso grosor "extruido en múltiples capas". Cuantas más capas, más pesado se ve, pero también más fácil de volverse borroso; unas 3 capas es lo más ingenioso.

### 42.5 Paso 4: añade soportes para que el cartel se sostenga

1. Arrastra dos `cylinder` **cilindros**, ajusta con escala proporcional para que sean finos y largos;
2. Usa `PgUp` / teclas de dirección para insertarlos en **ambos lados inferiores** del panel base, con el extremo superior metido un poco dentro del panel (aquí la **penetración a propósito** es correcta, oculta la junta);
3. Elige color **gris oscuro / color madera**.

💡 Para la segunda varilla no la arrastres de nuevo — selecciona la primera, `Ctrl + D` clona, luego usa `←` / `→` para moverla al otro lado. **Las cosas simétricas siempre se hacen con clonación, es infinitamente más preciso que moverlas a mano.**

### 42.6 Paso 5: horizontal vs vertical

La misma frase, con otro diseño tipográfico, cambia por completo su carácter:

| Combinación | Carácter | Adecuado para |
|---|---|---|
| Horizontal + Heiti + negrita | Moderno, comercial | Rótulo de tienda, banda de evento |
| Vertical + Kaiti + gran tamaño | Tradicional, solemne | Placa, academia, casa de té |
| Horizontal + Times + sin negrita | Occidental, formal | Señal en inglés, placa descriptiva |
| Horizontal + Courier | Técnico, retro | Sensación tecnológica, estilo máquina de escribir |

✏️ **Practica (experimento de comparación)**: haz dos versiones de la misma frase "té" — una horizontal en Heiti, otra vertical en Kaiti con gran tamaño + panel base de color madera. Ponlas una al lado de la otra en la escena y míralas desde «Vista frontal». Sentirás intuitivamente: **la fuente y el diseño tipográfico ya hablan por sí solos**; el contenido no ha cambiado, pero el carácter es totalmente distinto.

### 42.7 Resumen de errores comunes

| Fenómeno | Causa | Solución |
|---|---|---|
| Letras desproporcionadamente grandes que cubren toda la escena | Tamaño de fuente predeterminado 80, no coincide con la escala de los volúmenes | Reduce el tamaño de fuente, o escala el objeto de texto en conjunto |
| Letras y panel base parpadean y se atraviesan | Ambos en el mismo plano (Z-fighting) | Teclas de dirección para mover las letras 1～2 pasos hacia afuera |
| De lejos se ve borroso | Insuficiente diferencia de luminosidad entre letras y panel | Aumenta el contraste claro-oscuro, o pon negrita a las letras |
| Texto sobresale el borde del panel | Texto demasiado largo | Reduce el tamaño de fuente, o ensancha el panel |
| No puedo cambiar tamaño de fuente / teclas de dirección no responden | El cursor sigue en el cuadro de entrada numérica | Primero haz clic en un espacio en blanco de la pantalla (sección 32.1) |

### 42.8 Reto avanzado

1. **Haz un cartel de doble cara**: selecciona todo el grupo (panel base + letras + sombra), clónalo, usa `Shift + A` para girar 180°, colócalo en la parte trasera, formando un cartel de pie visible por ambos lados.
2. **Efecto de letras luminosas**: cambia el color del texto principal a amarillo brillante, el panel base a negro profundo, y detrás de las letras coloca una lámina fina amarillo claro semitransparente (opacidad 0.3) como "halo de luz".
3. **Conecta con el proyecto 1**: coloca este cartel frente a la casita del capítulo 41, `Ctrl + S` guarda como una escena completa. Ahora tienes un pequeño paisaje completo de "casa + cartel".

---

## Capítulo 43 Proyecto 3: diseña un emblema / icono

### 43.1 Por qué el emblema es "el mejor ejercicio"

Los dos proyectos anteriores hacían "cosas en 3D". Este es al revés — vamos a hacer un **emblema que parece diseño plano**, pero implementado con medios 3D.

Es un ejercicio excelente porque:
- Solo usa **figuras 2D** (esas 20 del capítulo 12) para completarlo, la carga de formas es ligera;
- Te obliga a pensar en problemas de diseño real como **alineación, capas y color**;
- El resultado con un screenshot en «**Vista superior**» es un icono limpio, directamente usable como avatar / Logo.

❓ **Piénsalo**: los emblemas que has visto (logos de coches, escudos escolares, iconos de App), ¿cuántos elementos suelen tener? — Normalmente no más de 3～4 capas: forma base + figura principal + adornos + texto. **Menos es refinado**, esta es la regla de hierro del diseño de emblemas.

### 43.2 Premisa clave: trabaja con la vista superior

⚠️ Este proyecto debe realizarse **siempre en la vista «Vista superior»** (botón de vista en la parte inferior).

Razón: el emblema es una composición plana "vista de frente", y todas las figuras 2D están tumbadas en el suelo (Z=0). Desde arriba en perpendicular, ves exactamente cómo queda el resultado; en perspectiva hay deformación de cerca-grande/lejos-pequeño, y alinear es puro adivinar.

💡 Esta es una experiencia general: **haz lo que hagas, míralo desde la vista correspondiente.** Para layout del suelo usa vista superior, para ajustar altura usa vista frontal, para ver el efecto global usa perspectiva. No fuerces todo el proceso con una sola vista.

### 43.3 Paso 1: forma base (capa más externa)

1. En el panel izquierdo cambia a **Figuras 2D**, elige una como base:
   - `circle2` círculo → insignia circular, la más versátil;
   - `hexagon` hexágono → sensación tecnológica e industrial;
   - `octagon` octágono → sobria, con sentido de identidad;
   - `pentagon` pentágono → escudo, sentido académico.
2. Colócala en el **centro exacto** de la escena;
3. Escala proporcionalmente a un tamaño adecuado;
4. Elige un color **oscuro** (azul oscuro / verde oscuro / rojo vino lucen muy bien).

### 43.4 Paso 2: capa interna y figura principal (crea capas)

La sensación refinada de un emblema proviene en un 80% de "**capas concéntricas**".

1. Selecciona la forma base, `Ctrl + D` **clona** una copia;
2. Reduce proporcionalmente la copia (`-` unas teclas, o `Shift + -` para reducir a la mitad);
3. **Clave**: usa `PgUp` para subirla **un paso pequeño** — que flote un poco por encima de la forma base;
4. Cambia a un color **claro** (blanco / marfil / oro brillante).

Ahora tienes una estructura concéntrica de "anillo exterior oscuro + núcleo interior claro".

⚠️ **Bache que pisarás sí o sí**: si las dos figuras 2D están en Z=0, parpadearán y se atravesarán frenéticamente (otra vez Z-fighting, explicado en sección 41.5). **Al apilar figuras 2D, cada capa debe subirse un paso con `PgUp`**, separándolas en altura. Esta es la disciplina de operación más importante de este capítulo.

💡 Recuerda el lema: **cada vez que apilas una capa, súbela un paso.** Tres figuras = tres alturas distintas.

Luego coloca la figura principal (el "protagonista" del emblema):

| Quieres expresar | Qué figura 2D usar |
|---|---|
| Honor, calificación | `star` estrella de cinco puntas |
| Amor, beneficencia | `heart` corazón |
| Energía, rapidez | `lightning` rayo |
| Médico, rescate | `cross` cruz |
| Dirección, logística | `arrow` flecha |
| Naturaleza, agua | `teardrop` gota |
| Noche, tranquilidad | `crescent` media luna |
| Tecnología, conexión | `hexagon` hexágono |

Colócala, súbela un paso, ponle un color de contraste, alinea al centro.

💡 Sugerencia: `heart / arrow / crescent / cross / lightning` estas varias **tienen sus propios controles de parámetros de forma independientes** (ver sección 12.2, como el `ancho/alto/profundidad de la punta` del corazón, el `largo/ancho` de la flecha, el `radio exterior/radio interior/desplazamiento` de la media luna, etc.), puedes ajustar la forma directamente. Si solo quieres cambiar el tamaño en conjunto, también puedes usar escala proporcional o el control de transformación.

### 43.5 Paso 3: cómo alinear al centro exacto

Esta herramienta **no tiene un botón de "centrar con un clic"** (ya se explicó en la Parte 10), pero los emblemas precisamente exigen alineación. Tres métodos de alineación manual:

1. **Por la cuadrícula**: en vista superior, las líneas de la cuadrícula del suelo son tu regla. Haz que el centro de cada capa apunte al **mismo punto de cruce de la cuadrícula**, microajustando con las teclas de dirección (0.1 celda).
2. **Por clonación**: la copia clonada **solo escala proporcionalmente, no se traslada**, su centro sigue en el mismo sitio — concéntrica por naturaleza. Esta es la más cómoda, altamente recomendada.
3. **Por el cuadro numérico**: el cuadro numérico de posición del panel derecho (sección 36.5) permite introducir números directamente. Rellena la posición horizontal de cada capa con **el mismo grupo de números**, y tendrás un centrado absolutamente preciso.

💡 **Mejor práctica**: método 2 + método 3 combinados. Primero clona para garantizar concentricidad, al final usa el cuadro numérico para verificar que los números coinciden. Cien veces más fiable que arrastrar el ratón.

### 43.6 Paso 4: añade anillo de texto / texto inferior

1. «Añadir texto», introduce el nombre de marca o el año;
2. Reduce el tamaño de fuente (las letras en un emblema suelen ser muy pequeñas);
3. Fuente: para sensación moderna usa «Heiti (negrita sans)», para sensación académica usa «Times», para sensación tradicional usa «Songti (serif estándar)»;
4. Súbelo a la **capa superior** (un paso más alto que todas las figuras);
5. Colócalo debajo del emblema o en un espacio en blanco central.

⚠️ El texto de esta herramienta **no puede disponerse a lo largo de un arco** (no se puede hacer "texto circular"). Para un efecto similar, solo puedes separar el texto en caracteres individuales, clonar uno por uno y rotarlos para colocarlos — bastante laborioso. Los principiantes se recomiendan usar directamente **texto horizontal en la parte inferior**, igual de profesional.

### 43.7 Paso 5: exportar la imagen

1. Pulsa «**Vista superior**», centra el emblema en el centro de la pantalla;
2. Si hace falta pulsa `F11` para pantalla completa, para una imagen más grande y limpia;
3. ¿Quieres quitar distracciones? Oculta los ejes de coordenadas y la superficie de cuadrícula (capítulo 28) — este paso es clave, si no habrá líneas de cuadrícula en el screenshot;
4. `Ctrl + P` captura y exporta PNG;
5. `Ctrl + S` guarda un proyecto JSON, para cambiar colores más tarde.

💡 **Trío para exportar**: vista superior + ocultar ayudas + pantalla completa. Cualquier ocasión que requiera "imagen de producto limpia" se hace así.

### 43.8 Tabla rápida de color (úsala directamente)

| Estilo | Color base | Capa interna | Figura principal | Texto |
|---|---|---|---|---|
| Comercial sobrio | Azul oscuro | Blanco | Azul oscuro | Blanco |
| Natural ecológico | Verde oscuro | Marfil | Verde | Marfil |
| Deportivo dinámico | Naranja brillante | Blanco | Gris oscuro | Blanco |
| Alto nivel lujoso | Negro puro | Oro | Oro | Oro |
| Salud médica | Blanco | Azul claro | Cruz roja | Azul oscuro |

⚠️ El error de color más común en principiantes es **demasiados colores**. Mantén el emblema dentro de **2～3 colores**, y al instante se verá profesional. Para enriquecer las capas, usa **variaciones de claro/oscuro del mismo matiz** (sección 18.2: fija la barra de matiz, solo arrastra arriba/abajo en el bloque de color grande), en lugar de añadir más colores.

### 43.9 Reto avanzado

1. **Haz una serie de iconos**: selecciona todo el emblema y clónalo tres veces, solo cambia la figura principal (estrella / corazón / rayo), lo demás intacto. Obtendrás un conjunto de iconos de estilo unificado — exactamente lo que hace el diseño de marca real.
2. **Añade sensación de relieve**: clona la figura principal en una oscura, desplázala un paso a un lado, colócala en la capa inferior (es decir, la técnica del "texto sombra" de la sección 42.4 aplicada a figuras).
3. **Haz un emblema físico**: debajo de todo el emblema coloca un `cylinder` cilindro plano, vuelve a la vista de perspectiva — el emblema plano se convierte al instante en una "medalla metálica que se puede sostener en la mano".

---

## Capítulo 44 Proyecto 4: escena integral «Mi pequeño patio»

### 44.1 Este capítulo es el "proyecto de graduación"

Los tres proyectos anteriores entrenan cada uno una vía de habilidad: **ensamblaje de volúmenes** (casa), **maquetación de texto** (lema), **composición plana** (emblema). Este capítulo los **reúne todos en una escena**, sumando las habilidades restantes como pincel, imagen y semitransparencia, para hacer una obra completa.

Objetivo: una **casita con patio** — casa, valla, sendero, árbol, estanque, placa de puerta, ambiente de cielo, todo completo.

⚠️ Este es el ejercicio más largo del libro; se recomienda hacerlo **en varias sesiones**, y cada vez que termines una parte pulsa `Ctrl + S` para guardar. El hábito de "guardar por etapas" vale más que cualquier truco.

### 44.2 Flujo de creación: primero lo grande, luego lo pequeño; primero lo fijo, luego lo decorativo

La mayor diferencia entre el flujo profesional y el principiante no está en la velocidad de mano, sino en el **orden**. Sigue estrictamente este orden:

| Etapa | Qué hacer | Por qué este orden |
|---|---|---|
| ① Fijar suelo | Extender césped, delimitar el patio | Primero delimitar el "escenario", luego hay referencia |
| ② Colocar cuerpo | Poner la casa (resultado del proyecto 1) | El objeto más grande se ubica primero, define la proporción global |
| ③ Dividir zonas | Usar el pincel para dibujar la dirección del sendero | Planificar zonas funcionales en el espacio vacío |
| ④ Añadir piezas medias | Árbol, estanque, valla | Rellenar volúmenes medios, enriquecer capas |
| ⑤ Añadir piezas pequeñas | Piedras, flores, placa de puerta | Los detalles al final, evitan interferencia temprana en el juicio |
| ⑥ Ajustar ambiente | Color, opacidad, ángulo de vista | Unificar el tono, rematar y exportar |

❓ **Piénsalo**: ¿por qué "los detalles al final"? — porque los detalles **interfieren tu juicio del conjunto**. Con un montón de piedritas ahí, es difícil ver si la posición de la casa está bien. Primero fija las grandes relaciones, y los detalles cobran sentido. En pintura se llama "de lo global a lo局部", en 3D es igual.

### 44.3 ① Extiende el suelo

1. En figuras 2D arrastra un `square2` cuadrado, amplíalo como suelo del patio;
2. Verde + textura «Cuadrícula» = césped;
3. Cambia a «**Vista superior**», confirma que el rango es lo bastante grande — **mejor un poco más grande**, luego añadirás cada vez más cosas, y si el sitio es pequeño es difícil de cambiar.

💡 Se recomienda extender otra placa base clara más grande en el anillo exterior (recuerda usar `PgDn` para que quede **un paso más baja** que el césped, evitando parpadeo por coplanaridad), como "el espacio fuera del patio", la imagen ganará sentido de límite.

### 44.4 ② Coloca la casa

Reutiliza directamente el resultado del capítulo 41:

- Si guardaste el proyecto, `Ctrl + O` para importarlo;
- Si no lo guardaste no pasa nada, reconstruye según 41.2～41.6 (esta vez será mucho más rápido).

Sugerencia de ubicación: **no la pongas en el centro exacto**. Coloca la casa en la **parte trasera y a un lado** del patio, dejando un gran espacio vacío al frente — así la composición es más natural, y deja sitio para el sendero y el estanque.

💡 **Saber de composición**: poner el sujeto justo en el centro de la imagen se ve rígido; desviarlo ligeramente del centro lo hace más vivo. En fotografía se llama "regla de los tercios", puedes usar las líneas de la cuadrícula del suelo para estimar la posición.

### 44.5 ③ Usa el pincel para dibujar el sendero

Este es el uso clásico de la herramienta de pincel (capítulo 24) en la práctica:

1. Panel izquierdo «Herramientas» → **Pincel 2D**;
2. Ajusta el color (amarillo tierra / gris claro) y el grosor de línea (algo grueso, como un camino);
3. Desde la entrada del patio arrastra hasta la puerta de la casa, dibuja una línea **ligeramente curva**;
4. Al terminar, sal de la herramienta de pincel (pulsa `Esc` o cambia a selección).

⚠️ **Dos disciplinas del pincel**:
1. El trazo del pincel queda "fijo" al terminarlo, **no se puede ajustar la forma finamente como las figuras** — si lo dibujas torcido, `Ctrl + Z` para deshacer y redibujar, no intentes corregir;
2. La forma del trazo del pincel **queda fijada al terminar, no se puede ajustar finamente como las figuras estándar** (pero el objeto trazo en sí admite escala en conjunto).

💡 ¿Por qué el sendero debe ser "ligeramente curvo" en vez de recto? — una línea recta parece plano técnico, una línea curva parece vida. Este pequeño detalle hace que la escena gane "calidez humana" al instante.

✏️ **Practica**: primero dibuja un camino recto, míralo; `Ctrl + Z` deshacer, luego dibuja uno curvo, compara la sensación. Este método de "hacer dos versiones y comparar" es el camino más rápido para mejorar el gusto estético.

### 44.6 ④ Añade árbol, estanque y valla

**Árbol** (de dos segmentos):
1. `cylinder` cilindro fino y largo → tronco, marrón oscuro;
2. `sphere` esfera → copa, verde, `PgUp` para ponerla encima del tronco;
3. Selecciona tronco y copa (`Shift` para añadir a la selección, ambos seleccionados) → `Ctrl + D` clona el árbol entero → muévelo a otro sitio.

💡 Aquí se usa el mecanismo clave del capítulo 38: **al clonar en múltiple selección, la posición relativa de las dos piezas se mantiene**, así que se copia "un árbol completo", no se desarma. Para plantar una fila de árboles solo repite "clonar + `Shift +` tecla de dirección".

⚠️ No hagas todos los árboles exactamente del mismo tamaño — tras clonar, usa a mano `+` / `-` para dar a cada uno una diferencia de tamaño de unos 5%, y la sensación natural aparece al instante. **Regularidad con algo de aleatoriedad es el secreto para que la escena se vea real.**

**Estanque**:
1. Figura 2D `ellipse` elipse o `circle2` círculo, tumbada en el suelo;
2. `PgUp` para subirla **un paso pequeño** (que no sea coplanar con el césped);
3. Color azul claro, textura «**Olas**»;
4. **Baja la opacidad a 0.6** — la sensación de agua semitransparente aparece (sección 20.2).

**Valla** (uso de manual del arreglo de clonación):
1. `box` aplanado en una tabla vertical fina y larga → un barrote;
2. `Ctrl + D` clona → `Shift +` tecla de dirección para mover un espacio entero → otra `Ctrl + D` → mueve de nuevo……
3. Repite hasta llenar un lado;
4. Terminado ese lado, `Shift` selecciona toda la fila → `Ctrl + D` clona la fila entera → usa `Shift + A` para girar **90°** → muévela al otro lado del patio.

💡 El paso 4 es la culminación de los diez tomos anteriores: **múltiple selección + clonación + rotación del grupo entero 90°**, tres habilidades usadas de una vez. Hecho este paso, básicamente puedes decir que "has salido ya".

### 44.7 ⑤ Añade detalles pequeños

- **Piedras**: `sphere` o `dodeca` dodecaedro reducido, clona unas pocas y esparce a los lados del sendero, color gama gris pero **de distinto claro/oscuro**;
- **Flores**: `star` estrella de cinco puntas (2D) o esferas pequeñas, color brillante, adornan el césped;
- **Placa de puerta**: versión reducida del cartel del capítulo 42, colgada en la entrada, con el número de puerta;
- **Muro de fotos**: usa «Añadir imagen» para poner una imagen tuya (capítulo 23), como panel expositor en el patio.

⚠️ Los detalles deben ser **contenidos**. Detente cuando se vea "rico pero no caótico". Criterio: cambia a «Vista superior» y míralo desde arriba; si de un vistazo no distingues el principal del secundario, significa que añadiste demasiado, borra algunos.

### 44.8 ⑥ Ajusta el ambiente y exporta

**Unificar el tono de color** (el paso que más eleva la calidad):

| Ambiente deseado | Cómo ajustar |
|---|---|
| Mañana | En conjunto claro y frío (azul claro, marfil), opacidad algo más alta |
| Atardecer | En conjunto cálido (naranja, marrón, oro), oscurece el color del lado en sombra |
| Cuento | Alta saturación (rosa, cian, amarillo brillante), textura «Puntos» |
| Minimalista | Solo negro/blanco/gris + un color de acento |

💡 Usa la técnica de la sección 18.2 para unificar el tono: **fija la barra de matiz sin moverla, solo cambia luminosidad y saturación**, y los colores de toda la escena se "armonizarán" automáticamente. Esta es la forma más fácil y efectiva de colorear.

**Flujo de exportación** (igual que 43.7):
1. Prueba los 7 ángulos de vista en la parte inferior, elige el más bonito (normalmente «Perspectiva» con un leve ángulo descendente);
2. Oculta ejes de coordenadas y superficie de cuadrícula (capítulo 28), la imagen queda limpia al instante;
3. `F11` pantalla completa;
4. `Ctrl + P` captura;
5. `Ctrl + S` guarda el proyecto.

✏️ **Último ejercicio**: captura **tres imágenes desde ángulos distintos** de la misma escena — vista superior (plano de layout), vista frontal (plano de elevación), perspectiva (imagen de efecto). Este es exactamente el trío estándar con que los arquitectos entregan un proyecto. Ya puedes hacerlo.

### 44.9 Lista de autocomprobación cuando te atasques

Al hacer escenas grandes es muy fácil "volverse cada vez más caótico". Si te atascos, autocomprueba con esta tabla:

| Síntoma | Probablemente porque | Cómo rescatar |
|---|---|---|
| Cada vez más caótico, no sabes qué hacer | No seguiste el orden "primero grande, luego pequeño" | Detente, cambia a vista superior y mira el conjunto, fija primero las posiciones de las piezas grandes |
| Las cosas se atraviesan y parpadean | Coplanaridad (Z-fighting) | Usa `PgUp`/`PgDn` para separar las capas |
| Proporción desajustada, algo especialmente grande | Sin referencia | Coloca un objeto de tamaño conocido como "regla", ajusta los demás según él |
| Colores caóticos, se ve barato | Demasiados tipos de color | Reduce a menos de 3 colores, usa claro/oscuro para las capas |
| No puedes seleccionar el objeto deseado | Tapado por otro objeto | Cambia de ángulo y vuelve a clicar, o mueve primero el que tapa |
| Las teclas de dirección de repente no mueven el objeto | No seleccionado / cursor en cuadro de entrada | Ver sección 32.1, tríada de solución de problemas |
| De repente desaparece todo | Tocaste sin querer `Ctrl + Del` para vaciar | `Ctrl + Z` deshacer; la próxima vez guarda primero |

### 44.10 Palabras de clausura: de "saber usar" a "saber hacer"

Mira hacia atrás el camino recorrido:

- En el primer tomo aún preguntabas "qué es el 3D";
- En el quinto tomo aprendiste a hacer que la escena hable;
- En el octavo tomo tu mano soltó el ratón;
- En el décimo tomo podías dirigir un grupo de objetos de una vez;
- Ahora, has completado por ti mismo una casita con patio.

Los botones de la herramienta son limitados (20 en 3D + 20 en 2D + 12 texturas + 8 fuentes), pero **las combinaciones son infinitas**. Lo que realmente determina la altura de una obra nunca es cuántos botones sepas, sino:

1. **Capacidad de descomposición** — poder ver un objeto complejo como la combinación de figuras geométricas simples;
2. **Conciencia de orden** — primero lo grande, luego lo pequeño; primero lo fijo, luego lo decorativo;
3. **Juicio estético** — saber cuándo detenerse.

Estas tres cosas, los cuatro proyectos de esta parte las entrenan una y otra vez. Lo demás, queda para la práctica.

💡 **Sugerencia para tu siguiente paso**: busca una foto que te guste (habitación, esquina de calle, juguete), e intenta "recrearla" con esta herramienta. Que no salga igual no importa — **en lo que "no sale igual", encontrarás los problemas que de verdad te pertenecen**, ahí es donde empieza el progreso.

---

✏️ **Resumen de esta parte**: los cuatro proyectos corresponden a cuatro capacidades — la casa entrena **descomposición de volúmenes**, el lema entrena **maquetación de texto y falso 3D**, el emblema entrena **alineación en capas y color**, el patio entrena **flujo completo y coordinación**. Tres reglas de hierro que lo atraviesan todo: **ante Z-fighting, súbelo un paso**, **para simetría y repetición, usa clonación**, **haz lo que hagas, míralo desde la vista correspondiente**. La siguiente parte es la última del libro: manual de solución de problemas, glosario, búsqueda rápida de atajos e índice, como herramienta de consulta rápida para tu creación futura.

---

# Parte 12: Solución de problemas y apéndices

> Esta parte es un "manual de consulta", no está pensada para leerse de principio a fin, sino para **consultarla cuando te quedas atascado**.
>
> Si en cualquier parte anterior te encuentras con un "ey, qué no está bien", primero consulta la tabla de la Capítulo 45; si quieres saber qué significa un término, consulta el Capítulo 46; si olvidaste los atajos de teclado, consulta el Capítulo 47; si quieres confirmar cómo se llama o cómo se ve una figura/patrón/fuente, consulta el Capítulo 48.
>
> Se recomienda **guardar o imprimir** las tres tablas (solución de problemas, atajos de teclado, índice) y tenerlas a mano al crear.

---

## Capítulo 45: Manual de solución de problemas frecuentes

### 45.1 Solución de problemas generales

La siguiente tabla se ordena como "fenómeno que ves → causa probable → cómo remediarlo". La gran mayoría de los problemas tiene explicación; no te apresures a sospechar que sea un bug.

| N.º | Fenómeno | Causa probable | Solución |
|---|---|---|---|
| 1 | Las teclas de dirección, `+`/`−` no responden sobre el objeto | No hay objeto seleccionado, o el cursor está en el cuadro de entrada numérica del panel derecho | Haz clic primero en un espacio en blanco de la escena, asegúrate de haber seleccionado el objeto y de que el cuadro de entrada haya perdido el foco (sección 32.1) |
| 2 | Dos caras parpadean, se atraviesan mutuamente | Dos planos coinciden (**Z-fighting**) | Usa `PgUp`/`PgDn` para elevar/descender uno de los planos un paso y separarlos (secciones 41.5, 43.4) |
| 3 | El texto es tan grande que cubre toda la escena | El tamaño de fuente predeterminado del texto es **80**, muy superior a la escala de los cuerpos | Reduce el tamaño de fuente, o escala el objeto de texto en conjunto (secciones 21, 41.7, 42.3) |
| 4 | Cambias el tamaño de fuente pero las teclas de dirección dejan de funcionar | El cursor sigue dentro del cuadro de entrada numérica sin salir | Haz clic primero en un espacio en blanco de la escena para que el cuadro de entrada pierda el foco (sección 32.1) |
| 5 | `Ctrl+C`/`Ctrl+D`/`Ctrl+V` no responden | Los controles de transformación están activos, o no hay objeto seleccionado | Pulsa primero `Esc` para salir de los controles de transformación, luego selecciona el objeto y opera (Capítulos 33, 39) |
| 6 | Al seleccionar múltiples, `+`/`−` es rechazado | En selección múltiple está **prohibido el escalado conjunto** (avisa "NoScaleMulti") | Cancela la selección múltiple y escala uno por uno, o usa los controles de transformación arrastrando el asidero (sección 36.4) |
| 7 | Al seleccionar texto se desactiva el modo de escalado | El **texto no admite escalado uniforme**, vuelve automáticamente al modo de traslación | Para cambiar el tamaño del texto usa el parámetro «tamaño de fuente» (Capítulo 21); las imágenes y los trazos del pincel sí pueden escalarse con normalidad (secciones 24, 36.4) |
| 8 | El pincel/figura quedó torcido y quieres cambiar la forma | El trazo del pincel queda fijado al terminar de dibujar, no se puede ajustar fino como las figuras | `Ctrl+Z` para deshacer y redibujar (secciones 24, 44.5) |
| 9 | Quieres centrar pero no encuentras el botón "Centrar" | Esta herramienta **no tiene un botón de centrado con un clic** | Tres métodos: apóyate en la cuadrícula, en clonar concéntrico, o en los cuadros numéricos (sección 43.5) |
| 10 | No logras hacer texto a lo largo de un arco (texto circular) | Esta herramienta **no admite texto circular** | Usa texto horizontal en la parte inferior, o separa en caracteres individuales y rota cada uno para colocarlo (sección 43.6) |
| 11 | Cómo ajustar los parámetros de forma de ciertas figuras 2D (corazón/flecha/media luna/cruz/rayo) | Cada una **tiene parámetros de forma independientes** (corazón `ancho/alto/profundidad de la punta`, flecha `longitud/ancho`, media luna `radio exterior/radio interior/desplazamiento`, cruz `longitud/anchura del brazo`, rayo `alto/ancho`, etc., véase sección 12.2) | Ajústalos directamente en los parámetros de forma correspondientes del panel derecho (secciones 12.2, 43.4) |
| 12 | Borraste accidentalmente toda la escena o contenido importante | Resbalón con `Delete`, o vaciaste la escena | `Ctrl+Z` inmediatamente para deshacer; y acostúmbrate a guardar por etapas con `Ctrl+S` (sección 44.1) |
| 13 | Al importar JSON avisa "Error al cargar" | Archivo dañado, o no es el formato exportado por esta herramienta | Confirma que uses el `.json` exportado con `Ctrl+S` de esta herramienta (Capítulo 6) |
| 14 | El botón de vista no se ilumina, la cámara se apaga tras girar | Tras rotación libre el botón "Perspectiva" se apaga (comportamiento normal) | Haz clic en algún botón de vista para realinear (Capítulo 28) |
| 15 | 📱🤖 En táctil, arrastrar solo gira la vista, no sale el rectángulo de selección | En táctil, la selección por cuadro requiere **entrar primero en modo de selección por cuadro** | Haz clic primero en el botón «Selección por cuadro» de la barra inferior (se pone azul) y luego arrastra con un dedo; **al terminar el cuadro sale automáticamente**, para volver a hacerlo hay que volver a hacer clic (sección 7.4) |
| 16 | Cambias el color global, pero un objeto no cambia | Ese objeto tiene **color independiente de sobreescritura**, o está en estado "sin color" | Selecciónalo y cámbiale el color individualmente (Capítulo 18) |
| 17 | El cuentagotas de pantalla no funciona | No activaste primero la herramienta de cuentagotas | Haz clic en el botón de cuentagotas del área de color y luego toma el color (Capítulo 18) |
| 18 | En la captura aparecen líneas de cuadrícula/ejes de coordenadas | No ocultaste los elementos auxiliares | Oculta los ejes de coordenadas y las caras de cuadrícula antes de `Ctrl+P` (secciones 28, 43.7) |
| 19 | El objeto clonado "se desarma" | Antes de clonar en selección múltiple no seleccionaste todo el grupo | Usa `Shift` para seleccionar todo el conjunto y luego `Ctrl+D` (Capítulo 38) |
| 20 | La dirección de rotación de la vista/objeto está invertida | Confundiste los ejes: `A/D` gira sobre Z, `W/S` sobre Y, `Q/E` sobre X | Sigue la tabla rápida del Capítulo 47, o prueba con `Shift` + teclas de dirección en ángulos grandes (Capítulos 32, 34) |

💡 **Primer principio para la solución de problemas**: el 90% de lo "raro" tiene solo tres causas raíz —**no hay selección**, **el cursor está en el cuadro de entrada**, **dos planos coinciden**. Recita primero estas tres frases, y luego consulta la tabla según el síntoma; te ahorrará la mitad del tiempo.

### 45.2 Problemas exclusivos por plataforma

La tabla anterior es en su mayoría común a las cuatro plataformas. Los siguientes aparecen solo en formas específicas:

**🖥️📱 Versión web**

| Fenómeno | Causa | Solución |
|---|---|---|
| Se abre como página en blanco | Los recursos de la página no terminaron de cargar, o el navegador es muy viejo | Actualiza; pulsa `F12` para ver errores rojos en la consola; cambia a Chrome / Edge de versión nueva |
| Avisa que no admite WebGL | El navegador tiene desactivada la aceleración por hardware | En la configuración del navegador activa "Usar aceleración por hardware" y reinicia el navegador |
| 📱 En móvil el panel ocupa toda la pantalla | La lógica de auto-repliegue en pantalla estrecha no se disparó | Usa en horizontal, o haz clic manualmente en el botón del borde para replegar el panel |
| 📱 Al pulsar el botón de retroceso del móvil sales directamente de la página | La versión web no puede interceptar la tecla de retroceso del navegador | Usa el botón de cierre de la interfaz en su lugar; exporta las obras importantes antes |

**💻 Versión PC**

| Fenómeno | Causa | Solución |
|---|---|---|
| Al instalar avisa "Editor desconocido" | El paquete de instalación no tiene firma digital | Haz clic en «Más información» → «Ejecutar de todos modos»; es común en proyectos de código abierto personales |
| Pantalla blanca tras iniciar | Controlador de tarjeta gráfica muy viejo, WebGL no disponible | Actualiza el controlador de la tarjeta gráfica y reinicia |
| Cierre anómalo la vez anterior, se perdió el progreso | — | La versión PC tiene **recuperación ante fallos**; al reabrir, presta atención al aviso de recuperación |
| Arrastrar archivo a la ventana no responde | Lo que arrastras no es un archivo de proyecto `.json` | Solo admite `.json` exportado por esta herramienta |

**🤖 Versión Android**

| Fenómeno | Causa | Solución |
|---|---|---|
| No se puede instalar el apk | No se permite "origen desconocido" | Ajustes → Seguridad → Permitir que esta app instale apps desconocidas |
| No encuentro el botón «Pantalla completa» | La versión Android corre a pantalla completa | Es un diseño normal, no hace falta buscarlo |
| No encuentro el archivo exportado | Está en el almacenamiento de la app | Usa el panel de **compartir** tras exportar para enviarlo directamente, o usa el gestor de archivos para ver el directorio de la app |
| Toque accidental al botón de retroceso y miedo a perder la obra | — | Al salir aparecerá un cuadro de confirmación, elige «**Guardar y salir**» |

---

## Capítulo 46: Glosario de términos (español-inglés)

Glosario de consulta rápida. Los marcados con `*` son términos propios de esta herramienta.

| Chino | Inglés | Explicación en una frase |
|---|---|---|
| Unidad de cuadrícula* | GRID_UNIT | La longitud de una celda del suelo, también la base del paso de movimiento (0.1 celda / 1 celda) |
| Arriba es Z* | Z-up | Esta herramienta usa el eje Z como "arriba", a diferencia de la mayoría de software 3D que usa Y como "arriba" |
| Parpadeo por coincidencia | Z-fighting | Parpadeo y atravesamiento causados por dos caras a la misma profundidad compitiendo por la posición |
| Análisis de bloques | block analysis | La idea de descomponer un objeto complejo en combinación de geometrías simples (pensamiento de construir con bloques) |
| Escalado uniforme | uniform scale | Bloquear la proporción de largo/ancho/alto para ampliar o reducir juntos, evitando deformación |
| Conjunto de selección* | selection set | El grupo de objetos actualmente seleccionados (formado con `Shift` al añadir) |
| Pivote maestro* | master pivot | El centro de control público de todo el grupo al transformar en selección múltiple (Capítulo 38) |
| Clonar | clone | Duplicar un objeto idéntico (`Ctrl+D`) |
| Matriz* | array | Repetir clones ordenadamente en disposición (varios `Ctrl+D` + teclas de dirección) |
| Controles de transformación | transform controls | Los tres "elementos de agarre" en la escena: asideros de flecha/anillo/cubo |
| Modo de traslación | translate mode | Arrastrar el objeto con la flecha |
| Modo de rotación | rotate mode | Usar el anillo para decidir sobre qué eje girar |
| Modo de escalado | scale mode | Ampliar o reducir con el asidero de cubo |
| Patrón | pattern / texture | Las 12 texturas procedimentales pegadas sobre la superficie del objeto (no son mapas externos) |
| Opacidad | opacity | 0.1=casi totalmente transparente (límite inferior del deslizador, no puede ser realmente transparente del todo), 1=totalmente opaco; semitransparente para agua, vidrio, halo de luz |
| Vista | view / camera | 7 posiciones de cámara predefinidas: perspectiva/superior/inferior/frontal/posterior/izquierda/derecha |
| Trazo de pincel* | brush stroke | Línea fijada dibujada por la herramienta de pincel; tras dibujar no se puede ajustar fino ni escalar |
| Cuentagotas de pantalla | eyedropper | Tomar un color desde cualquier punto del lienzo |
| Pila de historial | history stack | Registro de operaciones del que dependen deshacer/rehacer (Capítulo 10) |

---

## Capítulo 47: Tabla rápida de atajos de teclado

> Todos los atajos de teclado **no distinguen mayúsculas/minúsculas**; `Ctrl` en Mac equivale a `Cmd`.
> Nota: siempre que el cursor esté en un cuadro de entrada/desplegable, el atajo dejará de funcionar —esto es un comportamiento normal, no un bug (sección 32.1).
>
> 📌 **Formas aplicables**: los atajos de teclado aplican a 🖥️ **web·ratón** y 💻 **versión PC**.
> 📱🤖 **web·táctil / versión Android** no tienen teclado físico; consulta la tabla de gestos en 47.2 (salvo que se conecte un teclado externo).

### 47.1 Operaciones con ratón (🖥️ web·ratón / 💻 versión PC)

| Operación | Descripción |
|---|---|
| Clic izquierdo | Seleccionar objeto/control |
| Doble clic izquierdo | Editar texto |
| Mantener clic izquierdo | Operar objeto/control |
| Mantener clic derecho | Rotar la vista |
| Mantener rueda | Trasladar la vista |
| Deslizar rueda | Escalar la vista |

### 47.2 Operaciones con gestos (📱 web·táctil / 🤖 versión Android)

| Operación | Descripción |
|---|---|
| Tocar con un dedo | Seleccionar objeto/control |
| Doble toque con un dedo | Editar texto |
| Mantener un dedo sobre objeto | Añadir/quitar selección (equivalente a clic con `Shift`) |
| Arrastrar objeto con un dedo | Operar objeto/control |
| Arrastrar espacio en blanco con un dedo | Rotar la vista |
| Tocar suave espacio en blanco con un dedo | Cancelar selección |
| Botón «Seleccionar todo» | Seleccionar todos los objetos (equivalente a `Ctrl+A`) |
| Botón «Selección por cuadro» | Al activarlo, arrastrar con un dedo para selección por cuadro; **al terminar el cuadro sale automáticamente**, hay que volver a tocar para volver a hacerlo |
| Arrastrar con dos dedos | Trasladar la vista |
| Pellizcar con dos dedos | Escalar la vista |
| Tocar el botón de retroceso (🤖 **solo Android**) | Cerrar por capas notas / índice / manual → cancelar selección → confirmar salida |

### 47.3 Operaciones de tecla simple (🖥️💻 requiere teclado)

> Al seleccionar objeto: trasladar 0.1 cuadrícula (0.15 de longitud) / rotar 5°; sin selección: trasladar la vista 0.1 cuadrícula / rotar 5°.

| Tecla | Al seleccionar objeto | Sin selección |
|---|---|---|
| `↓` / `↑` | Trasladar +/− sobre eje X | Trasladar la vista atrás / adelante |
| `→` / `←` | Trasladar +/− sobre eje Y | Trasladar la vista derecha / izquierda |
| `PgUp` / `PgDn` | Trasladar +/− sobre eje Z | Trasladar la vista arriba / abajo |
| `A` / `D` | Rotar horario / antihorario sobre eje Z | Rotar la vista izquierda / derecha |
| `W` / `S` | Rotar horario / antihorario sobre eje Y | Rotar la vista arriba / abajo |
| `E` / `Q` | Rotar horario / antihorario sobre eje X | — |
| `+` / `-` | Ampliar / reducir 5% | — |

> 📝 **Tratamiento especial al seleccionar «objeto de texto»**: el texto no admite escalado uniforme; en este caso `+` / `-` cambian el **tamaño de fuente** (cada vez aprox. ±10%, rango 24–220), no escalan el objeto. Para cambiar el tamaño en conjunto usa directamente el parámetro «tamaño de fuente».

| `Esc` | Cancelar operación | Cerrar control |
| `F11` | 🖥️📱 Pantalla completa / salir de pantalla completa; 💻 Maximizar / restaurar | (igual arriba) |
| `Del` / `Backspace` | Eliminar objeto seleccionado | — |

### 47.4 Combinaciones con Shift

> Al seleccionar objeto: trasladar 1 cuadrícula (1.5 de longitud) / rotar 90°; sin selección: trasladar la vista 1 cuadrícula / rotar 90°.

| `Shift` + tecla | Al seleccionar objeto | Sin selección |
|---|---|---|
| `↓` / `↑`, `→` / `←`, `PgUp` / `PgDn` | Trasladar 1 cuadrícula | Trasladar la vista 1 cuadrícula |
| `A` / `D`, `W` / `S`, `E` / `Q` | Rotar 90° | Rotar la vista 90° |
| `+` / `-` | Ampliar ×2 / reducir ×0.5 | — |
| Clic izquierdo | Añadir objeto a selección (clic) | (igual arriba) |
| Mantener clic izquierdo (herramienta de pincel) | — | Modo de línea recta restringida del pincel (al dibujar el trazo se restringe a horizontal / vertical / 45°, mismo efecto que la restricción con `Shift`) |

### 47.5 Deslizadores / cuadros de entrada

> Toma efecto al enfocar el deslizador o el cuadro de entrada; los atajos originales se desactivan temporalmente.

| Tecla | Deslizador | Cuadro de entrada |
|---|---|---|
| `→` / `←` | Aumentar / reducir | Mover cursor |
| `↑` / `↓` | Aumentar / reducir | Aumentar / reducir |
| `+` / `-` | — | Ingresar signo positivo / negativo |
| `PgUp` / `PgDn` | Aumentar / reducir en gran paso | Desplazar hacia arriba / abajo la columna derecha |

### 47.6 Combinaciones con Ctrl

| `Ctrl` + tecla | Combinación |
|---|---|
| `A` | Seleccionar todo |
| `N` | Nueva escena |
| `O` | Importar escena |
| `S` | Exportar escena |
| `P` | Capturar y exportar imagen |
| `Z` | Deshacer |
| `Y` | Rehacer |
| `C` | Copiar |
| `V` | Pegar |
| `D` | Clonar |
| `Del` | Vaciar escena |

---

## Capítulo 48: Índice de figuras · patrones · colores

Aquí están todas las "piezas de material" de esta herramienta. La paleta de colores usa **paleta predefinida + selección de color personalizada** (Capítulo 18); en sí misma no tiene una "lista de colores fija", así que aquí solo se listan cuatro categorías: formas, patrones, fuentes y vistas; la parte de color da sugerencias de uso.

### 48.1 20 figuras 3D

| N.º | id interno | Nombre en chino | Uso típico |
|---|---|---|---|
| 1 | `box` | Cubo | Muro, placa, cuerpo de casa, escalón — cuerpo base universal |
| 2 | `sphere` | Esfera | Copa de árbol, planeta, canica, cabeza |
| 3 | `cylinder` | Cilindro | Columna, tarro, tronco, chimenea, soporte |
| 4 | `cone` | Cono | Torre de punta, helado, señal de tráfico, hoguera |
| 5 | `torus` | Toro | Dona, neumático, anillo, pulsera |
| 6 | `knot` | Nudo | Modelo artístico de nudo de trébol, decoración |
| 7 | `icosa` | Icosaedro regular | Cristal poliédrico, dado de ciencia ficción |
| 8 | `octa` | Octaedro regular | Gema bicónica, cristal |
| 9 | `dodeca` | Dodecaedro regular | Cristal de doce caras, adorno |
| 10 | `capsule` | Cápsula | Píldora, articulación, columna de cabeza redonda |
| 11 | `pyramid` | Pirámide cuadrangular regular | Pirámide, techo (techo cuadrado con pared cuadrada) |
| 12 | `prism` | Prisma triangular regular | Columna triangular, cuña, pendiente |
| 13 | `tube` | Tubo | Tubería curva, manguera, riel |
| 14 | `lathe` | Cuerpo de revolución | Jarrón, tazón, botella (cuerpo torneado por rotación) |
| 15 | `tetra` | Tetraedro regular | Pirámide de cuatro puntas, fragmento, viruta de cristal |
| 16 | `barrel` | Cuerpo de barril | Barril de madera, barril de vino, tambor |
| 17 | `dome` | Hemisferio | Cúpula, tapa de tazón, radomo |
| 18 | `helix` | Anillo en espiral | Resorte, escalera en espiral, sensación de ADN |
| 19 | `octaPrism` | Prisma octogonal regular | Columna de ocho lados, faro, columna de pabellón |
| 20 | `star3d` | Estrella 3D | Decoración de estrella tridimensional, medalla |

💡 Entre las 20, `box / sphere / cylinder / cone / pyramid` son las cinco protagonistas de la "descomposición de bloques" (Capítulo 41); las demás se usan sobre todo para decoración y toques.

### 48.2 20 figuras 2D (tendidas sobre el suelo, como calcomanía/plano)

| N.º | id interno | Nombre en chino | Nota |
|---|---|---|---|
| 1 | `square2` | Cuadrado | Césped, base, el más usado |
| 2 | `circle2` | Círculo | Base, estanque |
| 3 | `triangle` | Triángulo equilátero | |
| 4 | `star` | Estrella (estrella de cinco puntas) | |
| 5 | `hexagon` | Hexágono regular | Base de sensación tecnológica/industrial |
| 6 | `heart` | Corazón | Incluye parámetros de forma como `escalar` (sección 12.2) |
| 7 | `pentagon` | Pentágono regular | Sensación de escudo/academia |
| 8 | `octagon` | Octágono regular | Sensación de identidad sobria |
| 9 | `ellipse` | Elipse | Estanque, lente |
| 10 | `parallelogram` | Paralelogramo | |
| 11 | `trapezoid` | Trapecio | |
| 12 | `diamond` | Rombo | |
| 13 | `rightTri` | Triángulo rectángulo | |
| 14 | `arrow` | Flecha | Incluye parámetros como `longitud/ancho` (sección 12.2) |
| 15 | `crescent` | Media luna | Incluye parámetros como `radio exterior/radio interior/desplazamiento` (sección 12.2) |
| 16 | `semicircle` | Semicírculo | |
| 17 | `ring2d` | Anillo (2D) | Distinto del 3D `torus`, este es un anillo plano |
| 18 | `cross` | Cruz | Incluye parámetros como `longitud del brazo/anchura del brazo` (sección 12.2) |
| 19 | `lightning` | Rayo | Incluye parámetros como `alto/ancho` (sección 12.2) |
| 20 | `teardrop` | Gota de agua | |

💡 Los números 6, 14, 15, 18, 19 (corazón/flecha/media luna/cruz/rayo) **tienen cada uno sus propios parámetros de forma independientes** (véase sección 12.2, p. ej. corazón es `ancho/alto/profundidad de la punta`, flecha es `longitud/ancho`, media luna es `radio exterior/radio interior/desplazamiento`, rayo es `alto/ancho`), se pueden ajustar directamente en el panel derecho; los demás figuras 2D son principalmente polígonos, y pueden ajustar parámetros extra como "número de lados/ángulo".

### 48.3 12 patrones (texturas)

| N.º | Nombre en chino | Escena adecuada |
|---|---|---|
| 1 | Color sólido | Predeterminado, limpio sin textura |
| 2 | Cuadrícula | Césped, baldosa, tablero |
| 3 | Rayas | Tela, toldo, bandera |
| 4 | Puntos | Decoración de lunares, nieve (blanco + puntos) |
| 5 | Degradado | Cielo, fondo, sensación de luz |
| 6 | Pared de ladrillos | Muro (usado en la casa del Capítulo 41) |
| 7 | Rayas diagonales | Advertencia, sensación de velocidad |
| 8 | Ondas | Superficie de agua, pliegues de tela |
| 9 | Puntos dispuestos | Sensación tecnológica, puntos de cuadrícula |
| 10 | Cruzado | Cuadrícula, sensación de ingeniería |
| 11 | Malla | Referencia de suelo, base tecnológica |
| 12 | Roscas | Vórtice, energía, decoración de vórtice |

💡 Los patrones se **generan procedimentalmente**, no dependen de imágenes externas; el color se controla unificado por "Color" en el panel derecho, el patrón solo modula claroscuro/figura (Capítulo 19).

### 48.4 8 fuentes (herramienta de texto)

| N.º | Nombre de fuente | Estilo | Aplicable |
|---|---|---|---|
| 1 | YaHei | Sans-serif moderno | General, sensación de interfaz |
| 2 | Song | Serif | Tradicional, formal, libro |
| 3 | Kai | Kai manuscrito | Tradicional, placa, academia |
| 4 | Hei | Negro grueso sans-serif | Eslogan, llamativo |
| 5 | FangSong | FangSong | Documento oficial, solemne |
| 6 | Arial | Sans-serif occidental | Identificador en inglés |
| 7 | Times | Times New Roman serif | Formal occidental, placa de descripción |
| 8 | Courier | Courier New monoespaciado | Técnico, retro, estilo de máquina de escribir |

⚠️ El tamaño de fuente predeterminado es **80**, hay que reducirlo según la escala de los cuerpos (secciones 21, 42.3). Las fuentes chinas dependen de las fuentes del sistema, al cambiar de dispositivo pueden retroceder.

### 48.5 7 vistas (botones inferiores)

| N.º | Vista | Qué ver | Uso típico |
|---|---|---|---|
| 1 | Perspectiva | 3D oblicuo desde arriba, libre rotación 360° (predeterminado) | Ver efecto general, render de efecto |
| 2 | Vista superior | Vista cenital desde arriba | Disposición de suelo, emblema, composición plana |
| 3 | Vista inferior | Vista desde abajo | Ver cara inferior, composición especial |
| 4 | Vista frontal | Vista frontal plana | Juzgar pegado al suelo/en el aire, plano de alzado |
| 5 | Vista posterior | Vista plana desde atrás | Ver dorso, comprobación de simetría |
| 6 | Vista izquierda | Vista plana desde la izquierda | Comprobar atravismo izquierda/derecha |
| 7 | Vista derecha | Vista plana desde la derecha | Comprobar atravismo izquierda/derecha |

💡 **Experiencia central (una de las reglas de hierro que recorren todo el libro)**: usa la vista que corresponda a lo que haces. Para ajustar altura usa la vista frontal, para ver disposición usa la vista superior, para ver el conjunto usa la perspectiva. Tras rotación libre el botón "Perspectiva" se apaga, es un comportamiento normal.

### 48.6 Sugerencias de uso de color

Esta herramienta no tiene una "tabla de números de color fija"; el color se obtiene mediante **paleta predefinida + selección de color personalizada + cuentagotas de pantalla** (Capítulo 18):

- Para elegir color prioriza la **paleta predefinida** (agrupada por matiz, barra de matiz fija, la más fácil para lograr colores armoniosos);
- Para un color preciso usa la **selección de color personalizada** (ingresa valor de color);
- Para "un color en la escena" usa el **cuentagotas de pantalla** para tomarlo;
- Regla de hierro del color: **mantener dentro de 2–3 colores**, y crear jerarquía con tonos claros/oscuros del mismo matiz, es más profesional que añadir colores a lo loco (sección 43.8).

---

# Parte 13: Notas adhesivas y multilingüe

Hasta aquí ya has aprendido "cómo usar las herramientas". Esta parte trata dos pequeñas cosas que "te acompañan en el aprendizaje": las notas adhesivas para anotar mientras lees, y el multilingüismo del propio manual.

## Capítulo 49: Anotar mientras lees: las notas del manual

Al estudiar, a menudo quieres "marcar" algún párrafo. El manual te permite, en el texto principal, **seleccionar un fragmento de texto → añadir una nota adhesiva**:

1. Al leer el manual, selecciona cualquier texto:
   - 🖥️💻 **Versión de escritorio**: mantén pulsado el botón izquierdo y **arrastra para seleccionar**;
   - 📱 **Web · pantalla táctil**: mantén pulsado el texto y se seleccionará automáticamente la palabra bajo el cursor, apareciendo una capa flotante dentro de la aplicación de «Nota adhesiva / Resaltar / Copiar» (puedes seguir arrastrando para ajustar la selección); para compatibilidad con ROM nacionales (MIUI / ColorOS / vivo, etc.), se han desactivado el «arrastre súper» y el menú de pulsación prolongada nativo, y ya no aparece la barra de herramientas de copiar / compartir del sistema;
     - Si el texto seleccionado **se solapa con un resaltado existente**, la capa flotante mostrará en su lugar «Cancelar resaltado / Ampliar resaltado»: al pulsar «Ampliar resaltado» puedes extender el alcance de ese resaltado hasta los límites de la selección actual; al pulsar «Cancelar resaltado» se elimina la parte resaltada solapada.
   - 🤖 **Versión Android**: al mantener pulsado el texto aparece un ancla de selección y dos manejadores arrastrables; arrástralos para barrer el texto; ya no aparece la barra de copiar/compartir del sistema, sino que la capa flotante de la aplicación de «Nota adhesiva / Resaltar / Copiar» se encarga de ello;
2. Al soltar aparecerá un botón "Añadir nota adhesiva"; pulsa una vez;
3. El texto seleccionado se resaltará y se registrará en la **lista de notas adhesivas**;
4. Cada entrada de la lista de notas adhesivas se puede **eliminar** individualmente —antes de eliminar aparece un cuadro de confirmación para evitar borrados accidentales.

> 💡 La nota adhesiva "va con el texto": se vincula a la frase que seleccionaste, para que más adelante puedas revisar "en qué estaba pensando entonces".

## Capítulo 50: Hacer que las notas "floten" en la pantalla

Si no quieres alternar constantemente con la lista de notas, puedes **desplegar una nota adhesiva como ventana flotante**:

- La ventana de nota es una tarjeta flotante arrastrable, suspendida sobre el lienzo, sin obstaculizar la operación;
- La ventana de nota tiene dos estados: **solo lectura** y **edición**: en solo lectura es como una nota adhesiva, en edición puedes modificar el texto;
- Cuando ya no la necesites, pulsa el botón de cierre de la nota (`closeSticky`); desaparecerá de la pantalla, pero la nota en sí se conserva en la lista.

### 50.1 Capa flotante de notas y operaciones (coherente en las cuatro plataformas)

Una vez desplegada, la nota es una **tarjeta flotante fijada dentro de la página** (no es una ventana de sistema independiente); el comportamiento es coherente en las cuatro plataformas:

- Está **siempre en primer plano**, flotando sobre el lienzo, para que puedas operar mientras consultas el tutorial;
- Se puede arrastrar de posición, redimensionar la ventana y alternar «Fijar / Desfijar» (`manPin` / `manUnpin`);
- Admite **maximizar / restaurar** (`manMaximize` / `manRestore`);
- Admite **exportar / importar** notas (`manExport` / `manImport`), **seleccionar todo** y **eliminación por lotes** (`manSelectAll` / `manBatchDel`);
- Las acciones anteriores se activan con las teclas listadas en «Ajustes → Acciones rápidas» (en la versión PC también puedes pulsar los botones de la ventana).

> ⚠️ **Tres reglas de validación al importar notas** (coincidentes en las cuatro plataformas):
> 1. **Incoherencia de idioma → se omite todo el paquete**: si el idioma etiquetado del paquete de notas importado difiere del idioma actual de la interfaz, el sistema avisa «idioma no coincide» y **rechaza la importación**, evitando mezclar notas de otros idiomas;
> 2. **Aviso de versión antigua**: si un paquete de notas contiene un número de versión más antiguo (o distinto) que el software actual, tras importar avisa «hay notas de versión antigua», para que vigiles la compatibilidad;
> 3. **Notas antiguas sin etiqueta de idioma**: los paquetes de notas muy antiguos no tienen etiqueta de idioma; el sistema avisa «formato antiguo, sin idioma» pero las importa bajo el idioma actual para que verifiques manualmente.

> 📌 Las notas de las cuatro plataformas son capas flotantes dentro de la página; no se pueden arrastrar fuera de la ventana de la aplicación ni superponerse a otros programas.

### 50.2 Orden de cierre de notas (⚠️ atención en plataformas táctiles 📱🤖)

🤖 En la versión Android, al pulsar **una vez la tecla de retroceso**, se **cierran primero las notas una por una** (si alguna tiene contenido sin guardar, te preguntará antes), luego se cierra el índice, luego se sale del manual, y finalmente se pregunta si deseas salir de la aplicación.

> 📌 Las notas son adecuadas para "avisos temporales": por ejemplo, pegar a un lado la explicación de un parámetro, para consultarla mientras trabajas.

### 50.3 Límite de cantidad y gestión por lotes

- **Máximo 5 notas flotantes desplegadas a la vez**: al superarse, el sistema **cierra automáticamente la más antigua abierta**, para garantizar el rendimiento y una interfaz limpia. La nota en sí se conserva en la lista de notas, sin pérdida.
- La lista de notas admite **eliminación por lotes**: en la lista puedes marcar varias notas a la vez y eliminarlas (también con cuadro de confirmación previo), sin tener que hacerlo una por una.

## Capítulo 51: Multilingüe: el manual también "habla" tu idioma

Tanto la interfaz como el manual admiten nueve idiomas:

| Idioma | Interfaz | Manual |
| --- | --- | --- |
| 简体中文 | ✅ | ✅ |
| 繁體中文 | ✅ | ✅ |
| English | ✅ | ✅ |
| 日本語 | ✅ | ✅ |
| 한국어 | ✅ | ✅ |
| Русский | ✅ | ✅ |
| Español | ✅ | ✅ |
| Français | ✅ | ✅ |
| العربية (árabe) | ✅ | ✅ |

Modo de cambio: en Ajustes selecciona el idioma, y los textos de la interfaz y el contenido del manual **se cambian al mismo tiempo** a la versión correspondiente. El contenido multilingüe del manual se almacena respectivamente en `docs/使用说明书.md` (simplificado), `使用说明书_en.md`, `使用説明書_ja.md`, `使用說明書_zh-TW.md`, `사용설명서_ko.md`, `使用说明书_ru.md`, `使用说明书_es.md`, `使用说明书_fr.md`, `使用说明书_ar.md`.

💡 **Cómo se elige el idioma**: en el primer arranque se **detecta automáticamente el idioma del sistema** —según la configuración de idioma del sistema/navegador, se empareja automáticamente con idiomas comunes como 简体中文, 繁體中文, English, 日本語, Español, Français, العربية; si posteriormente cambias el idioma manualmente, el software **recuerda tu elección y la respeta por completo**, sin que el idioma del sistema lo sobreescriba. Es decir: la primera vez va con el sistema, y después se usa el que tú elijas.

✅ **Nueve idiomas × cuatro formas, todo conectado**: sea cual sea la plataforma o el idioma que elijas, lees el mismo manual adaptado a las tres plataformas. Para idiomas de escritura de derecha a izquierda (RTL, como el árabe), las tablas y la alineación dentro del manual se reflejan automáticamente.

> ⚠️ Sobre la confirmación de eliminación: todas las operaciones de eliminación (notas adhesivas, objetos de escena) usan un **cuadro de confirmación personalizado** en lugar del cuadro nativo del sistema, por lo que también se muestra de forma estable en **modo pantalla completa / inmersivo**, sin que pase lo de "pulsé y no responde".

---

✅ **El libro termina aquí.** Has recorrido: identificación de formas → bases 3D → gráficos y color → texto, pincel e imágenes → vista → historial de deshacer → explicación detallada de cada gráfico → atajos y gestos → controles de transformación → multiselección y clonado → cuatro proyectos prácticos → notas adhesivas y multilingüe → apéndice de dudas.

🌐 **No lo olvides**: tus obras pueden **pasarse libremente entre la versión web, la versión PC y la versión Android** —bosqueja en el móvil, retoca en el ordenador; el `.json` exportado es compatible en las tres plataformas.

📌 **La última frase**: las herramientas quedan obsoletas, pero "descomponer — orden — estética" son tres cosas que no. Cierra el documento y ve a construir algo tuyo.

<!-- __END__ -->
