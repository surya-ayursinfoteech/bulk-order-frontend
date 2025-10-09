import { useMemo, useState } from "react";
import { Shield, Sparkles, CheckCircle } from "lucide-react";

/* sections */
import ProductSelector from "../components/smartbulkorder/ProductSelector";
import EmailIds from "../components/smartbulkorder/EmailIds";
import CardsSection from "../components/smartbulkorder/CardsSection";
import OrderPreview from "../components/smartbulkorder/OrderPreview";
import OrderDetails from "../components/smartbulkorder/OrderDetails";
import ConfirmModal from "../components/smartbulkorder/ConfirmModal";

/* utils */
import { friendlyNameFromUrl } from "../components/smartbulkorder/utils";
import { sendBulkOrder } from "../services/BulkOrderService";

/* service */


const isValidProductUrl = (url) =>
  /^https?:\/\/(www\.)?(flipkart\.com|shopsy\.in)\/.+/i.test(url || "");

export default function SmartBulkOrder() {
  const [productUrl, setProductUrl] = useState("");

  /* quantities */
  const [totalQty, setTotalQty] = useState("");
  const [qtyPerOrder, setQtyPerOrder] = useState("");

  /* uploads */
  const [emailsData, setEmailsData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [emailFile, setEmailFile] = useState(null);
  const [cardFile, setCardFile] = useState(null);

  /* minimal order details */
  const [cartLimit, setCartLimit] = useState("");
  const [finalLimit, setFinalLimit] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [couponCodes, setCouponCodes] = useState("");
  const [rewardIds, setRewardIds] = useState("");

  /* modal + submit state */
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPayload, setConfirmPayload] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // {ok, status, data|error}

  const showQtyFields = isValidProductUrl(productUrl);

  const preview = useMemo(() => {
    if (!productUrl) return null;
    return {
      id: "from-url",
      name: friendlyNameFromUrl(productUrl),
      url: productUrl,
      stock: true,
    };
  }, [productUrl]);

  const totalUnits = Number(totalQty || 0);
  const unitsPerOrder = Number(qtyPerOrder || 0);

  const handleOpenConfirm = () => {
    if (!preview || !showQtyFields) return;

    const request = {
      product_url: productUrl,
      total_quantity: totalUnits,
      quantity_per_order: unitsPerOrder,
      platform: "Flipkart",
      order_status: "In_Progress",
      cart_amount_limit: Number(cartLimit || 0),
      final_amount_limit: Number(finalLimit || 0),
      max_delivery_days: Number(maxDays || 0),
      delivery_address: (deliveryAddress || "").trim(),
      gst_details: (gstNumber || "").trim(),
      coupon_codes: (couponCodes || "").trim(),
      reward_ids: (rewardIds || "").trim(),
    };

    setSubmitResult(null);
    setConfirmPayload({
      request,
      files: {
        cardFile: cardFile ? cardFile.name : null,
        userFile: emailFile ? emailFile.name : null,
      },
      counts: {
        emails: emailsData.length,
        cards: cardsData.length,
      },
    });

    setConfirmOpen(true);
  };

  const handleFinalSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const form = new FormData();

      if (cardFile) form.append("cardFile", cardFile);
      if (emailFile) form.append("userFile", emailFile);

      // IMPORTANT: attach request as JSON Blob so it's sent as type=application/json (like your curl)
      const req = {
        product_url: productUrl,
        total_quantity: totalUnits,
        quantity_per_order: unitsPerOrder,
        platform: "Flipkart",
        order_status: "In_Progress",
        cart_amount_limit: Number(cartLimit || 0),
        final_amount_limit: Number(finalLimit || 0),
        max_delivery_days: Number(maxDays || 0),
        delivery_address: (deliveryAddress || "").trim(),
        gst_details: (gstNumber || "").trim(),
        coupon_codes: (couponCodes || "").trim(),
        reward_ids: (rewardIds || "").trim(),
      };
      form.append("request", new Blob([JSON.stringify(req)], { type: "application/json" }));

      const result = await sendBulkOrder(form);
      setSubmitResult(result);

      // auto-close on success after a short delay (optional)
      if (result.ok) {
        setTimeout(() => {
          setConfirmOpen(false);
        }, 1200);
      }
    } catch (e) {
      setSubmitResult({ ok: false, status: 0, error: e?.message || "Unexpected error" });
    } finally {
      setSubmitting(false);
    }
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

      {/* Content */}
      <div className="w-full px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: form stack */}
        <div className="lg:col-span-2 space-y-6">
          <ProductSelector
            productUrl={productUrl}
            setProductUrl={setProductUrl}
            showQtyFields={showQtyFields}
            totalQty={totalQty}
            setTotalQty={setTotalQty}
            qtyPerOrder={qtyPerOrder}
            setQtyPerOrder={setQtyPerOrder}
            preview={preview}
          />

          {/* Email CSV */}
          <EmailIds
            onUpload={(payload) => {
              if (Array.isArray(payload)) {
                setEmailsData(payload);
                setEmailFile(null);
              } else {
                setEmailsData(payload?.rows || []);
                setEmailFile(payload?.file || null);
              }
            }}
            count={emailsData.length}
          />

          {/* Cards CSV */}
          <CardsSection
            onUpload={(payload) => {
              if (Array.isArray(payload)) {
                setCardsData(payload);
                setCardFile(null);
              } else {
                setCardsData(payload?.rows || []);
                setCardFile(payload?.file || null);
              }
            }}
            count={cardsData.length}
          />

          {/* Order details */}
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
            couponCodes={couponCodes}
            setCouponCodes={setCouponCodes}
            rewardIds={rewardIds}
            setRewardIds={setRewardIds}
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
                emailsCount={emailsData.length}
                cardsCount={cardsData.length}
                cartLimit={cartLimit}
                finalLimit={finalLimit}
                maxDays={maxDays}
                deliveryAddress={deliveryAddress}
                gstNumber={gstNumber}
                couponCodes={couponCodes}
                rewardIds={rewardIds}
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
                    Paste a product URL to see the preview
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
        submitting={submitting}
        submitResult={submitResult}
      />
    </div>
  );
}
