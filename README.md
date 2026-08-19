# GETSEMANI A&B (GAB) — Plataforma Web Corporativa y Catálogo Interactivo

## 📋 Descripción del Proyecto

**GETSEMANI A&B (GAB)** es una plataforma web corporativa orientada a la presentación, distribución y cotización de productos gastronómicos de alta gama, especializada en Aceites de Oliva Virgen Extra de autor y Vinos de Reserva.

El proyecto está desarrollado con **HTML5 semántico, CSS3 modular y JavaScript Vanilla ES6+**, con una arquitectura de archivos organizada de forma modular para separar el marcado, la capa de estilos, la lógica del cliente y las fuentes de datos. El resultado es un sitio limpio, ligero, totalmente responsivo y listo para desplegar en cualquier servidor de producción o en GitHub Pages.

---

## 🗂️ Estructura del proyecto

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
│   ├── carrito.js
│   └── noticias.json
└── assets/img/
    ├── favicon-GAB.jpg
    ├── carrusel/slide1.jpg … slide6.jpg
    ├── coleccion-aceite.jpg, coleccion-vinos.jpg, coleccion-gourmet.jpg
    ├── producto1.jpg, producto2.jpg, producto3.jpg
    ├── hero.jpg, banner-export.jpg, sostenibilidad.jpg
    └── galeria/aceite1.jpg, aceite2.jpg, vino1.jpg, vino2.jpg, empresa1.jpg…empresa4.jpg
```

### Estructura de imágenes

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

---

## ✨ Funcionalidades principales

- **Navegación multipágina** (inicio, galería, presupuesto, contacto) con menú y footer consistentes en las 4 páginas, incluyendo redes sociales, sedes y aviso legal.
- **Carrusel de imágenes** en la página de inicio.
- **Contadores animados** y sección de noticias cargada dinámicamente desde un archivo JSON.
- **Galería de productos** (aceite, vinos, instalaciones de empresa) con estilo por categorías.

### 🛒 Carrito de la galería

Cada foto de aceite o vino en `galeria.html` incluye un botón 🛒 en la esquina. Al pulsarlo:

- El producto se guarda en `localStorage`, por lo que el carrito persiste al cambiar de página.
- Aparece un icono flotante en la esquina inferior izquierda con el número de unidades y un panel desplegable con controles +/− por producto.
- En `presupuesto.html` se muestra el detalle completo del carrito, con **descuento automático por volumen**:
  - 2+ unidades → 5% de descuento
  - 4+ unidades → 10% de descuento
  - 6+ unidades → 15% de descuento
- El total general del presupuesto se calcula como: `(producto + extras − descuento por plazo) + (carrito de galería − descuento por volumen)`, mostrado con un desglose claro.
- Los precios por categoría se configuran en `js/carrito.js` (`PRECIOS_CATEGORIA`).
- Las fotos de la categoría "Empresa" no llevan botón de carrito, ya que corresponden a instalaciones y no a productos en venta.

### 📍 Mapa de contacto

La página de contacto integra un mapa interactivo que traza la ruta real por carretera entre la ubicación del cliente (geolocalización) y la sede seleccionada entre los tres centros operativos en Italia (Toscana, Sardeña y Genova), y los tres centros operativos Internacionales (Nueva York, Tokio, Seúl.) usando Leaflet Routing Machine sobre el servicio OSRM.

### 🌍 Sedes

- **Centros operativos (Italia):** Toscana, Sardeña, Genova.
- **Tiendas internacionales:** Nueva York, Tokio, Seúl.

### 📸 Tratamiento visual de imágenes

Algunas fotografías del carrusel y de las tarjetas de tiendas internacionales (Nueva York, Tokio) y del centro operativo de Toscana usan una clase CSS `.zoom-out` para ajustar el encuadre visual dentro de su marco, evitando que la imagen se vea excesivamente recortada.

---

## 🔧 Qué se corrigió

- Errores de sintaxis y código duplicado en `main.js`.
- JSON inválido en `noticias.json`.
- Rutas de `fetch()` que no coincidían con los archivos reales.
- Enlaces internos rotos entre páginas (nombres de archivo inconsistentes).
- Rutas absolutas sustituidas por rutas relativas, para que el sitio funcione igual en local y en GitHub Pages.
- `&` sin escapar en HTML (`A&amp;B`) para pasar la validación W3C.
- Enlaces de menú con anclas inválidas en galería y contacto.
- Footer incompleto, ahora unificado en las 4 páginas.
- Validación del teléfono ajustada a un máximo de 9 dígitos.
- Duplicados de páginas unificados en una sola versión por sección.

---

## 🚀 Despliegue

El proyecto usa exclusivamente rutas relativas (`css/style.css`, `../css/style.css` desde `views/`), por lo que funciona igual en local (Live Server / XAMPP), en un hosting real o al desplegar la carpeta directamente en GitHub Pages.

## ✅ Validación

El HTML de las 4 páginas está validado en https://validator.w3.org/ sin errores.

## 🔧 Correcciones realizadas

- Reescrito `main.js` (error de sintaxis y código duplicado que impedían su ejecución).
- Corregido `noticias.json` (JSON inválido).
- Unificados los nombres de archivos y enlaces entre páginas (`index.html`, `galeria.html`, `presupuesto.html`, `contacto.html`).
- Cambiadas las rutas absolutas por rutas relativas para que el sitio funcione en cualquier servidor.
- Corregido el carácter `&` sin escapar (`A&amp;B`) para validar en HTML.
- Arreglados enlaces de menú rotos en galería y contacto.
- Unificado el footer (redes sociales, sedes, contacto, aviso legal) en las 4 páginas.
- Ajustada la validación del teléfono a un máximo de 9 dígitos.
- Eliminados restos de texto y comentarios sueltos que no eran código válido.
- Añadido enrutamiento real por carretera en el mapa de contacto (Leaflet Routing Machine + OSRM).
- Añadidos atributos `width`/`height` a las imágenes y estilos movidos de inline a CSS para pasar la validación W3C.

## 📌 Posibles mejoras futuras

- Sustituir imágenes de baja resolución por versiones en mayor calidad.
- Añadir más idiomas al contenido (actualmente en español).
- Ampliar el catálogo con nuevas categorías de producto.
