const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfNt_q8m0bPyE8nKpt45_FYMMafduFw5jyjeYJBFdgoIpHSP72KDFaL1naDAoYuHZ5UNN2xkeOJSzR/pub?gid=687270074&single=true&output=csv";
const contenedor = document.getElementById("productos");
let productos = [];

fetch(CSV_URL)
  console.log(filas);
  .then(res => res.text())
  .then(text => {
    const filas = text.split("\n").map(f => f.split(";"));
    const encabezados = filas[0];

    filas.slice(1).forEach(fila => {
      const producto = {
        nombre: fila[0],
        precio: fila[1],
        categoria: fila[2],
        stock: parseInt(fila[3]),
        activo: fila[4]
      };

      if (producto.activo === "SI" && producto.stock > 0) {
        productos.push(producto);
      }
    });

    // Mostrar laptops por defecto
    mostrar(productos.filter(p => p.categoria === "laptops"));
  });

function mostrar(lista) {
  contenedor.innerHTML = "";
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
