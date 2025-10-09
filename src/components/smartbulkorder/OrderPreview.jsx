import {
  CheckCircle2,
  XCircle,
  Boxes,
  Hash,
  Sparkles,
  MapPin,
  Inbox,
  CreditCard,
  ShoppingCart,
  DollarSign,
  Calendar,
  Gift,
  BadgePercent,
  FileText,
  ExternalLink
} from "lucide-react";

export default function OrderPreview({
  preview,
  totalUnits,
  unitsPerOrder,
  /* uploads */
  emailsCount = 0,
  cardsCount = 0,
  /* order details (minimal set) */
  cartLimit,
  finalLimit,
  maxDays,
  deliveryAddress,
  gstNumber,
  couponCodes,
  rewardIds,
}) {
  return (
    <div className="space-y-6">
      {/* ---------- Product ---------- */}
      <SectionTitle icon={<Sparkles className="h-4 w-4 text-gray-900" />} title="Product Details" />
      <Card>
        {preview ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-gray-900 leading-snug truncate">
                  {preview.name}
                </p>
                {/* Optional: link back to the original URL if present in name meta */}
                {preview.url && (
                  <a
                    href={preview.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-gray-900"
                    title="Open product page"
                  >
                    View product <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <Pill positive={!!preview.stock}>
                {preview.stock ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" /> In Stock
                  </>
                ) : (
                  <>
                    <XCircle className="h-3.5 w-3.5" /> Out of Stock
                  </>
                )}
              </Pill>
            </div>
          </>
        ) : (
          <SkeletonProduct />
        )}
      </Card>

      {/* ---------- Totals ---------- */}
      <div className="grid grid-cols-2 gap-4">
        <Stat title="Total Units" value={totalUnits || 0} icon={<Boxes className="h-5 w-5" />} />
        <Stat title="Per Order" value={unitsPerOrder || 0} icon={<Hash className="h-5 w-5" />} />
      </div>

      {/* ---------- Uploads Summary ---------- */}
      <SectionTitle icon={<Inbox className="h-4 w-4 text-gray-900" />} title="Uploads Summary" />
      <Card>
        <Row
          icon={<Inbox className="h-5 w-5 text-gray-700" />}
          label="Email IDs CSV"
          value={<Badge>{emailsCount} uploaded</Badge>}
        />
        <Divider />
        <Row
          icon={<CreditCard className="h-5 w-5 text-gray-700" />}
          label="Cards CSV"
          value={<Badge>{cardsCount} uploaded</Badge>}
        />
      </Card>

      {/* ---------- Order Details ---------- */}
      <SectionTitle icon={<ShoppingCart className="h-4 w-4 text-gray-900" />} title="Order Details" />
      <Card>
        <Row
          icon={<ShoppingCart className="h-5 w-5 text-gray-700" />}
          label="Cart Amount Limit"
          value={<Mono>{cartLimit || "—"}</Mono>}
        />
        <Divider />
        <Row
          icon={<DollarSign className="h-5 w-5 text-gray-700" />}
          label="Final Amount Limit"
          value={<Mono>{finalLimit || "—"}</Mono>}
        />
        <Divider />
        <Row
          icon={<Calendar className="h-5 w-5 text-gray-700" />}
          label="Max Delivery Days"
          value={<Mono>{maxDays || "—"}</Mono>}
        />
        <Divider />
        <Row
          icon={<MapPin className="h-5 w-5 text-gray-700" />}
          label="Delivery Address"
          value={<span className="text-sm font-semibold text-gray-900">{deliveryAddress || "—"}</span>}
        />
        <Divider />
        <Row
          icon={<FileText className="h-5 w-5 text-gray-700" />}
          label="GST Details"
          value={<Mono>{gstNumber || "—"}</Mono>}
        />
        <Divider />
        <Row
          icon={<BadgePercent className="h-5 w-5 text-gray-700" />}
          label="Coupon Codes"
          value={<span className="text-sm font-semibold text-gray-900">{couponCodes || "—"}</span>}
        />
        <Divider />
        <Row
          icon={<Gift className="h-5 w-5 text-gray-700" />}
          label="Reward IDs"
          value={<span className="text-sm font-semibold text-gray-900">{rewardIds || "—"}</span>}
        />
      </Card>
    </div>
  );
}

/* ----------------- UI bits ----------------- */
function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</p>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="relative rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-900/5 to-transparent rounded-bl-full" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="relative rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 to-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">{title}</p>
          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300">
            <span className="text-gray-600 group-hover:text-white transition-colors duration-300">
              {icon}
            </span>
          </div>
        </div>
        <p className="text-3xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}

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

function Divider() {
  return <div className="my-2 border-t border-gray-200" />;
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-800 ring-1 ring-gray-200">
      {children}
    </span>
  );
}

function Mono({ children }) {
  return <span className="text-sm font-mono font-semibold text-gray-900">{children}</span>;
}

function Pill({ children, positive }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
        positive
          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
          : "bg-gradient-to-r from-rose-500 to-red-600 text-white"
      }`}
    >
      {children}
    </span>
  );
}

function SkeletonProduct() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
      <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
    </div>
  );
}
