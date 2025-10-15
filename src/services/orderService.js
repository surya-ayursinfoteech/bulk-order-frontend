// src/services/orderService.js

const BASE = "http://4.247.150.176:8083";

/**
 * Fetch order requests (list) with date range + status ["ALL"] only.
 * API sample (curl):
 * GET /v1/order/request/data?page=0&size=10
 * body:
 * {
 *   "start_date":"2025-09-01",
 *   "end_date":"2025-10-30",
 *   "status":["ALL"]
 * }
 *
 * NOTE: Many servers don't accept bodies with GET; we'll POST to the same path
 * with page/size in the query string, which works with this backend.
 */
export async function fetchOrderRequests({ page = 0, size = 10, startDate, endDate }) {
  const url = `${BASE}/v1/order/request/get-data?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`;

  const body = {
    start_date: startDate, // "YYYY-MM-DD"
    end_date: endDate,     // "YYYY-MM-DD"
    status: ["ALL"],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Failed to fetch order requests (${res.status}): ${t || res.statusText}`);
  }
  const data = await res.json();
  // API returns a simple array (not paged envelope). We page client-side by size.
  if (!Array.isArray(data)) return { content: [], total: 0 };

  return {
    content: data,
    total: data.length,
  };
}

/**
 * Fetch Card Details by order_request_id
 * GET /v1/order/request/card/data/:orderRequestId
 */
export async function fetchCardDetails(orderRequestId) {
  const url = `${BASE}/v1/order/request/card/data/${encodeURIComponent(orderRequestId)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Failed to fetch card details (${res.status}): ${t || res.statusText}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch User Details by order_request_id
 * GET /v1/order/request/user/data/:orderRequestId
 */
export async function fetchUserDetails(orderRequestId) {
  const url = `${BASE}/v1/order/request/user/data/${encodeURIComponent(orderRequestId)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Failed to fetch user details (${res.status}): ${t || res.statusText}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
