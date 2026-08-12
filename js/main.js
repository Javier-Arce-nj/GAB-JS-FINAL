/* ==============================================
      GETSEMANI A&B (GAB)
       MAIN.JS
    Lógica compartida por todas las páginas
================================================= */

/* ==========================
      MENU HAMBURGUESA
========================== */

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

/* ==================================
   CARRUSEL AUTOMATICO (solo home)
===================================== */

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function mostrarSlide() {
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  slides[currentSlide].classList.add("active");

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
}

if (slides.length > 0) {
  mostrarSlide();
  setInterval(mostrarSlide, 4000);
}

/* ===========================================================
      CONTADORES ANIMADOS (solo home)
      Se activan solo cuando la sección entra en pantalla,
     y solo una vez (no se repiten al volver a hacer scroll).
 ============================================================= */

function animarContador(elemento, objetivo) {
  let valor = 0;
  const duracionPasos = 100;
  const incremento = objetivo / duracionPasos;

  const intervalo = setInterval(() => {
    valor += incremento;

    if (valor >= objetivo) {
      elemento.textContent = objetivo.toLocaleString("es-ES");
      clearInterval(intervalo);
    } else {
      elemento.textContent = Math.floor(valor).toLocaleString("es-ES");
    }
  }, 20);
}

const seccionContadores = document.querySelector(".contadores");

if (seccionContadores) {
  const cajasContador = seccionContadores.querySelectorAll(".contador-box h3[data-target]");

  const observerContadores = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const objetivo = parseInt(entry.target.dataset.target, 10) || 0;
          animarContador(entry.target, objetivo);
          observer.unobserve(entry.target); // se anima una sola vez
        }
      });
    },
    { threshold: 0.4 }
  );

  cajasContador.forEach(caja => observerContadores.observe(caja));
}

/* =================================================
       CARGA DE NOTICIAS DESDE JSON (solo home)
==================================================== */

const noticias = document.getElementById("noticias");

if (noticias) {
  fetch("js/noticias.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error cargando noticias");
      }
      return response.json();
    })
    .then(data => {
      let contenido = "";

      data.forEach(item => {
        contenido += `
          <article>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <p><strong>${item.fecha}</strong></p>
          </article>
        `;
      });

      noticias.innerHTML = contenido;
    })
    .catch(error => {
      console.log(error);
      noticias.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
    });
}

/* =================================
      ANIMACIONES AL HACER SCROLL
 =================================== */

const elementosAnimados = document.querySelectorAll(
  ".card, .testimonial, .contador-box"
);

const observador = new IntersectionObserver(
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

elementosAnimados.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all .8s ease";
  observador.observe(el);
});

/* ==========================
    BOTON VOLVER ARRIBA
============================= */

const botonTop = document.createElement("button");
botonTop.innerHTML = "↑";
botonTop.id = "btnTop";
document.body.appendChild(botonTop);

window.addEventListener("scroll", () => {
  botonTop.style.display = window.scrollY > 500 ? "block" : "none";
});

botonTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =====================================
      EFECTO NAVBAR AL HACER SCROLL
 ======================================= */

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ===================================
       PRELOAD / ESTADO CARGADO
 ===================================== */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
