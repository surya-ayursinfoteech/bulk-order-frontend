// src/components/smartbulkorder/OrderPreview.jsx
import {
  CreditCard,
  Building2,
  CheckCircle2,
  XCircle,
  Tag,
  Boxes,
  Hash,
  Sparkles,
  MapPin,
} from "lucide-react";

export default function OrderPreview({
  preview,
  totalUnits,
  unitsPerOrder,
  cardType,
  corporateId,
  smartId,
}) {
  const hasPrice = Number(preview?.price) > 0;
  const hasMrp = Number(preview?.mrp) > 0;
  const price = hasPrice ? Number(preview.price) : null;
  const mrp = hasMrp ? Number(preview.mrp) : null;
  const priceStr = hasPrice ? price.toLocaleString() : null;
  const mrpStr = hasMrp ? mrp.toLocaleString() : null;

  const discountPct =
    hasPrice && hasMrp && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : null;

  return (
    <div className="space-y-6">
      {/* ---------- Product ---------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gray-900" />
          <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Product Details
          </p>
        </div>

        <div className="relative rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm hover:shadow-md transition-all duration-300">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-900/5 to-transparent rounded-bl-full"></div>
          
          {preview ? (
            <>
              {/* Title & Stock */}
              <div className="flex items-start justify-between gap-4 relative">
                <p className="text-base font-bold text-gray-900 leading-snug flex-1">
                  {preview.name}
                </p>

                {/* Stock badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                    preview.stock
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                      : "bg-gradient-to-r from-rose-500 to-red-600 text-white"
                  }`}
                >
                  {preview.stock ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" />
                  )}
                  {preview.stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Price section */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {hasPrice ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2 rounded-xl shadow-lg">
                      <span className="text-lg font-black">₹{priceStr}</span>
                    </div>
                    {hasMrp && (
                      <span className="text-sm text-gray-400 line-through font-medium">
                        ₹{mrpStr}
                      </span>
                    )}
                    {discountPct ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-md">
                        <Tag className="h-3.5 w-3.5" />
                        {discountPct}% OFF
                      </span>
                    ) : null}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Price will appear after fetch
                  </p>
                )}
              </div>

              {/* Meta chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {(preview.tags || []).slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-semibold shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {t}
                  </span>
                ))}
                {preview.color && preview.color !== "—" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-semibold shadow-sm">
                    <span className="mr-1.5">🎨</span>
                    {preview.color}
                  </span>
                )}
                {preview.capacity && preview.capacity !== "—" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-semibold shadow-sm">
                    <span className="mr-1.5">📦</span>
                    {preview.capacity}
                  </span>
                )}
              </div>
            </>
          ) : (
            <SkeletonProduct />
          )}
        </div>
      </div>

      {/* ---------- Totals ---------- */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 to-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                Total Units
              </p>
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
                <Boxes className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900">
              {totalUnits || 0}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 to-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                Per Order
              </p>
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
                <Hash className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900">
              {unitsPerOrder || 0}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Order Details ---------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-gray-900" />
          <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Order Configuration
          </p>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm">
          <div className="space-y-3">
            <Row
              icon={<CreditCard className="h-5 w-5 text-gray-700" />}
              label="Card Type"
              value={cardType}
            />
            <div className="border-t border-gray-200"></div>
            <Row
              icon={<Building2 className="h-5 w-5 text-gray-700" />}
              label="Corporate ID"
              value={corporateId || "—"}
            />
            <div className="border-t border-gray-200"></div>
            <Row
              icon={<CheckCircle2 className="h-5 w-5 text-gray-700" />}
              label="Smart ID"
              value={
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                    smartId
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {smartId ? "Enabled" : "Disabled"}
                </span>
              }
            />
          </div>
        </div>
      </div>

      {/* ---------- Delivery & Billing ---------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-900" />
          <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Delivery & Billing
          </p>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-gray-900 shadow-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900 mb-2">
                Flightpath Infogain Private Limited
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Plot No. D-47</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Udyog Vihar, Phase-V</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Gurugram, Haryana – 122016</span>
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <span className="text-xs font-bold text-gray-600">GSTIN:</span>
                  <span className="text-xs font-mono font-semibold text-gray-900">
                    06AAECF6022E1Z3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- tiny subcomponents ----------------- */

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2.5 text-gray-700 font-medium">
        {icon}
        {label}
      </span>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

function SkeletonProduct() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
      <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded-lg w-24" />
        <div className="h-8 bg-gray-200 rounded-lg w-20" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-lg w-16" />
        <div className="h-6 bg-gray-200 rounded-lg w-20" />
        <div className="h-6 bg-gray-200 rounded-lg w-16" />
      </div>
    </div>
  );
}