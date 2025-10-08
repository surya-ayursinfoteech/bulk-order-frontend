import { Upload, FileDown, CreditCard, Building2, Shield, Sparkles } from "lucide-react";

export default function CardsSection({
  cardType,
  setCardType,
  corporateId,
  setCorporateId,
  authType,
  setAuthType,
}) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center gap-2 bg-white rounded-t-2xl">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold text-sm shadow-md">
          3
        </div>
        <h3 className="text-base font-bold text-gray-900">Card Configuration</h3>
      </header>

      <div className="p-6 space-y-5">
        {/* 3 columns with icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card Type */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                <CreditCard className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
              </div>
              Card Type
              <span className="text-red-500">*</span>
            </label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option>HDFC_VIRTUAL</option>
              <option>ICICI_VIRTUAL</option>
              <option>AXIS_VIRTUAL</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              Select virtual card provider
            </p>
          </div>

          {/* Corporate ID */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                <Building2 className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
              </div>
              Corporate ID
              <span className="text-red-500">*</span>
            </label>
            <select
              value={corporateId}
              onChange={(e) => setCorporateId(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option value="MYFRIE">MYFRIE</option>
              <option value="CORP_X1">CORP_X1</option>
              <option value="ACME_CORP">ACME_CORP</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              Corporate account identifier
            </p>
          </div>

          {/* Authentication */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
              <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                <Shield className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
              </div>
              Authentication
              <span className="text-red-500">*</span>
            </label>
            <select
              value={authType}
              onChange={(e) => setAuthType(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option>Password</option>
              <option>OTP</option>
              <option>PIN</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              Verification method for cards
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
            <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
              <Upload className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
            </div>
            Upload Cards CSV
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
            <div className="p-1 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
              <FileDown className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
            </div>
            Download Template
          </button>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2.5">
          <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-blue-900">
              <strong>Tip:</strong> Upload a CSV file with card details or download the template to see the required format.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}