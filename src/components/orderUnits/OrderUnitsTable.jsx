// src/components/orderUnits/OrderUnitsTable.jsx
import { Check, Eye, FileDown } from "lucide-react";

export default function OrderUnitsTable({ rows = [] }) {
  return (
    <div className="w-full overflow-auto">
      <table className="min-w-[1100px] w-full table-fixed border-collapse">
        <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
          <tr className="text-left text-[11px] uppercase tracking-wide text-gray-600/90">
            <Th w="11rem">Order Date</Th>
            <Th w="16rem">Platform Email</Th>
            <Th w="9rem">Status</Th>
            <Th w="22rem">Product</Th>
            <Th w="14rem">Order ID</Th>
            <Th w="8rem">BoB Order</Th>
            <Th w="10rem">Unit Amount</Th>
            <Th w="12rem">Actual Delivery Date</Th>
            <Th w="9rem">Delivery OTP</Th>
            <Th w="10rem">Tracking ID</Th>
            <Th w="12rem">Business GST No</Th>
            <Th w="11rem">Billing Phone</Th>
            <Th w="10rem" className="text-right pr-3">Actions</Th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((r) => (
            <tr
              key={r.id}
              className="even:bg-gray-50/60 hover:bg-white hover:shadow-[0_1px_0_0_rgba(17,24,39,0.04),0_6px_14px_-6px_rgba(17,24,39,0.15)] transition-all"
            >
              <Td className="text-gray-900">{r.orderDate}</Td>
              <Td className="truncate">{r.platformEmail}</Td>
              <Td><StatusPill status={r.status} /></Td>
              <Td className="truncate" title={r.product}>
                <div className="font-medium text-gray-900 truncate">{r.product}</div>
              </Td>
              <Td className="truncate">{r.orderId}</Td>
              <Td>
                {r.bobOrder ? (
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2 py-0.5 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                    Yes
                  </span>
                ) : (
                  "—"
                )}
              </Td>
              <Td className="font-semibold text-gray-900">
                ₹{Number(r.unitAmount).toLocaleString(undefined, { minimumFractionDigits: 0 })}.00
              </Td>
              <Td className="text-gray-700">{r.actualDeliveryDate || "—"}</Td>
              <Td className="text-gray-700">{r.deliveryOtp}</Td>
              <Td className="text-gray-700">{r.trackingId}</Td>
              <Td className="truncate">{r.businessGst}</Td>
              <Td className="truncate">{r.billingPhone}</Td>

              {/* Actions */}
              <Td className="text-right pr-3">
                <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-gray-900 text-white hover:bg-gray-800 shadow-sm active:scale-[0.98] transition">
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 shadow-sm active:scale-[0.98] transition">
                    <FileDown className="h-3.5 w-3.5" />
                    Invoice
                  </button>
                </div>
              </Td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={13} className="py-10 text-center text-sm text-gray-500">
                No order units found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* --- sub components --- */

function Th({ children, w, className = "" }) {
  return (
    <th className={`px-3 py-3 font-semibold ${className}`} style={{ width: w }}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-3 py-3 align-top text-sm text-gray-800 ${className}`}>
      {children}
    </td>
  );
}

function StatusPill({ status = "" }) {
  const s = status.toLowerCase();
  const map = {
    cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
    completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    processing: "bg-blue-50 text-blue-700 ring-blue-200",
  };
  const cls = map[s] || "bg-gray-50 text-gray-700 ring-gray-200";
  const label = s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full ring-1 ${cls}`}>
      {label}
    </span>
  );
}
