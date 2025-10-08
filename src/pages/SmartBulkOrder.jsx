// src/pages/SmartBulkOrder.jsx
import { useMemo, useState } from "react";
import { Shield, Sparkles, CheckCircle } from "lucide-react";

/* sections */
import ProductSelector from "../components/smartbulkorder/ProductSelector";
import EmailIds from "../components/smartbulkorder/EmailIds";
import CardsSection from "../components/smartbulkorder/CardsSection";
import OrderPreview from "../components/smartbulkorder/OrderPreview";
import OrderDetails from "../components/smartbulkorder/OrderDetails";
import ConfirmModal from "../components/smartbulkorder/ConfirmModal";

/* data & utils */
import { CATALOG } from "../components/smartbulkorder/catalog";
import { friendlyNameFromUrl } from "../components/smartbulkorder/utils";

export default function SmartBulkOrder() {
  /* ---------- Product selection ---------- */
  const [mode, setMode] = useState("url");
  const [productUrl, setProductUrl] = useState("");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState(null);
  const [showSuggest, setShowSuggest] = useState(false);

  /* ---------- Quantities ---------- */
  const [totalQty, setTotalQty] = useState("");
  const [qtyPerOrder, setQtyPerOrder] = useState("");

  /* ---------- Email IDs ---------- */
  const [smartId, setSmartId] = useState(true);
  const [retryPerId, setRetryPerId] = useState(0);

  /* ---------- Cards ---------- */
  const [cardType, setCardType] = useState("HDFC_VIRTUAL");
  const [authType, setAuthType] = useState("Password");
  const [corporateId, setCorporateId] = useState("MYFRIE");

  /* ---------- Order Details ---------- */
  const [cartLimit, setCartLimit] = useState("");
  const [finalLimit, setFinalLimit] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("Demo Address 1");
  const [gstNumber, setGstNumber] = useState("GST Number 1");
  const [gstMandatory, setGstMandatory] = useState(false);
  const [rewardIds, setRewardIds] = useState(false);
  const [couponCodes, setCouponCodes] = useState("");

  /* ---------- Modal ---------- */
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPayload, setConfirmPayload] = useState(null);

  /* ---------- Derived ---------- */
  const showQtyFields =
    (mode === "url" && productUrl.trim().length > 6) ||
    (mode === "search" && picked !== null);

  const suggestions = useMemo(() => {
    if (mode !== "search") return [];
    const q = (search || "").trim().toLowerCase();
    if (!q) return [];
    return CATALOG.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [mode, search]);

  const preview = useMemo(() => {
    if (picked) return picked;
    if (mode === "url" && productUrl) {
      return {
        id: "from-url",
        name: friendlyNameFromUrl(productUrl),
        price: 0,
        mrp: 0,
        tags: ["Product"],
        color: "—",
        capacity: "—",
        stock: true,
      };
    }
    return null;
  }, [picked, productUrl, mode]);

  const totalUnits = Number(totalQty || 0);
  const unitsPerOrder = Number(qtyPerOrder || 0);

  /* ---------- Submit -> open modal ---------- */
  const handleOpenConfirm = () => {
    if (!preview || !showQtyFields) return;

    const payload = {
      product: preview,
      selection: { mode, productUrl },
      quantities: { totalQty: totalUnits, qtyPerOrder: unitsPerOrder },
      email: { smartId, retryPerId: Number(retryPerId || 0) },
      cards: { cardType, authType, corporateId },
      orderDetails: {
        cartLimit: Number(cartLimit || 0),
        finalLimit: Number(finalLimit || 0),
        maxDays: Number(maxDays || 0),
        deliveryAddress,
        gstNumber,
        gstMandatory,
        rewardIds,
        couponCodes: (couponCodes || "").trim(),
      },
      deliveryBilling: {
        company: "Flightpath Infogain Private Limited",
        addressLines: [
          "Plot No. D-47",
          "Udyog Vihar, Phase-V",
          "Gurugram, Haryana – 122016",
        ],
        gstin: "06AAECF6022E1Z3",
      },
    };

    setConfirmPayload(payload);
    setConfirmOpen(true);
  };

  const handleFinalSubmit = () => {
    console.log("Final submit payload:", confirmPayload);
    setConfirmOpen(false);
    alert("Order placed successfully (demo). Check console for payload.");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white shadow-lg">
              <Sparkles className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Smart Bulk Order</h1>
              <p className="text-sm text-gray-300 mt-0.5">
                Configure and place bulk orders efficiently
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: form stack */}
        <div className="lg:col-span-2 space-y-6">
          <ProductSelector
            mode={mode}
            setMode={setMode}
            productUrl={productUrl}
            setProductUrl={setProductUrl}
            search={search}
            setSearch={setSearch}
            suggestions={suggestions}
            picked={picked}
            setPicked={setPicked}
            showSuggest={showSuggest}
            setShowSuggest={setShowSuggest}
            showQtyFields={showQtyFields}
            totalQty={totalQty}
            setTotalQty={setTotalQty}
            qtyPerOrder={qtyPerOrder}
            setQtyPerOrder={setQtyPerOrder}
            preview={preview}
          />

          <EmailIds
            smartId={smartId}
            setSmartId={setSmartId}
            retryPerId={retryPerId}
            setRetryPerId={setRetryPerId}
          />

          <CardsSection
            cardType={cardType}
            setCardType={setCardType}
            corporateId={corporateId}
            setCorporateId={setCorporateId}
            authType={authType}
            setAuthType={setAuthType}
          />

          <OrderDetails
            cartLimit={cartLimit}
            setCartLimit={setCartLimit}
            finalLimit={finalLimit}
            setFinalLimit={setFinalLimit}
            maxDays={maxDays}
            setMaxDays={setMaxDays}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            gstNumber={gstNumber}
            setGstNumber={setGstNumber}
            gstMandatory={gstMandatory}
            setGstMandatory={setGstMandatory}
            rewardIds={rewardIds}
            setRewardIds={setRewardIds}
            couponCodes={couponCodes}
            setCouponCodes={setCouponCodes}
          />
        </div>

        {/* RIGHT: sticky preview */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg">
            <header className="px-6 py-4 border-b-2 border-gray-200 bg-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">Order Preview</h3>
                {preview && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold shadow-sm">
                    <CheckCircle className="h-3 w-3" />
                    Ready
                  </span>
                )}
              </div>
            </header>

            <div className="p-6 space-y-5">
              <OrderPreview
                preview={preview}
                totalUnits={totalUnits}
                unitsPerOrder={unitsPerOrder}
                cardType={cardType}
                corporateId={corporateId}
                smartId={smartId}
              />

              <button
                onClick={handleOpenConfirm}
                disabled={!preview || !showQtyFields}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3.5 px-4 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 group"
              >
                <Shield className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                Submit Order
              </button>

              {!preview && (
                <div className="text-center p-4 rounded-lg bg-gray-100 border border-gray-200">
                  <p className="text-xs text-gray-600">
                    Select a product to see the preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        payload={confirmPayload}
        onCancel={() => setConfirmOpen(false)}
        onFinalSubmit={handleFinalSubmit}
      />
    </div>
  );
}