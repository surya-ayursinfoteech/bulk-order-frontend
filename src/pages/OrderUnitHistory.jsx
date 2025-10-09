// src/pages/OrderUnitHistory.jsx
import { useEffect, useMemo, useState } from "react";
import {
  Download,
  RefreshCw,
  ChevronDown,
  History,
  Search,
  Filter,
  Loader2,
} from "lucide-react";
import { fetchOrders } from "../services/OrderUnitService";

/* ---------- small utils ---------- */
const pad = (n) => String(n).padStart(2, "0");
const fmtDateInput = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const startOfDayISO = (d) => `${fmtDateInput(d)}T00:00:00`;
const endOfDayISO = (d) => `${fmtDateInput(d)}T23:59:59`;

const prettyDateTime = (iso) => {
  if (!iso) return "—";
  const dt = new Date(iso);
  if (isNaN(dt.getTime())) return iso;
  const MMM = dt.toLocaleString(undefined, { month: "short" });
  return `${MMM} ${pad(dt.getDate())}, ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
};

export default function OrderUnitHistory() {
  /* ---------- filters ---------- */
  const [datePreset, setDatePreset] = useState("7d"); // "7d" | "30d" | "custom"
  const [startDate, setStartDate] = useState(""); // yyyy-mm-dd
  const [endDate, setEndDate] = useState("");     // yyyy-mm-dd
  const [status, setStatus] = useState("all");    // "all" | "Pending" | "Approved"
  const [orderId, setOrderId] = useState("");     // only orderId

  /* ---------- rows per load (size) ---------- */
  const DEFAULT_SIZE = 10;
  const [sizeMode, setSizeMode] = useState("10"); // "10" | "50" | "100" | "custom"
  const [customSize, setCustomSize] = useState("25"); // text input
  const effectiveSize = useMemo(() => {
    if (sizeMode === "10") return 10;
    if (sizeMode === "50") return 50;
    if (sizeMode === "100") return 100;
    const n = Number(customSize);
    return Number.isFinite(n) && n > 0 ? Math.min(1000, Math.max(1, n)) : DEFAULT_SIZE;
  }, [sizeMode, customSize]);

  /* ---------- data state ---------- */
  const [rowsRaw, setRowsRaw] = useState([]); // raw from API
  const [totalElements, setTotalElements] = useState(0);
  const [needsClientPaging, setNeedsClientPaging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  /* force-refetch trigger (Update button) */
  const [refreshTick, setRefreshTick] = useState(0);

  /* ---------- initialize default last 7 days ---------- */
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6); // inclusive 7-day window
    setStartDate(fmtDateInput(start));
    setEndDate(fmtDateInput(end));
    setDatePreset("7d");
  }, []);

  /* ---------- preset -> lock / set dates ---------- */
  useEffect(() => {
    if (datePreset === "custom") return; // manual control
    const end = new Date();
    const start = new Date();
    if (datePreset === "7d") start.setDate(end.getDate() - 6);
    if (datePreset === "30d") start.setDate(end.getDate() - 29);
    setStartDate(fmtDateInput(start));
    setEndDate(fmtDateInput(end));
  }, [datePreset]);

  /* ---------- derive API params ---------- */
  const apiParams = useMemo(() => {
    if (!startDate || !endDate) return { startDateISO: undefined, endDateISO: undefined };
    try {
      const s = new Date(startDate);
      const e = new Date(endDate);
      return {
        startDateISO: startOfDayISO(s),
        endDateISO: endOfDayISO(e),
      };
    } catch {
      return { startDateISO: undefined, endDateISO: undefined };
    }
  }, [startDate, endDate]);

  /* ---------- fetch orders ---------- */
  useEffect(() => {
    if (!apiParams.startDateISO || !apiParams.endDateISO) return;

    let active = true;
    setLoading(true);
    setErr("");

    (async () => {
      try {
        const res = await fetchOrders({
          status: status === "all" ? undefined : status,
          startDate: apiParams.startDateISO,
          endDate: apiParams.endDateISO,
          orderId: orderId?.trim() || undefined,
          page: 0,
          size: effectiveSize, // ask backend for chosen size
        });

        if (!active) return;

        const mapped = (res.content || []).map((it, idx) => ({
          id: it.id || `U-${idx + 1}`,
          orderDate: prettyDateTime(it.orderDate),
          platformEmail: it.platformEmail ?? "—",
          status: it.status ?? "—",
          product: it.product ?? "—",
          orderId: String(it.orderId ?? "—"),
          bobOrder: !!it.bobOrder, // API gives 0/1; cast to boolean
          unitAmount: it.unitAmount ?? "—",
          actualDeliveryDate: it.actualDeliveryDate ?? "",
          deliveryOtp: it.deliveryOtp ?? "—",
          trackingId: it.trackingId ?? "—",
          businessGst: it.businessGstNo ?? "—",
          billingPhone: it.billingPhone ?? "—",
        }));

        setRowsRaw(mapped);
        setTotalElements(res.totalElements);
        setNeedsClientPaging(res.needsClientPaging);
      } catch (e) {
        setErr(e.message || "Failed to fetch.");
        setRowsRaw([]);
        setTotalElements(0);
        setNeedsClientPaging(false);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [status, orderId, effectiveSize, apiParams, refreshTick]);

  /* ---------- rows to display ---------- */
  const displayRows = useMemo(() => {
    if (needsClientPaging) {
      return rowsRaw.slice(0, effectiveSize);
    }
    return rowsRaw;
  }, [rowsRaw, needsClientPaging, effectiveSize]);

  /* ---------- export CSV ---------- */
  const handleDownloadCSV = () => {
    const headers = [
      "Order Date",
      "Platform Email",
      "Status",
      "Product",
      "Order ID",
      "BoB Order",
      "Unit Amount",
      "Actual Delivery Date",
      "Delivery OTP",
      "Tracking ID",
      "Business GST",
      "Billing Phone",
    ];
    const csvRows = displayRows.map((r) => [
      r.orderDate,
      r.platformEmail,
      r.status,
      r.product,
      r.orderId,
      r.bobOrder ? "Yes" : "No",
      r.unitAmount,
      r.actualDeliveryDate || "—",
      r.deliveryOtp,
      r.trackingId,
      r.businessGst,
      r.billingPhone,
    ]);
    const csv = [headers, ...csvRows]
      .map((arr) =>
        arr
          .map((v) => {
            const s = String(v ?? "");
            return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "order-units-history.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const dateInputsDisabled = datePreset !== "custom";

  return (
    <div className="w-full px-4 md:px-6 py-8">
      <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-2 border-gray-200">
        {/* Header */}
        <div className="px-6 py-5 border-b-2 border-gray-200 bg-white rounded-t-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-md">
                <History className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  Order Units History
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {loading ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
                    </span>
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-semibold">{displayRows.length}</span> of{" "}
                      <span className="font-semibold">{totalElements}</span> order units
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setRefreshTick((t) => t + 1)}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm group"
                title="Reload with current filters"
              >
                <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline">Update</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white px-3 py-2 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-5 border-b-2 border-gray-200">
          <div className="space-y-4">
            {/* Row - Date Preset & Inputs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-shrink-0">
                <label className="block text-xs font-bold text-gray-900 mb-2">Order Date</label>
                <div className="inline-flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDatePreset("7d")}
                    className={`rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      datePreset === "7d"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    Last 7 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setDatePreset("30d")}
                    className={`rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      datePreset === "30d"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    Last 30 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setDatePreset("custom")}
                    className={`inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      datePreset === "custom"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    Custom
                    <ChevronDown className="h-4 w-4 text-current" />
                  </button>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    disabled={datePreset !== "custom"}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full rounded-lg border-2 px-3 py-2.5 text-sm font-medium focus:ring-4 transition-all duration-200 ${
                      datePreset !== "custom"
                        ? "bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-200 focus:border-gray-900 focus:ring-gray-900/10"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    disabled={datePreset !== "custom"}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full rounded-lg border-2 px-3 py-2.5 text-sm font-medium focus:ring-4 transition-all duration-200 ${
                      datePreset !== "custom"
                        ? "bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-200 focus:border-gray-900 focus:ring-gray-900/10"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Row - Status & Order ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Status</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 cursor-pointer"
                  >
                    <option value="all">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-gray-900 mb-2">
                  Search by Order ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    placeholder="Enter Order ID…"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm font-medium focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Hint */}
            <p className="text-xs text-gray-500">
              Filters apply automatically as you type or select options.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <div className="mt-5 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Order Date</Th>
                    <Th>Platform Email</Th>
                    <Th>Status</Th>
                    <Th>Product</Th>
                    <Th>Order ID</Th>
                    <Th>BoB</Th>
                    <Th className="text-right">Unit Amount</Th>
                    <Th>Tracking ID</Th>
                    <Th>GST</Th>
                    <Th>Billing Phone</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {err ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-sm text-rose-600">
                        {err}
                      </td>
                    </tr>
                  ) : loading ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-sm text-gray-500">
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading…
                        </span>
                      </td>
                    </tr>
                  ) : displayRows.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-sm text-gray-500">
                        No data for selected filters.
                      </td>
                    </tr>
                  ) : (
                    displayRows.map((r) => (
                      <tr key={`${r.orderId}-${r.billingPhone}-${r.trackingId}`}>
                        <Td>{r.orderDate}</Td>
                        <Td className="font-medium text-gray-900">{r.platformEmail}</Td>
                        <Td>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                              r.status === "Approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : r.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {r.status}
                          </span>
                        </Td>
                        <Td className="max-w-[320px] truncate" title={r.product}>
                          {r.product}
                        </Td>
                        <Td className="font-mono">{r.orderId}</Td>
                        <Td>{r.bobOrder ? "Yes" : "No"}</Td>
                        <Td className="text-right font-semibold">
                          {typeof r.unitAmount === "number" ? r.unitAmount.toFixed(2) : r.unitAmount}
                        </Td>
                        <Td className="font-mono">{r.trackingId}</Td>
                        <Td className="font-mono">{r.businessGst}</Td>
                        <Td className="font-mono">{r.billingPhone}</Td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer summary + Rows per load (dropdown) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                Loaded <span className="font-semibold">{displayRows.length}</span> of{" "}
                <span className="font-semibold">{totalElements}</span> rows
                {needsClientPaging && (
                  <span className="ml-1 text-xs text-gray-500">
                    (clipped client-side)
                  </span>
                )}
              </p>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-gray-900">Rows per load:</label>
                <select
                  value={sizeMode}
                  onChange={(e) => setSizeMode(e.target.value)}
                  className="rounded-md border-2 border-gray-200 bg-white px-2 py-1.5 text-sm font-medium focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition"
                >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="custom">Custom…</option>
                </select>

                {sizeMode === "custom" && (
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    className="w-24 rounded-md border-2 border-gray-200 bg-white px-2 py-1.5 text-sm font-medium focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition"
                    placeholder="e.g., 25"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- tiny table helpers ---- */
function Th({ children, className = "" }) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide ${className}`}
    >
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-sm text-gray-700 ${className}`}>{children}</td>;
}
