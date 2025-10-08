// src/components/smartbulkorder/ProductSelector.jsx
import { Link2, Search, CreditCard, Check, Hash, Boxes, X, Sparkles } from "lucide-react";

export default function ProductSelector({
  mode,
  setMode,
  productUrl,
  setProductUrl,
  search,
  setSearch,
  suggestions,
  picked,
  setPicked,
  showSuggest,
  setShowSuggest,
  showQtyFields,
  totalQty,
  setTotalQty,
  qtyPerOrder,
  setQtyPerOrder,
  preview,
}) {
  const Tab = ({ isActive, onClick, icon: Icon, children }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300
        ${isActive 
          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-900/30" 
          : "text-gray-700 hover:bg-white hover:shadow-sm"}
      `}
    >
      <Icon className={`h-4 w-4 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
      {children}
    </button>
  );

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center gap-2 bg-white rounded-t-2xl">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold text-sm shadow-md">
          1
        </div>
        <h3 className="text-base font-bold text-gray-900">Product Selection</h3>
      </header>

      <div className="p-6 space-y-5">
        {/* Tabs */}
        <div className="inline-flex rounded-xl bg-gray-100 p-1.5 shadow-inner">
          <Tab
            isActive={mode === "url"}
            onClick={() => {
              setMode("url");
              setSearch("");
              setPicked(null);
              setShowSuggest(false);
            }}
            icon={Link2}
          >
            URL (flipkart/shopsy)
          </Tab>

          <Tab
            isActive={mode === "search"}
            onClick={() => {
              setMode("search");
              setProductUrl("");
              setShowSuggest(!!search);
            }}
            icon={Search}
          >
            Search (flipkart)
          </Tab>
        </div>

        {/* Bodies */}
        {mode === "url" ? (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Link2 className="h-4 w-4" />
              Product URL
            </label>
            <div className="relative group">
              <input
                type="url"
                placeholder="Paste flipkart/shopsy product URL"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 hover:border-gray-300"
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
            <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-900">
                <strong>Tip:</strong> You can paste any Flipkart or Shopsy product link.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Search className="h-4 w-4" />
              Search Product
            </label>
            <div className="relative">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  placeholder="Search mobiles, AC, refrigerator, etc."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPicked(null);
                    setShowSuggest(true);
                  }}
                  onFocus={() => setShowSuggest(!!search)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Suggestions */}
              {showSuggest && suggestions.length > 0 && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {suggestions.map((p, idx) => (
                    <button
                      key={p.id}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                        idx !== suggestions.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                      onClick={() => {
                        setPicked(p);
                        setSearch(p.name);
                        setShowSuggest(false);
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-gray-900 truncate flex-1">{p.name}</div>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-900 text-white text-[10px] font-bold whitespace-nowrap">
                          <Check className="h-3 w-3" />
                          Select
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">{p.tags.join(" • ")}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product chip - Enhanced */}
        {preview && (
          <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-md">
              <CreditCard className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{preview.name}</p>
              <p className="text-xs text-gray-500">Selected Product</p>
            </div>
            <Check className="h-5 w-5 text-green-600" />
          </div>
        )}

        {/* Quantities - Enhanced */}
        {showQtyFields && (
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