# GETSEMANI A&B (GAB) — Plataforma Web Corporativa y Catálogo Interactivo

## 📋 Descripción del Proyecto

La arquitectura de archivos está organizada de manera modular para garantizar la separación de responsabilidades entre el marcado, la capa de estilos, la lógica del cliente y las fuentes de datos:

**GETSEMANI A&B (GAB)** es una plataforma web corporativa orientada a la presentación, distribución y cotización de productos gastronómicos de alta gama, especializada en Aceites de Oliva Virgen Extra de autor y Vinos de Reserva.

El proyecto ha sido desarrollado aplicando estándares modernos de desarrollo web (**HTML5 semántico, CSS3 modular y JavaScript Vanilla ES6+**), garantizando una arquitectura limpia, ligera, totalmente responsiva y optimizada para cualquier servidor de producción.

---

## Estructura del proyecto

```
GAB/
├── index.html              → Página de inicio
├── views/
│   ├── galeria.html
│   ├── presupuesto.html
│   └── contacto.html
├── css/
│   └── style.css
├── js/
│   ├── main.js              → lógica compartida (menú, carrusel, contadores, noticias, scroll)
│   ├── galeria.js
│   ├── contacto.js
│   ├── presupuesto.js
│   └── noticias.json
└── assets/img/
    ├── favicon-GAB.jpg      ⚠️ PENDIENTE: el archivo original estaba vacío (0 bytes), sustitúyelo
    ├── carrusel/slide1.jpg … slide6.jpg
    ├── coleccion-aceite.jpg, coleccion-vinos.jpg, coleccion-gourmet.jpg
    ├── producto1.jpg, producto2.jpg, producto3.jpg
    ├── hero.jpg, banner-export.jpg, sostenibilidad.jpg
    └── galeria/aceite1.jpg, aceite2.jpg, vino1.jpg, vino2.jpg, empresa1.jpg…empresa4.jpg
```


## Qué estaba roto y qué se corrigió

1. **`main.js` no ejecutaba absolutamente nada.** Había un error de sintaxis (`}};` en vez de `});`) al final del archivo, y además todo el código estaba duplicado. Un solo error de sintaxis detiene la ejecución de todo el script en JavaScript. Se reescribió limpio, sin duplicados.
2. **`noticias.json` era JSON inválido** (llave `{` duplicada + coma sobrante antes del `]`). Corregido y validado.
3. **La ruta del `fetch()` no coincidía con el archivo real** (`js/noticias.json` vs `noticias3.json`). Corregido, y ahora solo se ejecuta en la página que tiene el contenedor `#noticias` (evita peticiones innecesarias en las demás páginas).
4. **Enlace roto entre páginas**: el menú apuntaba a `presupuesto3.html` (sin "s") pero el archivo se llamaba `presupuestos3.html`. Ahora todos los nombres de archivo son exactos y coinciden con el enunciado: `index.html`, `galeria.html`, `presupuesto.html`, `contacto.html`.
5. **Rutas absolutas → rutas relativas.** El proyecto usaba rutas como `/TRABA_JS_AI-1/...`, que solo funcionan si el servidor está configurado con esa carpeta exacta como raíz. Ahora todo usa rutas relativas (`css/style.css`, `../css/style.css` desde `views/`), así que el sitio funciona igual en Live Server, en un hosting real, o subiendo la carpeta tal cual.
6. **`&` sin escapar en HTML.** "Getsemani A&B" aparecía como texto plano en títulos, meta tags y el footer; un `&` suelto no es válido en HTML y el validador de W3C lo marca como error. Ahora es `A&amp;B` en todo el HTML (en JavaScript no hace falta, ahí es texto normal).
7. **Enlaces de menú con `href="#..."` rotos** en galería y contacto (usaban `#` seguido de una ruta, lo cual es un ancla inválida). Ahora son enlaces normales.
8. **Footer con el aviso legal solo en una página.** Ahora las 4 páginas tienen el mismo footer completo (redes sociales, sedes, contacto, aviso legal).
9. **Validación de teléfono demasiado estricta**: exigía exactamente 9 dígitos; el enunciado pide "máximo 9 dígitos", así que ahora acepta de 1 a 9.
10. Se eliminó un bloque de texto suelto (una lista con ✅) al final de `style.css` que no era CSS válido, y un comentario largo sin relación con el sitio al final del antiguo `index3.html`.
11. Duplicado `index3.html` / `inicio3.html` → unificado en un único `index.html` (la versión con rutas ya corregidas).

## Pendiente / mejoras opcionales antes de entregar

- **Fotos reales**: sustituye los placeholders en `assets/img/` (ver arriba).
- **Favicon**: sube de nuevo `favicon-GAB.jpg`, está vacío.
- **Ruta real en el mapa de contacto**: ahora mismo se traza una línea recta entre el cliente y la empresa. Si quieres una ruta real por carretera (para más nota), puedo añadir Leaflet Routing Machine, que usa el servicio OSRM.
- **Validar el HTML** en https://validator.w3.org/ con las 4 páginas ya subidas, para confirmar 0 errores (ahora debería validar limpio, pero vale la pena comprobarlo con tus imágenes reales puestas).

## 🛒 Carrito de la galería (nuevo)

Cada foto de aceite o vino en `galeria.html` tiene un botón 🛒 en la esquina. Al pulsarlo:

- El producto se guarda en `localStorage` (persiste al cambiar de página).
- Aparece un icono flotante abajo a la izquierda con el número de unidades y un panel desplegable con +/− por producto.
- En `presupuesto.html` se muestra el detalle completo del carrito, con un **descuento automático por volumen**:
  - 2+ unidades → 5% de descuento
  - 4+ unidades → 10% de descuento
  - 6+ unidades → 15% de descuento
- El total general del presupuesto ahora es: `(producto + extras − descuento por plazo) + (carrito de galería − descuento por volumen)`, mostrado con un desglose claro.
- Los precios por categoría están en `js/carrito.js` (`PRECIOS_CATEGORIA`) — cámbialos si quieres precios distintos.
- Las fotos de la categoría "Empresa" no llevan botón de carrito, porque son instalaciones, no productos en venta.

## 📸 Sobre el enfoque/resolución de las fotos (New York, Tokio, hacienda)

No pude editar las fotos reales porque no las subiste como archivos de imagen (solo vi las rutas en el HTML). Lo que sí hice fue añadir una clase CSS `.zoom-out` que aleja visualmente la imagen dentro de su marco (útil cuando una foto se ve "pegada" o demasiado recortada). La apliqué en:

- Carrusel: slide de Nueva York y de Tokio (home).
- Tarjeta de la tienda de Nueva York y de Tokio (sección "Tiendas Internacionales").
- Tarjeta del centro operativo de Toscana (la de la casa y los olivares).

Esto **no mejora la resolución ni el enfoque real** de la foto — solo cambia el encuadre visual en la web. Si quieres una mejora de verdad, lo ideal es tomar/usar una foto de mayor calidad, o editarla en un programa como Photoshop/Lightroom/Photopea antes de subirla a `assets/img/`.

## Estructura de imágenes ampliada

```
assets/img/
├── carrusel/            slide1.jpg … slide6.jpg
├── galeria/
│   ├── galeria_aceite/  aceite1.jpg, aceite2.jpg, olio7.jpg, prodotti_olio_11.jpg … 18.jpg
│   ├── galeria_vinos/   olio3.jpg, olio4.jpg, olio5.jpg, prodotti_vino_24.jpg … 29.jpg, vino1.jpg, vino2.jpg
│   └── galeria_empresa/ empresa1.jpg, empresa2.jpg, empresa4.jpg
├── centros-operativos/  toscana.jpg, sardegna.jpg, genova.jpg
├── tiendas-mundo/       tienda-ny.jpg, tienda-tokio.jpg, tienda-seul.jpg
├── negocio-online/      negocio-online.jpg
├── historia/            foto-familia.jpg
├── testimonios/         dafne.jpg, natascia.jpg, testimonio1.jpg
├── coleccion-aceite.jpg, coleccion-vinos.jpg, coleccion-gourmet.jpg
├── producto1.jpg, producto2.jpg, producto3.jpg
└── favicon-GAB.jpg
```
