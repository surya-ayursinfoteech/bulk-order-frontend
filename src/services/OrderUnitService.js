// services/OrderUnitService.js
const BASE_URL = "http://4.247.150.176:8083";

function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    search.append(k, v);
  });
  return search.toString();
}

/**
 * Fetch order units with optional filters.
 * NOTE: Some backends ignore size/page and always return size=100, totalPages=1.
 * We'll return enough metadata so the UI can fall back to client-side pagination.
 */
export async function fetchOrders({
  status,
  startDate,
  endDate,
  orderId,
  page = 0,
  size = 10,
}) {
  const queryObj = {
    ...(status ? { status } : {}),
    startDate,
    endDate,
    ...(orderId ? { orderId } : {}),
    page,
    size,
  };

  const qs = buildQuery(queryObj);
  const url = `${BASE_URL}/orders?${qs}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch orders (${res.status}): ${text || res.statusText}`);
  }
  const data = await res.json();

  // Normalize fields
  const content = Array.isArray(data?.content) ? data.content : [];
  const apiTotalElements = Number.isFinite(data?.totalElements)
    ? data.totalElements
    : content.length;
  const apiTotalPages = Number.isFinite(data?.totalPages)
    ? data.totalPages
    : Math.max(1, Math.ceil(apiTotalElements / size));
  const apiNumber = Number.isFinite(data?.number) ? data.number : page;
  const apiSize = Number.isFinite(data?.size) ? data.size : size;

  // Heuristic: if API says totalPages=1 but returns > requested size, or apiSize !== requested size,
  // assume server-side paging is not supported -> client-side paging.
  const respectsRequestedSize = apiSize === size;
  const looksSinglePage = apiTotalPages <= 1;
  const needsClientPaging =
    !respectsRequestedSize || (looksSinglePage && content.length > size);

  return {
    content,
    totalElements: apiTotalElements,
    totalPages: apiTotalPages,
    number: apiNumber,
    apiSize, // size reported by server
    requestedSize: size,
    needsClientPaging,
  };
}
