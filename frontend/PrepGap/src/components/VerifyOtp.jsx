import React, { useState } from "react";
import { TrendingUp, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, { email, otp });
      navigate("/login", { state: { message: "Email verified! You can now login." } });
    } catch (err) {
      setError(err.response?.data || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="absolute top-6 left-6 z-10">
        <button onClick={() => navigate("/register")} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Register
        </button>
      </div>

      <div className="w-full max-w-md px-6 z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Verify your email</h2>
          <p className="text-slate-500 mt-2 text-sm">We've sent a 6-digit code to <span className="font-semibold">{email}</span></p>

          <form onSubmit={handleVerify} className="mt-8 space-y-4">
            <input
              type="text"
              required
              maxLength={6}
              className="w-full text-center text-3xl tracking-[1em] py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
