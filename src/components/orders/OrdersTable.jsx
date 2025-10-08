// src/components/orders/OrdersTable.jsx
import { Circle, Timer, Eye, XCircle } from "lucide-react";

/**
 * variant: "bulk" | "all"
 * rows: see Orders.jsx DEMO structure
 */
export default function OrdersTable({ rows = [], variant = "bulk" }) {
  const accent =
    variant === "bulk"
      ? "from-blue-600/10 via-blue-600/5 to-transparent"
      : "from-emerald-600/10 via-emerald-600/5 to-transparent";

  const headerAccent =
    variant === "bulk"
      ? "border-l-4 border-l-blue-500"
      : "border-l-4 border-l-emerald-500";

  return (
    <div className="w-full overflow-auto">
      <table className="min-w-[980px] w-full table-fixed border-collapse">
        {/* Header */}
        <thead className={`bg-gradient-to-r ${accent} ${headerAccent} sticky top-0 z-10`}>
          <tr className="text-left text-[11px] uppercase tracking-wide text-gray-600/90">
            <Th w="10rem">Created</Th>
            <Th w="9rem">Status</Th>
            <Th w="16rem">Product</Th>
            <Th w="9rem">Quantity</Th>
            <Th w="12rem">Units</Th>
            <Th w="9rem">Orders</Th>
            <Th w="8rem">User</Th>
            <Th w="7rem">Corp. ID</Th>
            <Th w="12rem">Card Type</Th>
            <Th w="12rem">Address Label</Th>
            <Th w="10rem">GST Label</Th>
            <Th w="7rem">Time</Th>
            <Th w="12rem" className="text-right pr-3">Actions</Th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((r) => (
            <tr
              key={r.id}
              className="even:bg-gray-50/40 hover:bg-white hover:shadow-[0_1px_0_0_rgba(17,24,39,0.04),0_6px_14px_-6px_rgba(17,24,39,0.15)] transition-all"
            >
              <Td className="text-gray-900">{r.createdAt}</Td>

              <Td>
                <StatusBadge status={r.status} variant={variant} />
              </Td>

              <Td className="pr-4">
                <div className="font-medium text-gray-900 truncate">{r.product.name}</div>
                <div className="text-[12px] text-gray-500 truncate">
                  {r.product.spec} • {r.product.color}
                </div>
              </Td>

              <Td>
                <div className="text-gray-900 text-sm font-semibold">
                  {r.quantity.total} <span className="text-gray-500 font-normal">total</span>
                </div>
                <div className="text-[12px] text-gray-500">{r.quantity.perOrder}/order</div>
              </Td>

              <Td className="pr-4">
                <Progress value={r.units.pct} />
                <div className="text-[12px] text-gray-600 mt-1">
                  {r.units.done}/{r.units.total}
                </div>
              </Td>

              <Td>
                <div className="text-sm text-gray-900">
                  <span className="text-emerald-600 font-semibold">{r.orders.success}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-rose-600 font-semibold">{r.orders.failed}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-amber-600 font-semibold">{r.orders.pending}</span>
                </div>
              </Td>

              <Td className="text-gray-800 truncate">{r.user}</Td>
              <Td className="font-semibold text-gray-900 truncate">{r.corporateId}</Td>
              <Td className="truncate text-gray-800">{r.cardType}</Td>
              <Td className="truncate text-gray-800">{r.addressLabel}</Td>
              <Td className="truncate text-gray-800">{r.gstLabel}</Td>
              <Td className="text-gray-700">{r.timeTaken}</Td>

              {/* ACTIONS — single line, no wrap, right aligned */}
              <Td className="text-right pr-3">
                <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <button
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-gray-900 text-white hover:bg-gray-800 shadow-sm active:scale-[0.98] transition"
                    title="View"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                  <button
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 shadow-sm active:scale-[0.98] transition"
                    title="Cancel"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                </div>
              </Td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={13} className="py-10 text-center text-sm text-gray-500">
                No orders found in the selected range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function Th({ children, w, className = "" }) {
  // tighter columns: px-3 (was px-4)
  return (
    <th
      className={`px-3 py-3 font-semibold ${className}`}
      style={{ width: w }}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  // tighter cells: px-3 (was px-4)
  return (
    <td className={`px-3 py-3 align-top text-sm text-gray-800 ${className}`}>
      {children}
    </td>
  );
}

function Progress({ value = 0 }) {
  const v = Math.min(Math.max(value, 0), 100);
  return (
    <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-200">
      <div
        className="h-full rounded-full bg-gradient-to-r from-gray-900 to-gray-700"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

function StatusBadge({ status, variant }) {
  // Subtle variant accent
  const accents =
    variant === "bulk"
      ? {
          processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
          cancelled: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
          completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
          queued: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        }
      : {
          processing: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
          cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
          completed: "bg-green-50 text-green-700 ring-1 ring-green-200",
          queued: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
        };

  const icon =
    status === "processing" ? (
      <Circle className="h-3.5 w-3.5 animate-pulse" />
    ) : status === "cancelled" ? (
      <Circle className="h-3.5 w-3.5" />
    ) : status === "completed" ? (
      <Circle className="h-3.5 w-3.5" />
    ) : (
      <Timer className="h-3.5 w-3.5" />
    );

  const label =
    status === "processing"
      ? "Processing"
      : status === "cancelled"
      ? "Cancelled"
      : status === "completed"
      ? "Completed"
      : "Queued";

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold ${accents[status]}`}
    >
      {icon}
      {variant === "bulk" && <span className="hidden sm:inline">Bulk</span>}
      {label}
    </span>
  );
}
