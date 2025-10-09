import {
  X,
  CheckCircle2,
  CreditCard,
  Mail,
  ClipboardList,
  Link as LinkIcon,
  Upload,
  Package2,
  Loader2,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function ConfirmModal({
  open,
  payload,
  onCancel,
  onFinalSubmit,
  submitting = false,
  submitResult = null,
}) {
  if (!open || !payload) return null;

  // Payload: { request, files: { cardFile, userFile }, counts: { emails, cards } }
  const { request = {}, files = {}, counts = {} } = payload;

  const {
    product_url = "",
    total_quantity = 0,
    quantity_per_order = 0,
    platform = "Flipkart",
    order_status = "In_Progress",
    cart_amount_limit = 0,
    final_amount_limit = 0,
    max_delivery_days = 0,
    delivery_address = "",
    gst_details = "",
    coupon_codes = "",
    reward_ids = "",
  } = request;

  const { cardFile = null, userFile = null } = files;
  const { cards = 0, emails = 0 } = counts;

  const success = submitResult?.ok;
  const failure = submitResult && !submitResult.ok;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!submitting ? onCancel : undefined}
        aria-hidden="true"
      />
      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-gray-200">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Review & Confirm
            </div>
            <button
              onClick={onCancel}
              disabled={submitting}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* body */}
          <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-5">
            {/* Product URL + Platform */}
            <section className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Product</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-600 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Product URL
                  </p>
                  <p className="font-medium text-gray-900 break-all">{product_url || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600 flex items-center gap-2">
                    <Package2 className="w-4 h-4" />
                    Platform / Status
                  </p>
                  <p className="font-medium text-gray-900">
                    {platform} • {order_status}
                  </p>
                </div>
              </div>
            </section>

            {/* Quantities */}
            <section className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-gray-200 p-3">
                <p className="text-gray-500">Total Quantity</p>
                <p className="font-semibold text-gray-900">{total_quantity || 0}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <p className="text-gray-500">Quantity / Order</p>
                <p className="font-semibold text-gray-900">{quantity_per_order || 0}</p>
              </div>
            </section>

            {/* Upload summaries */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <Mail className="w-4 h-4" /> Email CSV
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rows:</span>
                    <span className="font-medium text-gray-900">{emails}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Filename:</span>
                    <span className="font-medium text-gray-900 truncate max-w-[14rem]">
                      {userFile || "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <CreditCard className="w-4 h-4" /> Cards CSV
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rows:</span>
                    <span className="font-medium text-gray-900">{cards}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Filename:</span>
                    <span className="font-medium text-gray-900 truncate max-w-[14rem]">
                      {cardFile || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Details */}
            <section className="rounded-lg border border-gray-200 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                <ClipboardList className="w-4 h-4" /> Order Details
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <Detail label="Cart Amount Limit" value={cart_amount_limit || 0} />
                <Detail label="Final Amount Limit" value={final_amount_limit || 0} />
                <Detail label="Max Delivery Days" value={max_delivery_days || 0} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                <Detail label="Delivery Address" value={delivery_address || "—"} />
                <Detail label="GST Details" value={gst_details || "—"} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                <Detail label="Coupon Codes" value={coupon_codes || "—"} />
                <Detail label="Reward IDs" value={reward_ids || "—"} />
              </div>
            </section>

            {/* Result banner */}
            {submitting && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 flex items-center gap-2 text-sm text-gray-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting your order…
              </div>
            )}
            {success && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 flex items-center gap-2 text-sm text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                Order submitted successfully.
              </div>
            )}
            {failure && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 flex items-start gap-2 text-sm text-rose-700">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-semibold">Submission failed</p>
                  <p className="mt-0.5 break-words">
                    {submitResult?.error || "Unknown error"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-3 border-t">
            <button
              onClick={onCancel}
              disabled={submitting}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onFinalSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {submitting ? "Submitting…" : "Final Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-gray-600">{label}</p>
      <p className="font-medium text-gray-900 break-words">{String(value)}</p>
    </div>
  );
}
