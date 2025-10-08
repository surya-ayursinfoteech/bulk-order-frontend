// src/pages/PlatformConfig.jsx
import { useMemo, useState } from "react";
import {
  ChevronDown,
  Download,
  RefreshCw,
  SlidersHorizontal,
  Columns as ColumnsIcon,
  CheckSquare,
  ServerCog,
} from "lucide-react";
import PlatformTabs from "../components/platform/PlatformTabs";
import AccountsFilters from "../components/platform/AccountsFilters";
import AccountsTable from "../components/platform/AccountsTable";

/* ---------------- Demo rows — replace with API later ---------------- */
const DEMO = [
  { id: "acc-1",  email: "flightpath@flightpathinfo.in",     phone: "—",        subscription: "—",                  coins: 0,   login: "Logged Out", createdAt: "Aug 15, 2025", updatedAt: "Aug 20, 23:07", pincodes: "—", warning: "No" },
  { id: "acc-2",  email: "flightpath583@flightpathinfo.in",  phone: "—",        subscription: "—",                  coins: 0,   login: "Logged Out", createdAt: "Aug 15, 2025", updatedAt: "Aug 20, 23:07", pincodes: "—", warning: "No" },
  { id: "acc-3",  email: "devoki@flightpathinfo.in",          phone: "—",        subscription: "—",                  coins: 0,   login: "Logged Out", createdAt: "Aug 15, 2025", updatedAt: "Aug 20, 23:07", pincodes: "—", warning: "No" },
  { id: "acc-4",  email: "bhavanya6@flightpathinfo.in",       phone: "9254988396", subscription: "ACTIVE-PREMIUM-GOLD", coins: 500, login: "Logged In",  createdAt: "Aug 15, 2025", updatedAt: "Aug 20, 22:49", pincodes: "—", warning: "No" },
  { id: "acc-5",  email: "bhavana6ns@flightpathinfo.in",      phone: "9817288460", subscription: "ACTIVE-PREMIUM-GOLD", coins: 450, login: "Logged In",  createdAt: "Aug 15, 2025", updatedAt: "Aug 19, 23:46", pincodes: "—", warning: "No" },
  { id: "acc-6",  email: "kuldeep10Isingh@flightpathinfo.in", phone: "9138982894", subscription: "ACTIVE-PREMIUM-GOLD", coins: 415, login: "Logged In",  createdAt: "Aug 15, 2025", updatedAt: "Aug 21, 14:58", pincodes: "—", warning: "No" },
  { id: "acc-7",  email: "shaaanm69@flightpathinfo.in",       phone: "9817290803", subscription: "ACTIVE-PREMIUM-GOLD", coins: 385, login: "Logged In",  createdAt: "Aug 15, 2025", updatedAt: "Aug 19, 23:46", pincodes: "—", warning: "No" },
  { id: "acc-8",  email: "devanik@flightpathinfo.in",         phone: "9817288248", subscription: "ACTIVE-PREMIUM-GOLD", coins: 376, login: "Logged In",  createdAt: "Aug 15, 2025", updatedAt: "Aug 19, 23:46", pincodes: "—", warning: "No" },
  { id: "acc-9",  email: "bhavyashekhi@flightpathinfo.in",    phone: "—",        subscription: "—",                  coins: 0,   login: "Logged Out", createdAt: "Aug 15, 2025", updatedAt: "Aug 20, 23:07", pincodes: "—", warning: "No" },
  { id: "acc-10", email: "iashaanyafg9@flightpathinfo.in",    phone: "—",        subscription: "—",                  coins: 0,   login: "Logged Out", createdAt: "Aug 15, 2025", updatedAt: "Aug 20, 23:07", pincodes: "—", warning: "No" },
];

export default function PlatformConfig() {
  const [tab, setTab] = useState("accounts");

  // Accounts filters
  const [emailQ, setEmailQ] = useState("");
  const [phoneQ, setPhoneQ] = useState("");
  const [pincodeQ, setPincodeQ] = useState("");
  const [addrQ, setAddrQ] = useState("");
  const [minCoins, setMinCoins] = useState("");
  const [status, setStatus] = useState("all"); // "all" | "logged in" | "logged out"
  const [type, setType] = useState("all");     // "all" | "premium" | "gold" | "active"

  const filtered = useMemo(() => {
    if (tab !== "accounts") return [];
    let rows = DEMO.slice();
    if (emailQ.trim())   rows = rows.filter((r) => r.email.toLowerCase().includes(emailQ.toLowerCase()));
    if (phoneQ.trim())   rows = rows.filter((r) => (r.phone || "").includes(phoneQ));
    if (minCoins)        rows = rows.filter((r) => Number(r.coins) >= Number(minCoins));
    if (status !== "all")rows = rows.filter((r) => r.login.toLowerCase().includes(status));
    if (type !== "all")  rows = rows.filter((r) => r.subscription.toLowerCase().includes(type));
    // placeholders for pincode/address filters
    (pincodeQ, addrQ); // no-ops for now
    return rows;
  }, [tab, emailQ, phoneQ, pincodeQ, addrQ, minCoins, status, type]);

  const handleReset = () => {
    setEmailQ(""); setPhoneQ(""); setPincodeQ(""); setAddrQ("");
    setMinCoins(""); setStatus("all"); setType("all");
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Email","Phone","Subscription Type","Supercoins Balance",
      "Login Status","Created At","Updated At","Pincodes","ID Transfer Warning",
    ];
    const csv = [
      headers,
      ...filtered.map((r) => [
        r.email, r.phone, r.subscription, r.coins, r.login,
        r.createdAt, r.updatedAt, r.pincodes, r.warning,
      ]),
    ]
      .map((row) =>
        row
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
    a.download = "accounts.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
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
                <ServerCog className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  Platform Accounts & Configs
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Showing {filtered.length} of {DEMO.length} accounts
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

          {/* Tabs under the title (keeps your existing component) */}
          <div className="mt-4">
            <PlatformTabs tab={tab} setTab={setTab} />
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
              <ColumnsIcon className="h-4 w-4" />
              <span className="hidden md:inline">Columns</span>
            </button>

            <div className="h-6 w-px bg-gray-300 mx-1 hidden lg:block" />

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm group"
            >
              <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Download CSV</span>
            </button>
          </div>
        </div>

        {/* Filters (Accounts tab only) */}
        {tab === "accounts" && (
          <div className="px-6 py-5 border-b-2 border-gray-200">
            <AccountsFilters
              values={{ emailQ, phoneQ, pincodeQ, addrQ, minCoins, status, type }}
              onChange={{ setEmailQ, setPhoneQ, setPincodeQ, setAddrQ, setMinCoins, setStatus, setType }}
              onReset={handleReset}
              onApply={() => { /* hook API later */ }}
            />
          </div>
        )}

        {/* Table */}
        <div className="px-6 pb-6">
          <div className="mt-5 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
            {tab === "accounts" ? (
              <AccountsTable rows={filtered} />
            ) : (
              <div className="py-16 text-center text-sm text-gray-600">
                {tab === "addresses" ? "Addresses" : "GSTs"} view will go here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
