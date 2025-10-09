import { Link2, CreditCard, Check, Hash, Boxes, X, Sparkles, AlertCircle } from "lucide-react";

const isValidProductUrl = (url) =>
  /^https?:\/\/(www\.)?(flipkart\.com|shopsy\.in)\/.+/i.test(url || "");

export default function ProductSelector({
  productUrl,
  setProductUrl,
  showQtyFields,
  totalQty,
  setTotalQty,
  qtyPerOrder,
  setQtyPerOrder,
  preview,
}) {
  const valid = isValidProductUrl(productUrl);
  const showError = productUrl && !valid;

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center gap-2 bg-white rounded-t-2xl">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold text-sm shadow-md">
          1
        </div>
        <h3 className="text-base font-bold text-gray-900">Product Selection</h3>
      </header>

      <div className="p-6 space-y-5">
        {/* Product URL ONLY */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Link2 className="h-4 w-4" />
            Product URL (Flipkart/Shopsy)
          </label>
          <div className="relative group">
            <input
              type="url"
              placeholder="Paste Flipkart or Shopsy product URL"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm focus:ring-4 transition-all duration-200 hover:border-gray-300
                ${productUrl ? (valid ? "border-gray-200 focus:border-gray-900 focus:ring-gray-900/10" : "border-rose-300 focus:border-rose-400 focus:ring-rose-400/15") : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/10"}`}
            />
            {productUrl && (
              <button
                type="button"
                onClick={() => setProductUrl("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                aria-label="Clear URL"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {showError ? (
            <div className="flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-200 px-3 py-2">
              <AlertCircle className="h-3.5 w-3.5 text-rose-600 mt-0.5" />
              <p className="text-xs text-rose-700">
                Please paste a valid Flipkart/Shopsy product page URL (not a search or homepage).
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-900">
                <strong>Tip:</strong> After pasting a product link, enter quantities below to continue.
              </p>
            </div>
          )}
        </div>

        {/* Selected product chip */}
        {preview && valid && (
          <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-md">
              <CreditCard className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{preview.name}</p>
              <p className="text-xs text-gray-500">Product from URL</p>
            </div>
            <Check className="h-5 w-5 text-green-600" />
          </div>
        )}

        {/* Quantities */}
        {showQtyFields && valid && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <Boxes className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                Total Quantity
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
                value={totalQty}
                onChange={(e) => setTotalQty(e.target.value)}
                placeholder="e.g., 100"
              />
              <p className="mt-2 text-xs text-gray-500">Total units to order</p>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200">
                  <Hash className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                Quantity Per Order
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 focus:bg-white transition-all duration-200"
                value={qtyPerOrder}
                onChange={(e) => setQtyPerOrder(e.target.value)}
                placeholder="e.g., 10"
              />
              <p className="mt-2 text-xs text-gray-500">Units per individual order</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
