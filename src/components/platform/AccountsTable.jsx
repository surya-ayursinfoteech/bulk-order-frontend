// src/components/platform/AccountsTable.jsx
export default function AccountsTable({ rows = [] }) {
  return (
    <div className="w-full overflow-auto">
      <table className="min-w-[1100px] w-full table-fixed border-collapse">
        <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
          <tr className="text-left text-[11px] uppercase tracking-wide text-gray-600/90">
            <Th w="22rem">Email</Th>
            <Th w="12rem">Phone</Th>
            <Th w="18rem">Subscription Type</Th>
            <Th w="12rem">Supercoins Balance</Th>
            <Th w="12rem">Login Status</Th>
            <Th w="12rem">Created At</Th>
            <Th w="12rem">Updated At</Th>
            <Th w="10rem">Pincodes</Th>
            <Th w="14rem">ID Transfer Warning</Th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((r) => (
            <tr
              key={r.id}
              className="even:bg-gray-50/60 hover:bg-white transition-colors"
            >
              <Td className="truncate font-medium text-gray-900">{r.email}</Td>
              <Td className="truncate">{r.phone}</Td>
              <Td className="truncate">{r.subscription}</Td>
              <Td>{r.coins}</Td>
              <Td>
                <StatusPill state={r.login} />
              </Td>
              <Td>{r.createdAt}</Td>
              <Td>{r.updatedAt}</Td>
              <Td>{r.pincodes}</Td>
              <Td>{r.warning}</Td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={9} className="py-10 text-center text-sm text-gray-500">
                No accounts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* sub-components */
function Th({ children, w, className = "" }) {
  return (
    <th className={`px-3 py-3 font-semibold ${className}`} style={{ width: w }}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return (
    <td className={`px-3 py-3 text-sm text-gray-800 ${className}`}>{children}</td>
  );
}

function StatusPill({ state }) {
  const loggedIn = String(state).toLowerCase() === "logged in";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ring-1 ${
        loggedIn
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-gray-100 text-gray-600 ring-gray-200"
      }`}
    >
      {state}
    </span>
  );
}
