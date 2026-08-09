/* ==========================================
      GETSEMANI A&B (GAB)
        GALERIA.JS
========================================== */

/* ==========================
       FILTROS
========================== */

function filtrar(categoria) {
  const fotos = document.querySelectorAll(".foto");
  const botones = document.querySelectorAll(".filtros .btn");

  botones.forEach(btn => {
    btn.classList.toggle("activo", btn.dataset.categoria === categoria);
  });

  fotos.forEach(foto => {
    if (categoria === "all" || foto.classList.contains(categoria)) {
      foto.style.display = "block";
    } else {
      foto.style.display = "none";
    }
  });
}

/* =====================================================
           PRECIO + BOTON "SELECCIONAR"
        Solo en fotos de categoría aceite/vino
       (las de "empresa" no son productos en venta)
 ======================================================= */

function inicializarPrecios() {
  const fotosComprables = document.querySelectorAll(".foto.aceite, .foto.vino");

  fotosComprables.forEach((foto, index) => {
    if (foto.querySelector(".precio-box")) return; // evita duplicar

    const categoria = foto.classList.contains("aceite") ? "aceite" : "vino";
    const nombre = foto.querySelector("h3")?.textContent.trim() || "Producto GAB";
    const id = categoria + "-" + index + "-" + nombre.replace(/\s+/g, "_");

    const precioBox = document.createElement("div");
    precioBox.className = "precio-box";

    if (categoria === "aceite") {
      precioBox.innerHTML = `
        <span class="precio-original">${PRECIO_ORIGINAL_ACEITE.toFixed(2)} €</span>
        <span class="precio-oferta">${PRECIO_OFERTA_ACEITE.toFixed(2)} €</span>
        <span class="badge-oferta">OFERTA</span>
      `;
    } else {
      precioBox.innerHTML = `<span class="precio-estandar">${PRECIO_ESTANDAR_VINO.toFixed(2)} €</span>`;
    }

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-seleccionar";
    boton.textContent = "Seleccionar";

    const precio = categoria === "aceite" ? PRECIO_OFERTA_ACEITE : PRECIO_ESTANDAR_VINO;

    boton.addEventListener("click", (e) => {
      e.stopPropagation();
      añadirAlCarrito(id, nombre, categoria, precio, "unidad");
      boton.textContent = "✓ Añadido";
      boton.classList.add("added");
      setTimeout(() => {
        boton.textContent = "Seleccionar";
        boton.classList.remove("added");
      }, 900);
    });

    precioBox.appendChild(boton);
    foto.appendChild(precioBox);
  });
}

inicializarPrecios();

/* =========================================================
      PACKS DE OFERTA (tarjetas fijas de Ofertas en Pack)
============================================================ */

function inicializarPacksOferta() {
  const botones = document.querySelectorAll(".btn-pack-add");

  botones.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const { id, nombre, categoria, precio } = btn.dataset;

      añadirAlCarrito(id, nombre, categoria, parseFloat(precio), "pack");

      const textoOriginal = btn.textContent;
      btn.textContent = "✓ Añadido";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = textoOriginal;
        btn.classList.remove("added");
      }, 900);
    });
  });
}

inicializarPacksOferta();

/* ==========================
       LIGHTBOX
 ========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function inicializarLightbox() {
  const imagenes = document.querySelectorAll(".foto img");

  imagenes.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });
}

inicializarLightbox();

if (lightbox) {
  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

/* ================================
      EFECTO APARICION AL SCROLL
 ================================== */

const galeriaItems = document.querySelectorAll(".foto");

const observerGaleria = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0px)";
      }
    });
  },
  { threshold: 0.2 }
);

galeriaItems.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(40px)";
  item.style.transition = "all .8s ease";
  observerGaleria.observe(item);
});