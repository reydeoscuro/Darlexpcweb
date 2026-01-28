fetch("/Darlexpcweb/products.json")
  .then(res => res.json())
  .then(data => mostrarProductos(data))
  .catch(err => console.error("Error cargando productos:", err));

function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <a href="https://wa.me/593XXXXXXXXX" target="_blank">
          Consultar por WhatsApp
        </a>
      </div>
    `;
  });
}
