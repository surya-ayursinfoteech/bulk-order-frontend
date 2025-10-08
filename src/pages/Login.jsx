import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ShoppingCart } from "lucide-react";
import { loginApi } from "../services/AuthServices"; // 👈 import service

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // tiny client-side validation hints
  const emailErr = useMemo(() => {
    if (!email) return "";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email";
  }, [email]);

  const pwErr = useMemo(() => {
    if (!password) return "";
    return password.length >= 6 ? "" : "Minimum 6 characters";
  }, [password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (emailErr || pwErr) {
      setError("Please fix the highlighted fields");
      return;
    }

    setLoading(true);
    const result = await loginApi(email, password);
    setLoading(false);

    if (result.authenticated) {
      localStorage.setItem("bob_auth", "true");
      localStorage.setItem("bob_email", email);
      nav("/app", { replace: true });
    } else {
      setError(result?.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient & shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_10%_10%,#e5e7eb_0%,transparent_60%),radial-gradient(50%_50%_at_90%_90%,#e5e7eb_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute -top-44 -left-48 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-gray-900 to-gray-700 opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-gray-800 to-gray-500 opacity-10 blur-3xl" />

      <div className="relative grid min-h-screen place-items-center px-4 py-8">
        {/* Card */}
        <div className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white/80 shadow-xl backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 rounded-t-2xl" />

          <div className="p-8">
            {/* Brand */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">EasyBuy</h1>
                  <p className="text-xs text-gray-500">Welcome back 👋</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure
              </span>
            </div>

            <p className="text-gray-600 mb-6">Sign in to continue to your dashboard.</p>

            {/* Form */}
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="username"
                    className={`w-full rounded-lg border bg-white pl-10 pr-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/15 ${
                      emailErr ? "border-rose-300 focus:border-rose-400" : "border-gray-300 focus:border-gray-900"
                    }`}
                  />
                </div>
                {emailErr && <p className="mt-1 text-xs text-rose-600">{emailErr}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full rounded-lg border bg-white pl-10 pr-10 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/15 ${
                      pwErr ? "border-rose-300 focus:border-rose-400" : "border-gray-300 focus:border-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20"
                    />
                    Remember me
                  </label>
                  <button type="button" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Forgot password?
                  </button>
                </div>

                {pwErr && <p className="mt-1 text-xs text-rose-600">{pwErr}</p>}
              </div>

              {/* Global error */}
              {error && (
                <p className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full rounded-lg bg-gray-900 text-white py-2.5 font-semibold shadow hover:bg-gray-800 disabled:opacity-60 active:scale-[0.99] transition"
              >
                <span className="inline-flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-500">
              By continuing you agree to EasyBuy’s <span className="underline decoration-dotted">Terms</span> &{" "}
              <span className="underline decoration-dotted">Privacy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
