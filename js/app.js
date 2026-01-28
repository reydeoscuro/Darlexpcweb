const productos = [
  {
    nombre: "Laptop Core i7 14th Gen",
    precio: "$1.250",
    categoria: "laptops"
  },
  {
    nombre: "Laptop Ryzen 7 5800H",
    precio: "$1.050",
    categoria: "laptops"
  },
  {
    nombre: "PC Gamer Ryzen 7 + RTX",
    precio: "$1.300",
    categoria: "pcs"
  },
  {
    nombre: "SSD NVMe 1TB",
    precio: "$95",
    categoria: "componentes"
  },
  {
    nombre: "Mouse Gamer RGB",
    precio: "$25",
    categoria: "accesorios"
  }
];

const contenedor = document.getElementById("productos");

function mostrar(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p class="precio">${p.precio}</p>
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

mostrar(productos.filter(p => p.categoria === "laptops"));
