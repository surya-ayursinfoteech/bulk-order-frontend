// src/pages/Orders.jsx
import { useMemo, useState } from "react";
import OrdersTable from "../components/orders/OrdersTable";
import { RotateCw, ChevronDown, Download, Package, Sparkles } from "lucide-react";

/** Demo rows (replace with API later) */
const DEMO = [
  {
    id: "O-1009",
    createdAt: "Aug 22, 09:40",
    status: "processing",
    product: { name: "POCO C71", color: "Cool Blue", spec: "4 • 64" },
    quantity: { total: 1, perOrder: 1 },
    units: { done: 0, total: 5, pct: 0 },
    orders: { success: 0, failed: 0, pending: 1 },
    user: "demouser",
    corporateId: "MYFRIE",
    cardType: "ICICI_CORP_VIRTUAL",
    addressLabel: "Flightpath Gurugram",
    gstLabel: "Flightpath HR",
    timeTaken: "N/A",
  },
  {
    id: "O-1008",
    createdAt: "Aug 21, 14:56",
    status: "processing",
    product: { name: "POCO C71", color: "Cool Blue", spec: "4 • 64" },
    quantity: { total: 1, perOrder: 1 },
    units: { done: 0, total: 5, pct: 0 },
    orders: { success: 0, failed: 0, pending: 1 },
    user: "demouser",
    corporateId: "MYFRIE",
    cardType: "ICICI_CORP_VIRTUAL",
    addressLabel: "Flightpath Gurugram",
    gstLabel: "Flightpath HR",
    timeTaken: "N/A",
  },
  {
    id: "O-1007",
    createdAt: "Aug 20, 16:32",
    status: "cancelled",
    product: { name: "realme C61", color: "Safari Green", spec: "4 • 64" },
    quantity: { total: 100, perOrder: 1 },
    units: { done: 12, total: 100, pct: 12 },
    orders: { success: 12, failed: 9, pending: 0 },
    user: "demouser",
    corporateId: "MYFRIE",
    cardType: "ICICI_CORP_VIRTUAL",
    addressLabel: "Flightpath Gurugram",
    gstLabel: "Flightpath HR",
    timeTaken: "N/A",
  },
  {
    id: "O-1006",
    createdAt: "Aug 20, 16:31",
    status: "cancelled",
    product: { name: "realme C61", color: "Safari Green", spec: "4 • 64" },
    quantity: { total: 100, perOrder: 1 },
    units: { done: 6, total: 100, pct: 6 },
    orders: { success: 6, failed: 9, pending: 0 },
    user: "demouser",
    corporateId: "MYFRIE",
    cardType: "ICICI_CORP_VIRTUAL",
    addressLabel: "Flightpath Gurugram",
    gstLabel: "Flightpath HR",
    timeTaken: "N/A",
  },
  {
    id: "O-1005",
    createdAt: "Aug 20, 16:27",
    status: "cancelled",
    product: { name: "realme C61", color: "Safari Green", spec: "4 • 64" },
    quantity: { total: 100, perOrder: 1 },
    units: { done: 0, total: 100, pct: 0 },
    orders: { success: 0, failed: 6, pending: 0 },
    user: "demouser",
    corporateId: "MYFRIE",
    cardType: "ICICI_CORP_VIRTUAL",
    addressLabel: "Flightpath Gurugram",
    gstLabel: "Flightpath HR",
    timeTaken: "N/A",
  },
  {
    id: "O-1004",
    createdAt: "Aug 20, 15:20",
    status: "cancelled",
    product: { name: "POCO C71", color: "Cool Blue", spec: "4 • 64" },
    quantity: { total: 100, perOrder: 1 },
    units: { done: 1, total: 100, pct: 1 },
    orders: { success: 1, failed: 2, pending: 1 },
    user: "demouser",
    corporateId: "MYFRIE",
    cardType: "ICICI_CORP_VIRTUAL",
    addressLabel: "Flightpath Gurugram",
    gstLabel: "Flightpath HR",
    timeTaken: "5m 14s",
  },
  {
    id: "O-1003",
    createdAt: "Aug 20, 15:40",
    status: "completed",
    product: { name: "POCO C71", color: "Cool Blue", spec: "4 • 64" },
    quantity: { total: 5, perOrder: 1 },
    units: { done: 5, total: 5, pct: 100 },
    orders: { success: 3, failed: 0, pending: 0 },
    user: "demouser",
    corporateId: "MYFRIE",
    cardType: "ICICI_CORP_VIRTUAL",
    addressLabel: "Flightpath Gurugram",
    gstLabel: "Flightpath HR",
    timeTaken: "3m 59s",
  },
  {
    id: "O-1002",
    createdAt: "Aug 20, 15:12",
    status: "queued",
    product: { name: "Samsung M14", color: "Navy Blue", spec: "6 • 128" },
    quantity: { total: 10, perOrder: 2 },
    units: { done: 0, total: 10, pct: 0 },
    orders: { success: 0, failed: 0, pending: 0 },
    user: "opslead",
    corporateId: "MYFRIE",
    cardType: "HDFC_VIRTUAL",
    addressLabel: "Warehouse 1",
    gstLabel: "Flightpath HR",
    timeTaken: "N/A",
  },
  {
    id: "O-1001",
    createdAt: "Aug 19, 11:05",
    status: "completed",
    product: { name: "LG Inverter AC", color: "White", spec: "1.5T" },
    quantity: { total: 3, perOrder: 1 },
    units: { done: 3, total: 3, pct: 100 },
    orders: { success: 3, failed: 0, pending: 0 },
    user: "admin",
    corporateId: "MYFRIE",
    cardType: "AXIS_VIRTUAL",
    addressLabel: "Office Delhi",
    gstLabel: "Flightpath Finance",
    timeTaken: "12m 02s",
  },
];

export default function Orders() {
  const [tab, setTab] = useState("bulk");
  const [range, setRange] = useState("24h");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const bulkRows = useMemo(() => DEMO, []);
  const allRows = useMemo(
    () => DEMO.map((r, i) => ({ ...r, id: r.id + (i % 2 === 0 ? "" : "-A") })),
    []
  );

  const rows = tab === "bulk" ? bulkRows : allRows;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 700);
  };

  const handleDownloadCSV = () => {
    const headers = [
      "ID",
      "Created",
      "Status",
      "Product",
      "Spec",
      "Color",
      "Qty Total",
      "Qty/Order",
      "Units Done",
      "Units Total",
      "Units %",
      "Orders ✓",
      "Orders ✗",
      "Orders ⏳",
      "User",
      "Corporate ID",
      "Card Type",
      "Address Label",
      "GST Label",
      "Time Taken",
    ];
    const toRow = (r) => [
      r.id,
      r.createdAt,
      r.status,
      r.product.name,
      r.product.spec,
      r.product.color,
      r.quantity.total,
      r.quantity.perOrder,
      r.units.done,
      r.units.total,
      r.units.pct,
      r.orders.success,
      r.orders.failed,
      r.orders.pending,
      r.user,
      r.corporateId,
      r.cardType,
      r.addressLabel,
      r.gstLabel,
      r.timeTaken,
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
    a.download = `${tab === "bulk" ? "bulk-orders" : "all-orders"}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full px-4 md:px-6 py-8">
      <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-2 border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b-2 border-gray-200 bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-md">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900">Orders</h2>
              <p className="text-sm text-gray-600 mt-0.5">View and manage your bulk orders</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
                <span className="hidden sm:inline">Last</span>
                {range === "24h" ? "24 hours" : range === "7d" ? "7 days" : "All"}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm group"
              title="Download CSV"
            >
              <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            >
              <RotateCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-5">
          <div className="inline-flex rounded-xl bg-gray-100 p-1.5 shadow-inner">
            <button
              onClick={() => setTab("bulk")}
              className={`px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                tab === "bulk" 
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              }`}
            >
              Bulk Orders
            </button>
            <button
              onClick={() => setTab("all")}
              className={`px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                tab === "all" 
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              }`}
            >
              All Orders
            </button>
          </div>
        </div>

        {/* Table area */}
        <div className="px-6 pb-6">
          <div className="mt-5 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
            <OrdersTable rows={rows} variant={tab === "bulk" ? "bulk" : "all"} />
          </div>
        </div>
      </div>
    </div>
  );
}