const esIbarra = window.location.pathname.startsWith("/ibarra");

export const CONFIG = {
  sucursal: esIbarra ? "ibarra" : "matriz",

  api: esIbarra
    ? "https://darlex-api-ibarra.david-villegas6991.workers.dev/"
    : "https://darlex-api.david-villegas6991.workers.dev/",

  cacheKey: esIbarra
    ? "cache_productos_ibarra"
    : "cache_productos_matriz",
};

export default CONFIG;