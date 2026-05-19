import axios from "axios";

// ─── Instancias base ──────────────────────────────────────────────────────────

const catApi = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  timeout: 10_000,
});

// Interceptor global de errores (se puede ampliar con auth headers, logging, etc.)
catApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[catApi] Error:", error.message);
    return Promise.reject(error);
  }
);

// ─── Métodos de la Cat API ────────────────────────────────────────────────────

/**
 * Obtiene imágenes aleatorias de gatos.
 * @param {number} limit - Cantidad de imágenes a traer (default: 12)
 * @param {string} mimeTypes - Tipos de imagen separados por coma (default: "jpg,png")
 * @returns {Promise<Array>} Array de objetos con { id, url, width, height }
 */
export async function fetchCatImages(limit = 12, mimeTypes = "jpg,png") {
  const response = await catApi.get("/images/search", {
    params: { limit, mime_types: mimeTypes },
  });
  return response.data;
}
