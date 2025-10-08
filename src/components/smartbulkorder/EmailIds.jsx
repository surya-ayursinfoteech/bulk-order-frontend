import { Mail, Upload, ChevronDown, RefreshCw, Sparkles } from "lucide-react";

export default function EmailIds({
  smartId,
  setSmartId,
  retryPerId,
  setRetryPerId,
}) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center gap-2 bg-white rounded-t-2xl">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold text-sm shadow-md">
          2
        </div>
        <h3 className="text-base font-bold text-gray-900">Email IDs</h3>
      </header>

      <div className="p-6 space-y-5">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
            <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
              <Mail className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
            </div>
            All Email IDs
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
            <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
              <Upload className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
            </div>
            Upload CSV
          </button>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Smart ID Toggle */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                  <Sparkles className="h-4 w-4 text-gray-600" />
                  Smart ID Selection
                </label>
                <p className="text-xs text-gray-500">
                  Automatically assign IDs to orders
                </p>
              </div>
              <button
                onClick={() => setSmartId(!smartId)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 shadow-inner ${
                  smartId ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gray-300"
                }`}
                aria-label="toggle smart id"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    smartId ? "translate-x-7" : "translate-x-1"
                  }`}
                >
                  {smartId && (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                  )}
                </span>
              </button>
            </div>
            
            {/* Status Badge */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                  smartId
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {smartId ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          {/* Retry Input */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                <RefreshCw className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
              </div>
              Retry per ID
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
              value={retryPerId}
              onChange={(e) => setRetryPerId(e.target.value)}
              placeholder="e.g., 3"
            />
            <p className="mt-2 text-xs text-gray-500">
              Number of retry attempts on failure
            </p>
          </div>
        </div>

        {/* Email Filters Accordion */}
        <button className="inline-flex items-center justify-between w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
            Email ID Filters
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-900 transition-all duration-200 group-hover:translate-y-0.5" />
        </button>

        {/* Info Box */}
        <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2.5">
          <Mail className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-blue-900">
              <strong>Note:</strong> Upload a CSV file with email addresses or select from your saved list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}