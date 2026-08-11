/* ===============================
    GETSEMANI A&B – CONTACTO.JS
=============================== */

let map;
let rutaActiva = null;

// Objeto de destinos incluyendo las sedes de Italia e internacionales
const destinos = {
  "toscana": { lat: 43.771, lng: 11.255 },
  "genova": { lat: 44.411, lng: 8.932 },
  "cagliari": { lat: 39.223, lng: 9.121 },
  "Nueva York": { lat: 40.7233, lng: -74.0030 },
  "Tokio": { lat: 35.6721, lng: 139.7639 },
  "Seul": { lat: 37.4979, lng: 127.0276 }
};

window.addEventListener("DOMContentLoaded", () => {

  const mapaDiv = document.getElementById("map");
  const selectDestino = document.getElementById("sedeSelect");
  const btnRuta = document.getElementById("btnUbicacion");
  const mensajeMapa = document.getElementById("mensajeMapa");

  /* =============================
          Inicializar mapa
   =============================== */

  map = L.map(mapaDiv).setView([44.411, 8.932], 4); // Zoom ajustado a 4 para abarcar una vista global

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  /* =============================
          Marcadores
   =============================== */

  // Añade marcadores para todas las sedes (Italia + Internacionales)
  Object.keys(destinos).forEach(key => {
    const d = destinos[key];
    L.marker([d.lat, d.lng]).addTo(map);
  });

  /* ============================
          Cambio de sede
   ============================== */

  selectDestino.addEventListener("change", () => {
    const valor = selectDestino.value;
    if (!valor || !destinos[valor]) return;

    const dest = destinos[valor];
    map.setView([dest.lat, dest.lng], 12); // Reencuadra hacia la sede seleccionada

    mensajeMapa.textContent = "Destino seleccionado. Puedes calcular la ruta desde tu ubicación.";
    mensajeMapa.className = "mensaje-mapa ok";
  });

  /* ===================================
        Botón calcular ruta
   ====================================*/ 
  btnRuta.addEventListener("click", () => {
    const valor = selectDestino.value;

    if (!valor || !destinos[valor]) {
      mensajeMapa.textContent = "Selecciona primero una destinación.";
      mensajeMapa.className = "mensaje-mapa error";
      return;
    }

    const destino = destinos[valor];

    mensajeMapa.textContent = "Solicitando permiso de ubicación…";
    mensajeMapa.className = "mensaje-mapa ok";

    navigator.geolocation.getCurrentPosition(
      pos => {
        mensajeMapa.textContent = "Permiso concedido. Calculando recorrido…";
        mensajeMapa.className = "mensaje-mapa ok";

        const origen = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        calcularRuta(origen, destino, mensajeMapa);
      },
      err => {
        mensajeMapa.textContent = "Has bloqueado la ubicación. No puedo calcular el recorrido.";
        mensajeMapa.className = "mensaje-mapa error";
      }
    );
  });
});

/* ============================
          Ruta real
=============================== */

function calcularRuta(origen, destino, mensajeMapa) {

  if (rutaActiva) rutaActiva.remove();

  rutaActiva = L.Routing.control({
    waypoints: [
      L.latLng(origen.lat, origen.lng),
      L.latLng(destino.lat, destino.lng)
    ],
    lineOptions: {
      styles: [{ color: "#c9a068", weight: 5 }]
    },
    router: L.Routing.osrmv1({
      serviceUrl: "https://router.project-osrm.org/route/v1/"
    }),
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true
  }).addTo(map);

  mensajeMapa.textContent = "Ruta calculada correctamente.";
  mensajeMapa.className = "mensaje-mapa ok";
}
