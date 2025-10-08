import { 
  Gift, 
  BadgePercent, 
  ShoppingCart, 
  DollarSign, 
  Calendar, 
  MapPin, 
  FileText,
  Sparkles 
} from "lucide-react";

export default function OrderDetails({
  cartLimit,
  setCartLimit,
  finalLimit,
  setFinalLimit,
  maxDays,
  setMaxDays,
  deliveryAddress,
  setDeliveryAddress,
  gstNumber,
  setGstNumber,
  gstMandatory,
  setGstMandatory,
  rewardIds,
  setRewardIds,
  couponCodes,
  setCouponCodes,
}) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center gap-2 bg-white rounded-t-2xl">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold text-sm shadow-md">
          4
        </div>
        <h3 className="text-base font-bold text-gray-900">Order Details</h3>
      </header>

      <div className="p-6 space-y-6">
        {/* Limits and Delivery Days */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-4 w-4 text-gray-900" />
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Limits & Delivery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <ShoppingCart className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                Cart Amount Limit
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 50000"
                value={cartLimit}
                onChange={(e) => setCartLimit(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
              />
              <p className="mt-2 text-xs text-gray-500">Maximum cart value</p>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <DollarSign className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                Final Amount Limit
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 45000"
                value={finalLimit}
                onChange={(e) => setFinalLimit(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
              />
              <p className="mt-2 text-xs text-gray-500">After discounts applied</p>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <Calendar className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                Max Delivery Days
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 7"
                value={maxDays}
                onChange={(e) => setMaxDays(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
              />
              <p className="mt-2 text-xs text-gray-500">Expected delivery time</p>
            </div>
          </div>
        </div>

        {/* Address and GST */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-gray-900" />
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Address & GST
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <MapPin className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                Delivery Address
                <span className="text-red-500">*</span>
              </label>
              <select
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200 cursor-pointer"
              >
                <option>Demo Address 1</option>
                <option>Demo Address 2</option>
                <option>Office Address</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">Shipping destination</p>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <FileText className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                GST Details
              </label>
              <select
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200 cursor-pointer"
              >
                <option>GST Number 1</option>
                <option>GST Number 2</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">Tax identification number</p>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-bold text-gray-900">
                GST Mandatory
              </label>
              <button
                onClick={() => setGstMandatory(!gstMandatory)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 shadow-inner ${
                  gstMandatory ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    gstMandatory ? "translate-x-6" : "translate-x-1"
                  }`}
                >
                  {gstMandatory && (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                  )}
                </span>
              </button>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  gstMandatory
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {gstMandatory ? "On" : "Off"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-bold text-gray-900">
                Reward IDs
              </label>
              <button
                onClick={() => setRewardIds(!rewardIds)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 shadow-inner ${
                  rewardIds ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    rewardIds ? "translate-x-6" : "translate-x-1"
                  }`}
                >
                  {rewardIds && (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                  )}
                </span>
              </button>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  rewardIds
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {rewardIds ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>

        {/* Coupon Code and Rewards */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BadgePercent className="h-4 w-4 text-gray-900" />
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Promotions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <BadgePercent className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                Coupon Codes
              </label>
              <input
                type="text"
                placeholder="Enter coupon codes..."
                value={couponCodes}
                onChange={(e) => setCouponCodes(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
              />
              <p className="mt-2 text-xs text-gray-500">Apply discount coupons</p>
            </div>

            <div className={`rounded-xl border-2 bg-white p-4 shadow-sm transition-all duration-200 ${
              rewardIds 
                ? "border-gray-200 hover:shadow-md hover:border-gray-300" 
                : "border-gray-100 opacity-60"
            }`}>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <div className={`p-1.5 rounded-lg transition-colors duration-200 ${
                  rewardIds ? "bg-gray-100" : "bg-gray-50"
                }`}>
                  <Gift className={`h-4 w-4 transition-colors duration-200 ${
                    rewardIds ? "text-gray-600" : "text-gray-400"
                  }`} />
                </div>
                Reward IDs
                {!rewardIds && (
                  <span className="text-xs font-semibold text-gray-500">(Enable above)</span>
                )}
              </label>
              <input
                type="text"
                placeholder="Enter reward IDs..."
                disabled={!rewardIds}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
              <p className="mt-2 text-xs text-gray-500">Apply reward points</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2.5">
          <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-blue-900">
              <strong>Note:</strong> All limit amounts are in INR (₹). Ensure the final amount limit accounts for applicable discounts and taxes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}