// src/pages/Orders.jsx
import { useEffect, useMemo, useState } from "react";
import { RotateCw, Download, Package, Calendar } from "lucide-react";
import OrdersTable from "../components/orders/OrdersTable";
import CardDetailsModal from "../components/orders/CardDetailsModal";
import UserDetailsModal from "../components/orders/UserDetailsModal";
import {
  fetchOrderRequests,
  fetchCardDetails,
  fetchUserDetails,
} from "../services/orderService";

/* ---------- date helpers ---------- */
const pad = (n) => String(n).padStart(2, "0");
const fmtDateInput = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function Orders() {
  // Default last 30 days
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // size control (rows per load)
  const [sizeMode, setSizeMode] = useState("10"); // "10" | "50" | "custom"
  const [customSize, setCustomSize] = useState("25");
  const effectiveSize = useMemo(() => {
    if (sizeMode === "10") return 10;
    if (sizeMode === "50") return 50;
    const n = Number(customSize);
    return Number.isFinite(n) && n > 0 ? Math.min(1000, Math.max(1, n)) : 10;
  }, [sizeMode, customSize]);

  // data + ui states
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [err, setErr] = useState("");

  // modals
  const [cardsOpen, setCardsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [cardRows, setCardRows] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const [activeOrderRequestId, setActiveOrderRequestId] = useState(null);

  // init last 30d
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    setStartDate(fmtDateInput(start));
    setEndDate(fmtDateInput(end));
  }, []);

  // fetch on filters/size change
  useEffect(() => {
    if (!startDate || !endDate) return;
    let active = true;

    setLoading(true);
    setErr("");

    (async () => {
      try {
        const res = await fetchOrderRequests({
          page: 0,
          size: effectiveSize,
          startDate,
          endDate,
        });
        if (!active) return;
        setRows(res.content || []);
        setTotal(res.total || 0);
      } catch (e) {
        if (!active) return;
        setErr(e.message || "Failed to load orders.");
        setRows([]);
        setTotal(0);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [startDate, endDate, effectiveSize]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchOrderRequests({
        page: 0,
        size: effectiveSize,
        startDate,
        endDate,
      });
      setRows(res.content || []);
      setTotal(res.total || 0);
    } catch (e) {
      setErr(e.message || "Failed to refresh.");
      setRows([]);
      setTotal(0);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Order Req ID",
      "Platform",
      "Product URL",
      "Total Qty",
      "Qty/Order",
      "Status",
      "Cart Limit",
      "Final Limit",
      "Max Days",
      "Delivery Address",
      "GST",
      "Coupon",
      "Rewards",
    ];
    const toRow = (r) => [
      r.order_request_id,
      r.platform,
      r.product_url,
      r.total_quantity,
      r.quantity_per_order,
      r.order_status,
      r.cart_amount_limit,
      r.final_amount_limit,
      r.max_delivery_days,
      r.delivery_address,
      r.gst_details,
      r.coupon_codes,
      r.reward_ids,
    ];
    const csv = [headers, ...rows.map(toRow)]
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
    a.download = `orders.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Modals load
  const openCardsModal = async (orderRequestId) => {
    setActiveOrderRequestId(orderRequestId);
    setCardsOpen(true);
    setModalLoading(true);
    setCardRows([]);
    try {
      const data = await fetchCardDetails(orderRequestId);
      setCardRows(data);
    } catch (e) {
      setCardRows([]);
    } finally {
      setModalLoading(false);
    }
  };

  const openUsersModal = async (orderRequestId) => {
    setActiveOrderRequestId(orderRequestId);
    setUsersOpen(true);
    setModalLoading(true);
    setUserRows([]);
    try {
      const data = await fetchUserDetails(orderRequestId);
      setUserRows(data);
    } catch (e) {
      setUserRows([]);
    } finally {
      setModalLoading(false);
    }
  };

  const effectiveRows = useMemo(
    () => rows.slice(0, effectiveSize),
    [rows, effectiveSize]
  );

  return (
    <div className="w-full px-4 md:px-6 py-8">
      <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-2 border-gray-200">
        {/* Header */}
        <div className="px-6 py-6 border-b-2 border-gray-200 bg-white rounded-t-2xl">
          <div className="flex flex-col gap-6">
            {/* Title + Summary */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-md">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  Orders
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Showing{" "}
                  <span className="font-bold text-gray-900">{effectiveRows.length}</span> of{" "}
                  <span className="font-bold text-gray-900">{total}</span> requests
                </p>
              </div>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              {/* Date pickers */}
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[160px]">
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border-2 border-gray-200 bg-white font-semibold hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-[160px]">
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border-2 border-gray-200 bg-white font-semibold hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all duration-200 shadow-sm min-w-[110px] ${
                    loading
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-md active:scale-95"
                  }`}
                  title="Refresh data"
                >
                  <RotateCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleDownloadCSV}
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all duration-200 shadow-sm min-w-[110px] group ${
                    loading
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "border-gray-900 bg-gray-900 text-white hover:bg-gray-800 hover:border-gray-800 hover:shadow-lg active:scale-95"
                  }`}
                  title="Export to CSV"
                >
                  <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table area */}
        <div className="px-6 pb-6">
          <div className="mt-5 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm bg-white">
            {err ? (
              <div className="p-6 text-sm text-rose-600">{err}</div>
            ) : loading ? (
              <div className="p-6 text-sm text-gray-600">Loading…</div>
            ) : (
              <>
                <OrdersTable
                  rows={effectiveRows}
                  onViewCards={openCardsModal}
                  onViewUsers={openUsersModal}
                />

                {/* Footer: Size selector */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-sm text-gray-600">
                    Loaded{" "}
                    <span className="font-bold text-gray-900">{effectiveRows.length}</span> of{" "}
                    <span className="font-bold text-gray-900">{total}</span> rows
                  </p>

                  <div className="flex items-center gap-3">
                    <label className="text-sm font-bold text-gray-700">
                      Rows per view:
                    </label>
                    <select
                      value={sizeMode}
                      onChange={(e) => setSizeMode(e.target.value)}
                      className="rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 outline-none cursor-pointer hover:border-gray-400"
                    >
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="custom">Custom</option>
                    </select>
                    {sizeMode === "custom" && (
                      <input
                        type="number"
                        min={1}
                        max={1000}
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        className="w-28 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 outline-none"
                        placeholder="e.g., 25"
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CardDetailsModal
        open={cardsOpen}
        onClose={() => setCardsOpen(false)}
        loading={modalLoading}
        rows={cardRows}
        orderRequestId={activeOrderRequestId}
      />
      <UserDetailsModal
        open={usersOpen}
        onClose={() => setUsersOpen(false)}
        loading={modalLoading}
        rows={userRows}
        orderRequestId={activeOrderRequestId}
      />
    </div>
  );
}