import React from "react";
import { TrendingUp, ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
      </div>

      {/* Navigation (Back to Home) */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="w-full max-w-md px-6 z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Prep<span className="text-indigo-600">Gap</span>
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-500 mt-2 text-sm">
              Sign in to access your placement dashboard and analytics.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-slate-700 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all group"
            >
              {/* Google Icon SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                We only use your email to verify your student status. We never
                post to your account or share your personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-slate-500">
          © 2026 PrepGap. Empowering students with data, not rumors.
        </p>
      </div>
    </div>
  );
};

export default Login;
