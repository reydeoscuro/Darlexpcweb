const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfNt_q8m0bPyE8nKpt45_FYMMafduFw5jyjeYJBFdgoIpHSP72KDFaL1naDAoYuHZ5UNN2xkeOJSzR/pub?gid=687270074&single=true&output=csv";
const contenedor = document.getElementById("productos");

fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    contenedor.innerHTML = "<pre>" + text + "</pre>";
  })
  .catch(err => {
    contenedor.innerHTML = "ERROR DE CONEXIÓN";
    console.error(err);
  });

}

}
