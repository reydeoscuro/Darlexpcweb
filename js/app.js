console.log("APP.JS CARGADO CON API");

const URL = "Phttps://sheetdb.io/api/v1/1unfoggs799r3";

fetch(URL)
  .then(response => response.json())
  .then(productos => {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = ""; // limpia

    productos.forEach(p => {
      contenedor.innerHTML += `
        <div>
          <h3>${p.nombre}</h3>
          <p>Precio: $${p.precio}</p>
          <p>Stock: ${p.stock}</p>
        </div>
        <hr>
      `;
    });
  })
  .catch(error => {
    console.error("ERROR FETCH:", error);
  });
