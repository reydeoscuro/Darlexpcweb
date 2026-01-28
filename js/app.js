const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfNt_q8m0bPyE8nKpt45_FYMMafduFw5jyjeYJBFdgoIpHSP72KDFaL1naDAoYuHZ5UNN2xkeOJSzR/pub?gid=687270074&single=true&output=csv";
const contenedor = document.getElementById("productos");
let productos = [];

fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    const filas = text.trim().split("\n").map(f => f.split(";"));

    filas.slice(1).forEach(fila => {
      const nombre = fila[0]?.trim();
      const precio = fila[1]?.trim();
      const categoria = fila[2]?.trim().toLowerCase();
      const stock = parseInt(fila[3]) || 0;
      const activo = fila[4]?.trim().toUpperCase();

      // Mostrar SOLO si cumple lógica mínima
      if (nombre && precio && categoria && activo !== "NO" && stock > 0) {
        productos.push({ nombre, precio, categoria, stock });
      }
    });

    mostrar(productos);
  })
  .catch(err => {
    contenedor.innerHTML = "❌ Error cargando productos";
    console.error(err);
  });

function mostrar(lista) {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles</p>";
    return;
  }

  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p class="precio">$${p.precio}</p>
        <a href="https://wa.me/593XXXXXXXXX?text=Hola,%20estoy%20interesado%20en%20${encodeURIComponent(p.nombre)}" target="_blank">
          Comprar por WhatsApp
        </a>
      </div>
    `;
  });
}

function filtrar(cat) {
  mostrar(productos.filter(p => p.categoria === cat));
}

}
