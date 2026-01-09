import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUp,
  LayoutDashboard,
  PenTool,
  Zap,
  Target,
  LogOut,
  Building2,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // The backend will then redirect back to localhost:3000/ automatically
    window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
  };

  // Navigation Items Config
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Submit", path: "/submit", icon: PenTool },
    { name: "Browse", path: "/companies", icon: Building2 },
    { name: "Insights", path: "/insights", icon: Zap },
    { name: "Readiness", path: "/assessment", icon: Target },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition-colors">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Prep<span className="text-indigo-600">Gap</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 ${
                      isActive ? "text-indigo-600" : "text-slate-400"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button (Placeholder for future) */}
          <div className="md:hidden">
            <button className="text-slate-500 hover:text-slate-700">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
