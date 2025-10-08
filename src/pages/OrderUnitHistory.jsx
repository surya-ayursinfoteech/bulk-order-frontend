// src/pages/OrderUnitHistory.jsx
import { useMemo, useState } from "react";
import {
  Download,
  SlidersHorizontal,
  RefreshCw,
  CheckSquare,
  Columns,
  FileText,
  FileSpreadsheet,
  XCircle,
  ChevronDown,
  ArrowUpRight,
  History,
  Search,
} from "lucide-react";
import OrderUnitsTable from "../components/orderUnits/OrderUnitsTable";

// --- Dummy data (replace with API) ---
const RAW = [
  {
    id: "U-119",
    orderDate: "Aug 20, 16:43",
    platformEmail: "darsha999@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD33525437673126100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "8589935369",
  },
  {
    id: "U-118",
    orderDate: "Aug 20, 16:42",
    platformEmail: "bhavyashekhi@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD335254539828168100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9817290504",
  },
  {
    id: "U-117",
    orderDate: "Aug 20, 16:41",
    platformEmail: "iashaangf9@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD335254583809857100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9817289070",
  },
  {
    id: "U-116",
    orderDate: "Aug 20, 16:40",
    platformEmail: "bhavnavatin6s@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD3352543539067367100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9817289076",
  },
  {
    id: "U-115",
    orderDate: "Aug 20, 16:39",
    platformEmail: "bhavnavatin6s@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD3352543502238886100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9817289835",
  },
  {
    id: "U-114",
    orderDate: "Aug 20, 16:38",
    platformEmail: "iashaanyafg9@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD335254349745644100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9817288567",
  },
  {
    id: "U-113",
    orderDate: "Aug 20, 16:38",
    platformEmail: "bhavnavatin6s@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD335254348936533100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9817287437",
  },
  {
    id: "U-112",
    orderDate: "Aug 20, 16:38",
    platformEmail: "bhavnavatin6s@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD335254340083747100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9254997129",
  },
  {
    id: "U-111",
    orderDate: "Aug 20, 16:37",
    platformEmail: "bhavnavatin6s@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD335254339812477100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9139889312",
  },
  {
    id: "U-110",
    orderDate: "Aug 20, 16:36",
    platformEmail: "saloni101singh@flightpathinfo.in",
    status: "Cancelled",
    product: "realme C61 (Safari Green, 64 GB) 4GB RAM",
    orderId: "OD335254332205969100",
    bobOrder: true,
    unitAmount: 7805,
    actualDeliveryDate: "",
    deliveryOtp: "—",
    trackingId: "—",
    businessGst: "06AAECF6022E1Z3",
    billingPhone: "9138983191",
  },
];

export default function OrderUnitHistory() {
  const [datePreset, setDatePreset] = useState("7d");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    let rows = RAW;
    if (status !== "all") rows = rows.filter((r) => r.status.toLowerCase() === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.platformEmail.toLowerCase().includes(q) ||
          r.product.toLowerCase().includes(q) ||
          r.orderId.toLowerCase().includes(q) ||
          r.billingPhone.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [search, status]);

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
    const rows = filtered.map((r) => [
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
    const csv = [headers, ...rows]
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
                  Showing {filtered.length} of {RAW.length} order units
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm group">
                <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline">Update</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
              <CheckSquare className="h-4 w-4" />
              <span className="hidden md:inline">Default View</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden md:inline">Quick Save</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
              <Columns className="h-4 w-4" />
              <span className="hidden md:inline">Columns (13)</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300 mx-1 hidden lg:block" />
            
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Invoices</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
              <FileSpreadsheet className="h-4 w-4" />
              <span className="hidden md:inline">Compile</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm group"
            >
              <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Download CSV</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300 mx-1 hidden lg:block" />
            
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition-all duration-200 shadow-sm">
              <XCircle className="h-4 w-4" />
              <span className="hidden md:inline">Cancel Units</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-5 border-b-2 border-gray-200">
          <div className="space-y-4">
            {/* First Row - Date Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-shrink-0">
                <label className="block text-xs font-bold text-gray-900 mb-2">Order Date</label>
                <button className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                  {datePreset === "24h"
                    ? "Last 24 hours"
                    : datePreset === "7d"
                    ? "Last 7 days"
                    : datePreset === "30d"
                    ? "Last 30 days"
                    : "All Time"}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2.5 text-sm font-medium focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2.5 text-sm font-medium focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Second Row - Status & Search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-gray-900 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    placeholder="Email, product, order ID, phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm font-medium focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearch("");
                  setStartDate("");
                  setEndDate("");
                  setStatus("all");
                  setDatePreset("7d");
                }}
                className="rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Reset Filters
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2.5 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-200">
                <ArrowUpRight className="h-4 w-4" />
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <div className="mt-5 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
            <OrderUnitsTable rows={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}