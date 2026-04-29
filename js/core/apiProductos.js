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

    // 🔥 FILTRO GLOBAL CORRECTO (ACTIVO + STOCK + LIMPIEZA)
    const productosValidos = data.filter((p) => {
      const activo = (p.ACTIVO || "").toString().trim().toUpperCase();
      const stock = Number(p.STOCK) || 0;

      return activo === "SI" && stock > 0;
    });

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data: productosValidos,
      })
    );

    return productosValidos;
  } catch (error) {
    console.error("ERROR API:", error);
    throw error;
  }
}