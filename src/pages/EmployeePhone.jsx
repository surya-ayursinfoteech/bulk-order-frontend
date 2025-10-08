// src/pages/EmployeePhone.jsx
import { useMemo, useState } from "react";
import {
  Phone,
  Plus,
  Download,
  Filter,
  RefreshCw,
  Search,
} from "lucide-react";

/* ---------------- Dummy rows (replace with API later) ---------------- */
const ROWS = [
  {
    id: "row-001",
    corporateId: "MYRFIE",
    employeeId: "FP37",
    phoneMasked: "92••••4683",
    status: "ONLINE",
    lastPing: "Aug 21, 15:00:11",
    lastOtp: "8000: •••646",
    lastOtpTime: "Aug 21, 14:58:37",
    createdAt: "Aug 18, 17:50:50",
    updatedAt: "Aug 21, 15:00:11",
  },
  {
    id: "row-002",
    corporateId: "MYRFIE",
    employeeId: "FP31",
    phoneMasked: "92••••2456",
    status: "ONLINE",
    lastPing: "Aug 21, 15:00:11",
    lastOtp: "8000: •••763",
    lastOtpTime: "Aug 20, 16:44:30",
    createdAt: "Aug 20, 10:34:13",
    updatedAt: "Aug 21, 15:00:11",
  },
  {
    id: "row-003",
    corporateId: "MYRFIE",
    employeeId: "FP64",
    phoneMasked: "92••••4162",
    status: "OFFLINE",
    lastPing: "Aug 21, 14:52:20",
    lastOtp: "2624: •••837",
    lastOtpTime: "Aug 21, 13:25:10",
    createdAt: "Aug 20, 13:25:09",
    updatedAt: "Aug 21, 14:52:20",
  },
  {
    id: "row-004",
    corporateId: "MYRFIE",
    employeeId: "FP52",
    phoneMasked: "98••••9012",
    status: "ONLINE",
    lastPing: "Aug 21, 15:02:41",
    lastOtp: "7712: •••102",
    lastOtpTime: "Aug 21, 14:59:10",
    createdAt: "Aug 18, 12:11:44",
    updatedAt: "Aug 21, 15:02:41",
  },
  {
    id: "row-005",
    corporateId: "MYRFIE",
    employeeId: "FP12",
    phoneMasked: "99••••7788",
    status: "OFFLINE",
    lastPing: "Aug 21, 12:28:05",
    lastOtp: "5401: •••456",
    lastOtpTime: "Aug 21, 12:00:19",
    createdAt: "Aug 17, 09:40:02",
    updatedAt: "Aug 21, 12:28:05",
  },
];

export default function EmployeePhone() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all"); // all | online | offline

  const filtered = useMemo(() => {
    let rows = ROWS.slice();
    if (status !== "all") rows = rows.filter((r) => r.status.toLowerCase() === status);
    if (q.trim()) {
      const s = q.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.employeeId.toLowerCase().includes(s) ||
          r.corporateId.toLowerCase().includes(s) ||
          r.phoneMasked.toLowerCase().includes(s)
      );
    }
    return rows;
  }, [q, status]);

  return (
    <div className="w-full px-4 md:px-6 py-8">
      <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-2 border-gray-200">
        {/* Header */}
        <div className="px-6 py-5 border-b-2 border-gray-200 bg-white rounded-t-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-md">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  Employee Phones
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Showing {filtered.length} of {ROWS.length} devices
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white px-3 py-2 text-sm font-bold hover:bg-gray-800 transition shadow">
                <Plus className="h-4 w-4" />
                Add Phone
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm">
                <Download className="h-4 w-4" />
                Download CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-5 border-b-2 border-gray-200">
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-900 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  placeholder="Employee ID, corporate ID, phone…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 bg-white pl-10 pr-3 py-2.5 text-sm font-medium focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition"
                />
              </div>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-xs font-bold text-gray-900 mb-2">
                Connection
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition cursor-pointer"
              >
                <option value="all">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm">
              <Filter className="h-4 w-4" />
              Apply
            </button>
          </div>

          {/* Tiny filter tag like screenshot */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-gray-600 font-semibold">Filters</span>
            {status !== "all" && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-200 font-semibold">
                {status === "online" ? "Active" : "Offline"}
              </span>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <div className="mt-5 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm bg-white">
            <div className="w-full overflow-auto">
              <table className="min-w-[980px] w-full table-fixed border-collapse">
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
                  <tr className="text-left text-[11px] uppercase tracking-wide text-gray-600/90">
                    <Th w="8rem">Corporate ID</Th>
                    <Th w="8rem">Employee ID</Th>
                    <Th w="12rem">Phone Number</Th>
                    <Th w="12rem">Connection Status</Th>
                    <Th w="14rem">Last Ping</Th>
                    <Th w="12rem">Last OTP</Th>
                    <Th w="14rem">Last OTP Time</Th>
                    <Th w="14rem">Created At</Th>
                    <Th w="14rem">Updated At</Th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                      <Td className="font-semibold text-gray-900">{r.corporateId}</Td>
                      <Td className="text-gray-800">{r.employeeId}</Td>
                      <Td className="text-gray-800">{r.phoneMasked}</Td>
                      <Td>
                        <ConnPill status={r.status} />
                      </Td>
                      <Td className="text-gray-700">{r.lastPing}</Td>
                      <Td className="text-gray-700">{r.lastOtp}</Td>
                      <Td className="text-gray-700">{r.lastOtpTime}</Td>
                      <Td className="text-gray-700">{r.createdAt}</Td>
                      <Td className="text-gray-700">{r.updatedAt}</Td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-sm text-gray-500">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-3 px-1">
            <span>Showing {filtered.length} of {ROWS.length}</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- helpers ---------------- */
function Th({ children, w, className = "" }) {
  return (
    <th className={`px-3 py-3 font-semibold ${className}`} style={{ width: w }}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-3 py-3 text-sm ${className}`}>{children}</td>;
}
function ConnPill({ status }) {
  const on = String(status).toUpperCase() === "ONLINE";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ring-1 ${
        on
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-rose-50 text-rose-700 ring-rose-200"
      }`}
    >
      {on ? "ONLINE" : "OFFLINE"}
    </span>
  );
}
