import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-800 flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      {/* flex-grow ensures this takes up all available space, pushing footer down */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
        {children}
      </main>

      {/* Internal Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-500">
          <p>© 2026 PrepGap. Internal Student Portal.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
