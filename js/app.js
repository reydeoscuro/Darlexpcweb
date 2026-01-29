console.log("APP.JS CARGADO CON API");

const URL = "https://sheetdb.io/api/v1/1unfoggs799r3";

fetch(URL)
  .then(response => response.json())
  .then(productos => {
    console.log(productos); // verificación

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
      contenedor.innerHTML += `
        <div class="card">
          <h3>${p.NOMBRE}</h3>
          <p>Precio: $${p.PRECIO}</p>
          <p>Stock: ${p.STOCK}</p>
          <img src="${p["IMAGEN "]}" width="150">
        </div>
        <hr>
      `;
    });
  })
  .catch(error => {
    console.error("ERROR FETCH:", error);
  });
