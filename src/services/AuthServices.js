// src/services/AuthServices.js

const BASE_URL = "http://4.247.150.176:8000";

function withTimeout(ms = 12000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, cancel: () => clearTimeout(id) };
}

/**
 * Login with email & password.
 * Returns: { authenticated: boolean, message?: string }
 */
export async function loginApi(email, password) {
  const { signal, cancel } = withTimeout();

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      signal,
    });

    // Network/HTTP errors
    if (!res.ok) {
      // Try to parse api error if provided
      let msg = `Login failed (${res.status})`;
      try {
        const err = await res.json();
        if (err && err.message) msg = err.message;
      } catch { /* ignore */ }
      return { authenticated: false, message: msg };
    }

    const data = await res.json();
    // Shape expected from your backend:
    // { authenticated: true|false, message: "Login successful" }
    return {
      authenticated: !!data?.authenticated,
      message: data?.message || (data?.authenticated ? "Login successful" : "Login failed"),
    };
  } catch (err) {
    const msg =
      err?.name === "AbortError"
        ? "Request timed out. Please try again."
        : "Unable to reach server. Check your connection and try again.";
    return { authenticated: false, message: msg };
  } finally {
    cancel();
  }
}
