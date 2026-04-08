const URL = "https://darlex-api.david-villegas6991.workers.dev/";
const CACHE_KEY = "cache_productos";
const CACHE_TIME = 5 * 60 * 1000;

export async function obtenerProductos() {
  try {
    const cache = localStorage.getItem(CACHE_KEY);

    if (cache) {
      const parsed = JSON.parse(cache);

      if (Date.now() - parsed.timestamp < CACHE_TIME) {
        return parsed.data;
      }
    }

    const response = await fetch(URL);
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("API no válida");
    }

    const productosActivos = data.filter(
      (p) => p.ACTIVO && p.ACTIVO.trim().toUpperCase() === "SI"
    );

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: productosActivos,
      })
    );

    return productosActivos;
  } catch (error) {
    console.error("ERROR API:", error);
    throw error;
  }
}