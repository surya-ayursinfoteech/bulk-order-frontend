import { X, CheckCircle2, CreditCard, Mail, ClipboardList } from "lucide-react";

export default function ConfirmModal({ open, payload, onCancel, onFinalSubmit }) {
  if (!open || !payload) return null;

  const { product, quantities, email, cards, orderDetails, deliveryBilling } = payload;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
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
              className="p-1 rounded-md hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* body */}
          <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-5">
            {/* Product */}
            <section className="rounded-lg border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Product</p>
              <p className="text-sm font-medium text-gray-900">{product?.name}</p>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p>{(product?.tags && product.tags.join(" • ")) || "—"}</p>
                <p>
                  {product?.color} • {product?.capacity}
                </p>
                <p className={product?.stock ? "text-emerald-600" : "text-red-600"}>
                  {product?.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </section>

            {/* Quantities */}
            <section className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-gray-200 p-3">
                <p className="text-gray-500">Total Quantity</p>
                <p className="font-semibold text-gray-900">{quantities?.totalQty || 0}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <p className="text-gray-500">Quantity / Order</p>
                <p className="font-semibold text-gray-900">{quantities?.qtyPerOrder || 0}</p>
              </div>
            </section>

            {/* Cards + Email */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <CreditCard className="w-4 h-4" /> Cards
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Card Type:</span>
                    <span className="font-medium text-gray-900">{cards?.cardType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Auth:</span>
                    <span className="font-medium text-gray-900">{cards?.authType}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
                  <Mail className="w-4 h-4" /> Email IDs
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Smart ID:</span>
                    <span className="font-medium text-gray-900">
                      {email?.smartId ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Retry / ID:</span>
                    <span className="font-medium text-gray-900">{email?.retryPerId || 0}</span>
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
                <div className="space-y-1">
                  <p className="text-gray-600">Cart Amount Limit</p>
                  <p className="font-medium text-gray-900">{orderDetails?.cartLimit || 0}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600">Final Amount Limit</p>
                  <p className="font-medium text-gray-900">{orderDetails?.finalLimit || 0}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600">Max Delivery Days</p>
                  <p className="font-medium text-gray-900">{orderDetails?.maxDays || 0}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                <div className="space-y-1">
                  <p className="text-gray-600">Delivery Address</p>
                  <p className="font-medium text-gray-900">
                    {orderDetails?.deliveryAddress || "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600">GST Details</p>
                  <p className="font-medium text-gray-900">{orderDetails?.gstNumber || "—"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                <div className="space-y-1">
                  <p className="text-gray-600">GST Mandatory</p>
                  <p className="font-medium text-gray-900">
                    {orderDetails?.gstMandatory ? "Yes" : "No"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600">Reward IDs</p>
                  <p className="font-medium text-gray-900">
                    {orderDetails?.rewardIds ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                <div className="space-y-1">
                  <p className="text-gray-600">Coupon Codes</p>
                  <p className="font-medium text-gray-900">
                    {orderDetails?.couponCodes || "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600">Delivery & Billing</p>
                  <p className="font-medium text-gray-900">{deliveryBilling?.company}</p>
                  <p className="text-gray-600">
                    {(deliveryBilling?.addressLines || []).join(", ")}
                  </p>
                  <p className="text-gray-600">{deliveryBilling?.gstin}</p>
                </div>
              </div>
            </section>
          </div>

          {/* footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-3 border-t">
            <button
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onFinalSubmit}
              className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800"
            >
              Final Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
