// services/BulkOrderService.js
const API_URL = "http://4.247.150.176:8083/v1/order/request/data";

/**
 * @param {FormData} formData - must contain: cardFile?, userFile? and request (Blob "application/json")
 * @returns {Promise<{ok:boolean, status:number, data?:any, error?:string}>}
 */
export async function sendBulkOrder(formData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
      // DO NOT set Content-Type; browser will set multipart/form-data boundary automatically
    });

    const contentType = res.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await res.json().catch(() => ({}))
      : await res.text();

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error:
          (payload && payload.message) ||
          (typeof payload === "string" ? payload : "Request failed"),
        data: payload,
      };
    }

    return { ok: true, status: res.status, data: payload };
  } catch (err) {
    return { ok: false, status: 0, error: err?.message || "Network error" };
  }
}
