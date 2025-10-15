// src/components/orders/OrdersTable.jsx
import { Eye } from "lucide-react";

/**
 * rows: array of order requests
 * onViewCards(order_request_id)
 * onViewUsers(order_request_id)
 */
export default function OrdersTable({ rows = [], onViewCards, onViewUsers }) {
  return (
    <div className="w-full overflow-auto">
      <table className="min-w-[980px] w-full table-fixed border-collapse">
        {/* Header */}
        <thead className="bg-gradient-to-r from-gray-900/5 via-gray-900/3 to-transparent border-l-4 border-l-gray-900 sticky top-0 z-10">
          <tr className="text-left text-[11px] uppercase tracking-wide text-gray-600/90">
            <Th w="12rem">Order Request ID</Th>
            <Th w="18rem">Product URL</Th>
            <Th w="7rem">Platform</Th>
            <Th w="9rem">Status</Th>
            <Th w="9rem">Qty</Th>
            <Th w="10rem">Cart Limit</Th>
            <Th w="10rem">Final Limit</Th>
            <Th w="9rem">Max Days</Th>
            <Th w="12rem">Delivery Address</Th>
            <Th w="12rem">GST</Th>
            <Th w="10rem">Coupon</Th>
            <Th w="10rem">Rewards</Th>
            <Th w="10rem">Card Details</Th>
            <Th w="10rem">User Details</Th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((r, idx) => (
            <tr
              key={`${r.order_request_id ?? "req"}-${idx}`}
              className="even:bg-gray-50/40 hover:bg-white hover:shadow-[0_1px_0_0_rgba(17,24,39,0.04),0_6px_14px_-6px_rgba(17,24,39,0.15)] transition-all"
            >
              <Td className="text-gray-900 font-semibold">{r.order_request_id}</Td>
              <Td className="max-w-[280px] truncate" title={r.product_url}>
                <a
                  className="text-gray-900 hover:underline"
                  href={r.product_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.product_url}
                </a>
              </Td>
              <Td className="uppercase font-semibold text-gray-800">{r.platform}</Td>
              <Td>
                <StatusBadge status={r.order_status} />
              </Td>
              <Td>
                <div className="text-gray-900 text-sm font-semibold">
                  {r.total_quantity} <span className="text-gray-500 font-normal">total</span>
                </div>
                <div className="text-[12px] text-gray-500">{r.quantity_per_order}/order</div>
              </Td>
              <Td className="text-gray-800">{fmtCurrency(r.cart_amount_limit)}</Td>
              <Td className="text-gray-800">{fmtCurrency(r.final_amount_limit)}</Td>
              <Td className="text-gray-800">{r.max_delivery_days}</Td>
              <Td className="text-gray-800 truncate">{r.delivery_address}</Td>
              <Td className="text-gray-800 truncate">{r.gst_details}</Td>
              <Td className="text-gray-800 truncate">{r.coupon_codes}</Td>
              <Td className="text-gray-800 truncate">{r.reward_ids}</Td>

              {/* Actions */}
              <Td>
                <button
                  onClick={() => onViewCards?.(r.order_request_id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-gray-900 text-white hover:bg-gray-800 shadow-sm active:scale-[0.98] transition"
                  title="View card details"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Details
                </button>
              </Td>
              <Td>
                <button
                  onClick={() => onViewUsers?.(r.order_request_id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 shadow-sm active:scale-[0.98] transition"
                  title="View user details"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Details
                </button>
              </Td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={14} className="py-10 text-center text-sm text-gray-500">
                No orders in the selected range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, w, className = "" }) {
  return (
    <th className={`px-3 py-3 font-semibold ${className}`} style={{ width: w }}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`px-3 py-3 align-top text-sm text-gray-800 ${className}`}>{children}</td>;
}

function StatusBadge({ status }) {
  const s = (status || "").toUpperCase();
  const cls =
    s === "IN_PROGRESS"
      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
      : s === "APPROVED"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : s === "PENDING"
      ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
      : "bg-gray-50 text-gray-700 ring-1 ring-gray-200";

  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cls}`}>{s || "—"}</span>;
}

function fmtCurrency(x) {
  if (x == null || isNaN(Number(x))) return "—";
  return Number(x).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
