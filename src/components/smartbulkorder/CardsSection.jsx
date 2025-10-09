// Only change from your last version: send { rows, file } to parent
import { useRef, useState } from "react";
import { Upload, FileDown, CreditCard, AlertCircle, X } from "lucide-react";

const CARD_HEADERS = [
  "CARD_NUMBER",
  "NAME_ON_CARD",
  "EXPIRY_MONTH",
  "EXPIRY_YEAR",
  "CVV",
  "MOBILE_NUMBER",
  "CARD_CATEGORY",
  "SECRET",
  "AUTH_TYPE",
];

export default function CardsSection({ onUpload, count = 0 }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const splitRow = (line) => line.split(/,|\t/).map((s) => s.trim());

  const validateHeaders = (rawHeaderLine) => {
    const headers = splitRow(rawHeaderLine)
      .map((h) => h.replace(/\uFEFF/g, "").toUpperCase());
    const missing = CARD_HEADERS.filter((h) => !headers.includes(h));
    if (missing.length) {
      return {
        ok: false,
        msg:
          "Invalid CSV header. Missing columns: " +
          missing.join(", ") +
          ". Expected: " +
          CARD_HEADERS.join(", "),
      };
    }
    return { ok: true, headers };
  };

  const parseCsv = (text) => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (!lines.length) return { ok: false, msg: "Empty file." };

    const head = validateHeaders(lines[0]);
    if (!head.ok) return head;

    const headers = head.headers;
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = splitRow(lines[i]);
      if (cols.length !== headers.length) {
        return {
          ok: false,
          msg: `Row ${i + 1} has ${cols.length} columns, expected ${headers.length}.`,
        };
      }
      // basic checks
      const mm = Number(cols[headers.indexOf("EXPIRY_MONTH")]);
      if (!Number.isFinite(mm) || mm < 1 || mm > 12) {
        return { ok: false, msg: `Row ${i + 1}: EXPIRY_MONTH must be 1-12.` };
      }
      rows.push(cols);
    }
    if (!rows.length) return { ok: false, msg: "No data rows found." };
    return { ok: true, rows };
  };

  const handlePick = async (file) => {
    setError("");
    if (!file) return;
    setFileName(file.name);
    try {
      const text = await file.text();
      const res = parseCsv(text);
      if (!res.ok) {
        setError(res.msg);
        onUpload?.({ rows: [], file: null });
        return;
      }
      onUpload?.({ rows: res.rows, file });
    } catch {
      setError("Failed to read file. Please try again.");
      onUpload?.({ rows: [], file: null });
    }
  };

  const downloadTemplate = () => {
    const header = CARD_HEADERS.join(",");
    const sample = [
      "76651200000000,MANISH,1,26,200,7906492132,RUPAY,1234,OAUTH",
      "86651200000000,WASHID,2,27,333,7906492132,RUPAY,1234,OAUTH",
      "96651200000000,TONIMESH,3,27,444,7906492132,RUPAY,1234,OAUTH",
      "66651200000000,SHUBHAM,4,28,555,7906492132,RUPAY,1234,OAUTH",
      "56651200000000,ARPIT,5,28,666,7906492132,RUPAY,1234,OAUTH",
    ].join("\n");

    const csv = `${header}\n${sample}\n`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cards_template.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFileName("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
    onUpload?.({ rows: [], file: null });
  };

  return (
    <section className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 grid place-items-center rounded-lg bg-gray-900 text-white text-sm font-bold">
            3
          </div>
          <h3 className="text-base font-bold text-gray-900">Cards (CSV)</h3>
        </div>
        <div className="text-xs text-gray-600 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-gray-400" />
          {count} uploaded
        </div>
      </header>

      <div className="p-6 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => handlePick(e.target.files?.[0])}
          />

          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Upload Cards CSV
          </button>

          <button
            onClick={downloadTemplate}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            <FileDown className="h-4 w-4" />
            Download Template
          </button>

          {fileName && (
            <span className="inline-flex items-center gap-2 text-xs text-gray-600">
              Selected: <span className="font-medium text-gray-800">{fileName}</span>
              <button
                onClick={clearFile}
                className="inline-flex items-center justify-center h-5 w-5 rounded-md hover:bg-gray-100"
                aria-label="Clear selected file"
                title="Clear"
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </button>
            </span>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
            <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5" />
            <div className="text-sm text-rose-700">
              <p className="font-semibold">Invalid CSV</p>
              <p className="mt-0.5">{error}</p>
              <p className="mt-1 text-xs text-rose-600/90">
                Expected: {CARD_HEADERS.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
