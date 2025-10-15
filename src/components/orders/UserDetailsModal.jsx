// src/components/orders/UserDetailsModal.jsx
import { X, Users } from "lucide-react";

export default function UserDetailsModal({ open, onClose, loading, rows = [], orderRequestId }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <header className="px-5 py-3 border-b flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Users className="w-5 h-5 text-gray-900" />
              User Details {orderRequestId ? `• #${orderRequestId}` : ""}
            </div>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100" aria-label="Close">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </header>

          <div className="max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="p-6 text-sm text-gray-600">Loading…</div>
            ) : rows.length === 0 ? (
              <div className="p-6 text-sm text-gray-500">No user records found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <Th>Email</Th>
                      <Th>Password</Th>
                      <Th>Mobile</Th>
                      <Th>Status</Th>
                      <Th>Delivery Address</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {rows.map((r, idx) => (
                      <tr key={`${r.user_id ?? "user"}-${idx}`}>
                        <Td className="font-mono">{r.email_id}</Td>
                        <Td className="font-mono">{r.email_password}</Td>
                        <Td className="font-mono">{r.mobile_number}</Td>
                        <Td>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                              r.user_status === "ACTIVE"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {r.user_status}
                          </span>
                        </Td>
                        <Td>{r.delivery_address}</Td>
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
