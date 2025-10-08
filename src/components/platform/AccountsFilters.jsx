// src/components/platform/AccountsFilters.jsx
export default function AccountsFilters({ values, onChange, onApply, onReset }) {
  const {
    emailQ, phoneQ, pincodeQ, addrQ, minCoins, status, type,
  } = values;

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Input
          placeholder="Search by email..."
          value={emailQ}
          onChange={(e) => onChange.setEmailQ(e.target.value)}
        />
        <Input
          placeholder="Search by phone..."
          value={phoneQ}
          onChange={(e) => onChange.setPhoneQ(e.target.value)}
        />
        <Input
          placeholder="Search in addresses..."
          value={addrQ}
          onChange={(e) => onChange.setAddrQ(e.target.value)}
        />
        <Input
          placeholder="Search by pincode..."
          value={pincodeQ}
          onChange={(e) => onChange.setPincodeQ(e.target.value)}
        />

        <Input
          placeholder="Min supercoins..."
          value={minCoins}
          onChange={(e) => onChange.setMinCoins(e.target.value)}
        />

        <Select
          value={status}
          onChange={(e) => onChange.setStatus(e.target.value)}
          options={[
            { value: "all", label: "All Status" },
            { value: "logged in", label: "Logged In" },
            { value: "logged out", label: "Logged Out" },
          ]}
        />

        <Select
          value={type}
          onChange={(e) => onChange.setType(e.target.value)}
          options={[
            { value: "all", label: "All Types" },
            { value: "active", label: "Active" },
            { value: "premium", label: "Premium" },
            { value: "gold", label: "Gold" },
          ]}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={onApply}
            className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            onClick={onReset}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

/* helpers */
function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
