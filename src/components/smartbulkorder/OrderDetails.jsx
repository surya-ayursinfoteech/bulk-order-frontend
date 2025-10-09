// src/components/smartbulkorder/OrderDetails.jsx
import { ShoppingCart, DollarSign, Calendar, MapPin, FileText, BadgePercent, Gift } from "lucide-react";

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
  couponCodes,
  setCouponCodes,
  rewardIds,
  setRewardIds,
}) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center gap-2 bg-white rounded-t-2xl">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold text-sm shadow-md">
          4
        </div>
        <h3 className="text-base font-bold text-gray-900">Order Details</h3>
      </header>

      <div className="p-6 space-y-6">
        {/* Row: numeric limits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FieldCard
            icon={<ShoppingCart className="h-4 w-4 text-gray-600" />}
            label="Cart Amount Limit"
          >
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g., 50000"
              value={cartLimit}
              onChange={(e) => setCartLimit(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500">Maximum cart value (₹)</p>
          </FieldCard>

          <FieldCard
            icon={<DollarSign className="h-4 w-4 text-gray-600" />}
            label="Final Amount Limit"
          >
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g., 45000"
              value={finalLimit}
              onChange={(e) => setFinalLimit(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500">After discounts (₹)</p>
          </FieldCard>

          <FieldCard
            icon={<Calendar className="h-4 w-4 text-gray-600" />}
            label="Max Delivery Days"
          >
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g., 7"
              value={maxDays}
              onChange={(e) => setMaxDays(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500">Expected delivery time</p>
          </FieldCard>
        </div>

        {/* Row: address & GST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldCard
            icon={<MapPin className="h-4 w-4 text-gray-600" />}
            label="Delivery Address"
          >
            <textarea
              rows={3}
              placeholder="Enter full delivery address..."
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500">Shipping destination</p>
          </FieldCard>

          <FieldCard
            icon={<FileText className="h-4 w-4 text-gray-600" />}
            label="GST Details"
          >
            <input
              type="text"
              placeholder="Enter GST number..."
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500">Tax identification number</p>
          </FieldCard>
        </div>

        {/* Row: promo inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldCard
            icon={<BadgePercent className="h-4 w-4 text-gray-600" />}
            label="Coupon Codes"
          >
            <input
              type="text"
              placeholder="e.g., SAVE10, FESTIVE25"
              value={couponCodes}
              onChange={(e) => setCouponCodes(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500">Comma-separated if multiple</p>
          </FieldCard>

          <FieldCard
            icon={<Gift className="h-4 w-4 text-gray-600" />}
            label="Reward IDs"
          >
            <input
              type="text"
              placeholder="Enter reward IDs…"
              value={rewardIds || ""}
              onChange={(e) => setRewardIds(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500">Space or comma-separated</p>
          </FieldCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small subcomponent for consistent cards ---------- */
function FieldCard({ icon, label, children }) {
  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
        <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
          <span className="text-gray-600 group-hover:text-white transition-colors duration-200">
            {icon}
          </span>
        </div>
        {label}
      </label>
      {children}
    </div>
  );
}
