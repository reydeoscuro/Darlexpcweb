console.log("APP.JS CARGADO CON API");

const URL = "https://sheetdb.io/api/v1/1unfoggs799r3";

fetch(URL)
  .then(response => response.json())
  .then(productos => {
    console.log(productos); // verificación

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos
  .filter(p => p.ACTIVO && p.ACTIVO.trim().toUpperCase() === "SI")
  .forEach(p => {
      console.log("SN:", p.SN, "NOMBRE:", p.NOMBRE);
      contenedor.innerHTML += `
        <div class="card producto-card" data-cat="${p.CATEGORIA}">
  <h3 class="titulo">${p.NOMBRE}</h3>

  <a href="producto.html?id=${p.SN}">
    <div class="img-box">
      <img src="${p["IMAGEN "]}" alt="${p.NOMBRE}">
    </div>
  </a>

  <p class="precio">$${p.PRECIO}</p>
  <p class="stock">Stock: ${p.STOCK}</p>
</div>
</a>
        </div>
        <hr>
      `;
    });
  })
  .catch(error => {
    console.error("ERROR FETCH:", error);
  });
