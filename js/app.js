const contenedor = document.getElementById("productos");
let productos = [];

// Cargar productos
fetch("/Darlexpcweb/products.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrar(productos);
  });

// Mostrar productos
function mostrar(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <a href="https://wa.me/593XXXXXXXXX?text=Hola,%20estoy%20interesado%20en%20${encodeURIComponent(p.nombre)}" target="_blank">
          Consultar por WhatsApp
        </a>
      </div>
    `;
  });
}

// 🔹 FUNCIÓN QUE USAN LOS BOTONES
function filtrar(cat) {
  mostrar(productos.filter(p => p.categoria === cat));
}

// 👉 EXPONERLA AL HTML
window.filtrar = filtrar;
