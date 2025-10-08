// src/components/platform/PlatformTabs.jsx
export default function PlatformTabs({ tab, setTab }) {
  const base =
    "px-5 py-2 text-sm font-medium rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20";
  const active = "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200";
  const idle = "text-gray-700 hover:bg-gray-100";

  return (
    <div className="inline-flex rounded-xl bg-gray-100 p-1">
      <button
        onClick={() => setTab("accounts")}
        className={`${base} ${tab === "accounts" ? active : idle}`}
      >
        Accounts
      </button>
      <button
        onClick={() => setTab("addresses")}
        className={`${base} ${tab === "addresses" ? active : idle}`}
      >
        Addresses
      </button>
      <button
        onClick={() => setTab("gsts")}
        className={`${base} ${tab === "gsts" ? active : idle}`}
      >
        GSTs
      </button>
    </div>
  );
}
