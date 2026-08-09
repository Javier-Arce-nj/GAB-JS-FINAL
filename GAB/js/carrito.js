/* ==========================================
   GETSEMANI A&B (GAB)
   CARRITO.JS
   Lógica del carrito de compra de la galería.
   Se comparte entre galeria.html y presupuesto.html
   usando localStorage para que sobreviva el cambio de página.
========================================== */

const CARRITO_KEY = "gab_carrito";

/* ================================================================
              PRECIOS
       Aceite: precio original 25€, precio de oferta 15€ / botella
       Vino: precio estándar único para todos los vinos
==================================================================== */

const PRECIO_ORIGINAL_ACEITE = 25;
const PRECIO_OFERTA_ACEITE = 15;
const PRECIO_ESTANDAR_VINO = 22;

const PRECIOS_CATEGORIA = {
  aceite: PRECIO_OFERTA_ACEITE,
  vino: PRECIO_ESTANDAR_VINO
};

/* =========================================================
          PACKS / OFERTAS (solo aceite)
      Precio ya calculado con descuento extra por volumen
      sobre el precio de oferta (15€/botella).
============================================================ */

const PACKS_ACEITE = [
  { id: "pack-aceite-2", botellas: 2, precio: 28, ahorro: "7%" },
  { id: "pack-aceite-3", botellas: 3, precio: 40, ahorro: "11%" },
  { id: "pack-aceite-6", botellas: 6, precio: 75, ahorro: "17%" }
];

/* ==========================
     OPCIONES DE ENTREGA
 ========================== */

const OPCIONES_ENTREGA = [
  "Estándar (20-30 días)",
  "Rápida (10-15 días)",
  "Express (5-7 días)"
];

const ENTREGA_POR_DEFECTO = OPCIONES_ENTREGA[0];

/* ==========================
    LEER / GUARDAR
 ========================== */


function leerCarrito() {
  try {
    const datos = localStorage.getItem(CARRITO_KEY);
    return datos ? JSON.parse(datos) : [];
  } catch (e) {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarBadgeCarrito();
}

/* ==============================================================
      AÑADIR / QUITAR PRODUCTOS
     tipo: "unidad" (botella suelta) o "pack" (oferta agrupada)
================================================================= */

function añadirAlCarrito(id, nombre, categoria, precio, tipo) {
  precio = precio !== undefined ? precio : (PRECIOS_CATEGORIA[categoria] || 20);
  tipo = tipo || "unidad";

  const carrito = leerCarrito();
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      categoria,
      precio,
      tipo,
      cantidad: 1,
      entrega: ENTREGA_POR_DEFECTO
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

function quitarUnidad(id) {
  let carrito = leerCarrito();
  const item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) {
      carrito = carrito.filter(p => p.id !== id);
    }
  }

  guardarCarrito(carrito);
  return carrito;
}

function eliminarProducto(id) {
  const carrito = leerCarrito().filter(p => p.id !== id);
  guardarCarrito(carrito);
  return carrito;
}

function vaciarCarrito() {
  guardarCarrito([]);
}

/* ==========================
   CAMBIAR LA ENTREGA DE UN PRODUCTO
========================== */

function actualizarEntrega(id, entrega) {
  const carrito = leerCarrito();
  const item = carrito.find(p => p.id === id);

  if (item) {
    item.entrega = entrega;
  }

  guardarCarrito(carrito);
  return carrito;
}

/* ==========================
   CALCULOS
========================== */

function totalUnidadesCarrito() {
  return leerCarrito().reduce((acc, item) => acc + item.cantidad, 0);
}

function subtotalCarrito() {
  return leerCarrito().reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

/* Descuento por volumen de líneas elegidas en la galería */
function descuentoCarrito() {
  const unidades = totalUnidadesCarrito();
  if (unidades >= 6) return 15;
  if (unidades >= 4) return 10;
  if (unidades >= 2) return 5;
  return 0;
}

function totalCarritoConDescuento() {
  const subtotal = subtotalCarrito();
  const descuento = descuentoCarrito();
  return subtotal - (subtotal * descuento / 100);
}

/* ===============================================
     AYUDA PARA PINTAR EL SELECT DE ENTREGA
================================================== */

function opcionesEntregaHTML(entregaActual) {
  return OPCIONES_ENTREGA.map(op =>
    `<option value="${op}" ${op === entregaActual ? "selected" : ""}>${op}</option>`
  ).join("");
}

/* ==================================
   BADGE FLOTANTE (galeria.html)
  =================================== */

function actualizarBadgeCarrito() {
  const badge = document.getElementById("carrito-badge");
  const contador = document.getElementById("carrito-contador");
  const subtotalEl = document.getElementById("carrito-subtotal-mini");

  if (!badge) return;

  const unidades = totalUnidadesCarrito();

  contador.textContent = unidades;
  badge.style.display = unidades > 0 ? "flex" : "none";

  if (subtotalEl) {
    subtotalEl.textContent = subtotalCarrito().toFixed(2) + " €";
  }

  renderPanelCarrito();
}

/* ======================================
      PANEL DESPLEGABLE (galeria.html)
========================================= */

function renderPanelCarrito() {
  const panel = document.getElementById("carrito-panel-lista");
  if (!panel) return;

  const carrito = leerCarrito();

  if (carrito.length === 0) {
    panel.innerHTML = "<p class='carrito-vacio'>Aún no has añadido productos.</p>";
    return;
  }

  panel.innerHTML = carrito.map(item => `
    <div class="carrito-item">
      <div class="carrito-item-fila">
        <span class="carrito-item-nombre">${item.nombre}</span>
        <span class="carrito-item-precio">${(item.precio * item.cantidad).toFixed(2)} €</span>
      </div>
      <div class="carrito-item-controles">
        <button type="button" onclick="quitarUnidad('${item.id}'); event.stopPropagation();">−</button>
        <span>${item.cantidad}</span>
        <button type="button" onclick="añadirAlCarrito('${item.id}','${item.nombre}','${item.categoria}',${item.precio},'${item.tipo}'); event.stopPropagation();">+</button>
      </div>
      <label class="carrito-item-entrega">
        Entrega:
        <select onchange="actualizarEntrega('${item.id}', this.value); event.stopPropagation();" onclick="event.stopPropagation();">
          ${opcionesEntregaHTML(item.entrega)}
        </select>
      </label>
    </div>
  `).join("");
}

function toggleCarritoPanel() {
  const panel = document.getElementById("carrito-panel");
  if (panel) {
    panel.classList.toggle("show");
  }
}

/* ====================================
    INICIALIZAR AL CARGAR LA PAGINA
 ====================================== */

document.addEventListener("DOMContentLoaded", () => {
  actualizarBadgeCarrito();
});
