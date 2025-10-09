// src/components/smartbulkorder/EmailIds.jsx
import { useRef, useState } from "react";
import { Upload, FileDown, Inbox, AlertCircle, X } from "lucide-react";

const EMAIL_HEADERS = [
  "EMAIL_ID",
  "EMAIL_PASSWORD",
  "MOBILE_NUMBER",
  "STATUS",
  "DELIVERY_ADDRESS",
];

const MAX_ROWS = 10000;             // safety cap
const MAX_BYTES = 5 * 1024 * 1024;  // 5MB

export default function EmailIds({ onUpload, count = 0 }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [rowErrors, setRowErrors] = useState([]);

  // Split respecting quotes; supports comma or tab as delimiters
  const splitSmart = (line) => {
    const out = [];
    let cur = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];

      if (ch === '"') {
        const next = line[i + 1];
        if (inQuotes && next === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (!inQuotes && (ch === "," || ch === "\t")) {
        out.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur.trim());
    return out;
  };

  const normalize = (s) => s.replace(/\uFEFF/g, "").trim(); // strip BOM + trim

  const validateHeaders = (rawHeaderLine) => {
    const headers = splitSmart(rawHeaderLine).map((h) => normalize(h).toUpperCase());
    const missing = EMAIL_HEADERS.filter((h) => !headers.includes(h));
    if (missing.length) {
      return {
        ok: false,
        msg:
          "Invalid CSV header. Missing columns: " +
          missing.join(", ") +
          ". Expected: " +
          EMAIL_HEADERS.join(", "),
      };
    }
    return { ok: true, headers };
  };

  const validateRow = (cols, idx1) => {
    const errs = [];
    // EMAIL_ID
    const email = cols[0] || "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.push(`Row ${idx1}: EMAIL_ID "${email}" is not valid`);
    }
    // EMAIL_PASSWORD
    if (!cols[1]) errs.push(`Row ${idx1}: EMAIL_PASSWORD is empty`);
    // MOBILE_NUMBER (string to preserve leading zeros)
    const phone = String(cols[2] || "");
    if (!/^\d{7,15}$/.test(phone)) {
      errs.push(`Row ${idx1}: MOBILE_NUMBER "${phone}" should be 7–15 digits`);
    }
    // STATUS
    const status = (cols[3] || "").toLowerCase();
    const okStatus = ["active", "inactive", "enabled", "disabled"].includes(status);
    if (!okStatus) {
      errs.push(
        `Row ${idx1}: STATUS "${cols[3] || ""}" should be Active/Inactive (Enabled/Disabled allowed)`
      );
    }
    // DELIVERY_ADDRESS
    if (!cols[4]) errs.push(`Row ${idx1}: DELIVERY_ADDRESS is empty`);

    return errs;
  };

  const parseCsv = (text) => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (!lines.length) {
      return { ok: false, msg: "Empty file." };
    }

    const headCheck = validateHeaders(lines[0]);
    if (!headCheck.ok) return headCheck;

    const rows = [];
    const rowErrs = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = splitSmart(lines[i]).map((c) => normalize(c));
      if (cols.length !== EMAIL_HEADERS.length) {
        return {
          ok: false,
          msg: `Row ${i + 1} has ${cols.length} columns, expected ${EMAIL_HEADERS.length}.`,
        };
      }

      const errs = validateRow(cols, i + 1);
      if (errs.length) rowErrs.push(...errs);

      rows.push(cols);
      if (rows.length > MAX_ROWS) {
        return { ok: false, msg: `Too many rows. Max allowed is ${MAX_ROWS}.` };
      }
    }

    if (!rows.length) {
      return { ok: false, msg: "No data rows found under the header." };
    }

    if (rowErrs.length) {
      return { ok: false, msg: rowErrs.slice(0, 8).join(" • "), rowErrs };
    }

    return { ok: true, rows };
  };

  const handlePick = async (file) => {
    setError("");
    setRowErrors([]);
    if (!file) return;

    if (file.size > MAX_BYTES) {
      setError(`File is too large. Max allowed is ${(MAX_BYTES / (1024 * 1024)).toFixed(0)} MB.`);
      onUpload?.({ rows: [], file: null });
      return;
    }

    setFileName(file.name);

    try {
      const text = await file.text();
      const result = parseCsv(text);
      if (!result.ok) {
        setError(result.msg || "Invalid CSV.");
        setRowErrors(result.rowErrs || []);
        onUpload?.({ rows: [], file: null }); // reset parent
        return;
      }
      onUpload?.({ rows: result.rows, file }); // <-- send rows + File
    } catch {
      setError("Failed to read file. Please try again.");
      onUpload?.({ rows: [], file: null });
    }
  };

  const downloadTemplate = () => {
    const header = EMAIL_HEADERS.join(",");
    const sample = [
      "manish.kanyal.70@gmail.com,1234,7906563132,Active,HALDWANI",
      "manish.kanyal.71@gmail.com,1234,7906563132,Active,HALDWANI",
      "manish.kanyal.72@gmail.com,1234,7906563132,Active,HALDWANI",
      "manish.kanyal.73@gmail.com,1234,7906563132,Active,HALDWANI",
      "manish.kanyal.74@gmail.com,1234,7906563132,Active,HALDWANI",
    ].join("\n");

    const csv = `${header}\n${sample}\n`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email_ids_template.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFileName("");
    setError("");
    setRowErrors([]);
    if (inputRef.current) inputRef.current.value = "";
    onUpload?.({ rows: [], file: null });
  };

  return (
    <section className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
      <header className="px-6 py-4 border-b-2 border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 grid place-items-center rounded-lg bg-gray-900 text-white text-sm font-bold">
            2
          </div>
          <h3 className="text-base font-bold text-gray-900">Email IDs (CSV)</h3>
        </div>
        <div className="text-xs text-gray-600 flex items-center gap-2">
          <Inbox className="h-4 w-4 text-gray-400" />
          {count} uploaded
        </div>
      </header>

      <div className="p-6 space-y-3">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.tsv,text/csv,text/tab-separated-values"
            className="hidden"
            onChange={(e) => handlePick(e.target.files?.[0])}
          />

          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Upload Email CSV
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

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
            <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5" />
            <div className="text-sm text-rose-700">
              <p className="font-semibold">Invalid CSV</p>
              <p className="mt-0.5">{error}</p>
              <p className="mt-1 text-xs text-rose-600/90">
                Expected columns: {EMAIL_HEADERS.join(", ")} (comma or tab separated).
              </p>
            </div>
          </div>
        )}

        {/* Optional: show first few row errors if many */}
        {rowErrors.length > 0 && (
          <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">
            <ul className="list-disc pl-5 space-y-1">
              {rowErrors.slice(0, 8).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
            {rowErrors.length > 8 && (
              <p className="mt-1 italic">…and {rowErrors.length - 8} more issue(s).</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
