// src/components/orders/CardDetailsModal.jsx
import { X, CreditCard, Shield } from "lucide-react";

export default function CardDetailsModal({ open, onClose, loading, rows = [], orderRequestId }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <header className="px-5 py-3 border-b flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <CreditCard className="w-5 h-5 text-gray-900" />
              Card Details {orderRequestId ? `• #${orderRequestId}` : ""}
            </div>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100" aria-label="Close">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </header>

          <div className="max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="p-6 text-sm text-gray-600">Loading…</div>
            ) : rows.length === 0 ? (
              <div className="p-6 text-sm text-gray-500">No card records found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <Th>Card #</Th>
                      <Th>Name</Th>
                      <Th>Expiry</Th>
                      <Th>CVV</Th>
                      <Th>Mobile</Th>
                      <Th>Category</Th>
                      <Th>Secret</Th>
                      <Th>Auth</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {rows.map((r, idx) => (
                      <tr key={`${r.card_id ?? "card"}-${idx}`}>
                        <Td className="font-mono">{r.card_number}</Td>
                        <Td>{r.name_on_card}</Td>
                        <Td>
                          {String(r.expiry_month).padStart(2, "0")}/{String(r.expiry_year).padStart(2, "0")}
                        </Td>
                        <Td className="font-mono">{r.cvv}</Td>
                        <Td className="font-mono">{r.mobile_number}</Td>
                        <Td>{r.card_category}</Td>
                        <Td className="font-mono">{r.secret}</Td>
                        <Td className="inline-flex items-center gap-1">
                          <Shield className="h-4 w-4 text-gray-600" />
                          {r.auth_type}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wide">
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-gray-800 ${className}`}>{children}</td>;
}
