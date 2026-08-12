/* ==========================================
      GETSEMANI A&B (GAB)
      PRESUPUESTO.JS
========================================== */

const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll(".extra");
const total = document.getElementById("total");
const totalFormularioEl = document.getElementById("totalFormulario");
const totalCarritoEl = document.getElementById("totalCarritoResumen");
const formulario = document.getElementById("formulario");

/* ==============================================================
        CALCULAR PRESUPUESTO
      (se ejecuta con cada cambio, sin botones)
      Total = (producto + extras) con descuento por plazo
         + carrito de la galería con descuento por volumen
================================================================= */

function calcularPresupuesto() {
  const precioBase = parseFloat(producto.value);

  let extrasTotal = 0;
  extras.forEach(extra => {
    if (extra.checked) {
      extrasTotal += parseFloat(extra.value);
    }
  });

  const subtotalFormulario = precioBase + extrasTotal;

  /* DESCUENTO SEGUN PLAZO DE ENTREGA (en días) */

  const dias = parseInt(plazo.value, 10) || 0;
  let descuentoPlazo = 0;

  if (dias >= 90) {
    descuentoPlazo = 20;
  } else if (dias >= 60) {
    descuentoPlazo = 10;
  } else if (dias >= 30) {
    descuentoPlazo = 5;
  }

  const totalFormulario = subtotalFormulario - (subtotalFormulario * descuentoPlazo / 100);

  /* ==========================================================
           TOTAL DEL CARRITO DE LA GALERIA (js/carrito.js) 
   ============================================================ */

  const totalCarrito = typeof totalCarritoConDescuento === "function"
    ? totalCarritoConDescuento()
    : 0;

  const totalGeneral = totalFormulario + totalCarrito;

  if (totalFormularioEl) {
    totalFormularioEl.textContent = totalFormulario.toFixed(2) + " €";
  }

  if (totalCarritoEl) {
    totalCarritoEl.textContent = totalCarrito.toFixed(2) + " €";
  }

  total.value = totalGeneral.toFixed(2) + " €";
}

producto.addEventListener("change", calcularPresupuesto);
plazo.addEventListener("input", calcularPresupuesto);
extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

/* ========================================
      RENDER DEL CARRITO EN ESTA PAGINA
 ========================================== */

function renderCarritoEnPresupuesto() {
  const contenedor = document.getElementById("carrito-resumen-lista");
  if (!contenedor) return;

  const carrito = leerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='carrito-vacio'>No has añadido productos desde la galería.</p>";
  } else {
    contenedor.innerHTML = carrito.map(item => `
      <div class="carrito-item">
        <div class="carrito-item-fila">
          <span class="carrito-item-nombre">${item.nombre} (x${item.cantidad})</span>
          <span class="carrito-item-precio">${(item.precio * item.cantidad).toFixed(2)} €</span>
          <button type="button" class="btn-quitar" onclick="eliminarProducto('${item.id}'); renderCarritoEnPresupuesto(); calcularPresupuesto();">✕</button>
        </div>
        <label class="carrito-item-entrega">
          Entrega:
          <select onchange="actualizarEntrega('${item.id}', this.value); renderCarritoEnPresupuesto();">
            ${opcionesEntregaHTML(item.entrega)}
          </select>
        </label>
      </div>
    `).join("");
  }

  const descuentoEl = document.getElementById("carrito-descuento-info");
  if (descuentoEl) {
    const descuento = descuentoCarrito();
    descuentoEl.textContent = descuento > 0
      ? `Descuento por volumen aplicado: ${descuento}%`
      : "Añade 2 o más productos en la Galería para conseguir descuento.";
  }

  calcularPresupuesto();
}

const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
if (btnVaciarCarrito) {
  btnVaciarCarrito.addEventListener("click", () => {
    vaciarCarrito();
    renderCarritoEnPresupuesto();
  });
}

renderCarritoEnPresupuesto();
calcularPresupuesto();

/* ==================================
       VALIDACIONES DE CONTACTO
 ==================================== */

function validarNombre() {
  const nombre = document.getElementById("nombre").value;
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/;
  const valido = regex.test(nombre);

  document.getElementById("errorNombre").textContent = valido
    ? ""
    : "Solo letras, máximo 15 caracteres";

  return valido;
}

function validarApellidos() {
  const apellidos = document.getElementById("apellidos").value;
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/;
  const valido = regex.test(apellidos);

  document.getElementById("errorApellidos").textContent = valido
    ? ""
    : "Solo letras, máximo 40 caracteres";

  return valido;
}

function validarTelefono() {
  const telefono = document.getElementById("telefono").value;
  const regex = /^[0-9]{1,9}$/;
  const valido = regex.test(telefono);

  document.getElementById("errorTelefono").textContent = valido
    ? ""
    : "Solo números, máximo 9 dígitos";

  return valido;
}

function validarEmail() {
  const email = document.getElementById("email").value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valido = regex.test(email);

  document.getElementById("errorEmail").textContent = valido
    ? ""
    : "Introduce un email válido";

  return valido;
}

document.getElementById("nombre").addEventListener("input", validarNombre);
document.getElementById("apellidos").addEventListener("input", validarApellidos);
document.getElementById("telefono").addEventListener("input", validarTelefono);
document.getElementById("email").addEventListener("input", validarEmail);

/* ==========================
    ENVIO DEL FORMULARIO
============================= */

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const condiciones = document.getElementById("condiciones");

  const datosValidos =
    validarNombre() &&
    validarApellidos() &&
    validarTelefono() &&
    validarEmail();

  if (!datosValidos) {
    alert("Revisa los datos del formulario antes de continuar.");
    return;
  }

  if (!condiciones.checked) {
    alert("Debes aceptar la Política de Privacidad para enviar el presupuesto.");
    return;
  }

  alert("¡Presupuesto enviado correctamente! Nos pondremos en contacto contigo.");
  formulario.reset();
  vaciarCarrito();
  renderCarritoEnPresupuesto();
  calcularPresupuesto();
});
