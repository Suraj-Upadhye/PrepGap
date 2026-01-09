import React from "react";
import {
  BarChart3,
  Brain,
  ChevronRight,
  TrendingUp,
  Zap,
  Lock,
  ArrowRight,
  ShieldCheck,
  PieChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-800">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200/60 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Prep<span className="text-indigo-600">Gap</span>
            </span>
          </div>
          <button
            onClick={handleLogin}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Login with Google
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 lg:pt-32 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>

              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                AI-Powered Placement Intelligence
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Don't just prepare. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
                Prepare smarter.
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Stop relying on rumors. PrepGap analyzes{" "}
              <strong>real failure data</strong> to show you exactly why
              candidates get rejected, helping you fix gaps before your
              interview.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                <span>Check My Readiness</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
                View Sample Data
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] bg-cover`}
                    style={{
                      backgroundImage: `url(https://i.pravatar.cc/100?img=${
                        i + 10
                      })`,
                    }}
                  ></div>
                ))}
              </div>
              <p>Trusted by 100+ WCE Students</p>
            </div>
          </div>

          {/* Hero Visual / Mockup */}
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20 transform rotate-3 scale-95"></div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Readiness Report
                    </h3>
                    <p className="text-xs text-slate-500">
                      Generated by Gemini AI
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100">
                  High Risk Detected
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Graph Algorithms</span>
                    <span className="text-red-500">Critical Gap</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[30%] h-full rounded-full"></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>System Design</span>
                    <span className="text-indigo-600">Good</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 w-[85%] h-full rounded-full"></div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mt-2">
                  <p className="text-sm text-indigo-900 leading-relaxed font-medium">
                    <span className="font-bold">AI Insight:</span> "Based on 42
                    recent Amazon interviews, candidates with low Graph
                    proficiency have an 85% rejection rate. Focus here
                    immediately."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Intelligence That Actually Works
          </h2>
          <p className="text-lg text-slate-500">
            Built on real failure data from student experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Failure Hotspots (Span 2) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:col-span-2 hover:shadow-card transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Failure Hotspots
              </h3>
            </div>

            <p className="text-slate-500 mb-8">
              See exactly where candidates fail most often at your target
              companies (e.g. Amazon, Google).
            </p>

            {/* Live-looking Mock Chart */}
            <div className="space-y-5">
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Top Rejection Topics (Amazon)</span>
                <span>Failure Rate</span>
              </div>

              {[
                {
                  topic: "Graph Algorithms",
                  count: "42%",
                  width: "42%",
                  color: "bg-red-500",
                },
                {
                  topic: "Dynamic Programming",
                  count: "35%",
                  width: "35%",
                  color: "bg-orange-500",
                },
                {
                  topic: "System Design",
                  count: "15%",
                  width: "15%",
                  color: "bg-yellow-500",
                },
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                    <span>{item.topic}</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                      style={{ width: item.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Gemini AI */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-card transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-transparent rounded-bl-full opacity-50"></div>

            <div className="flex items-center space-x-3 mb-6 relative">
              <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Gemini AI Analysis
              </h3>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-4 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-xs font-bold text-slate-500 uppercase">
                  AI Insight
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                "Based on 23 recent interview logs, candidates weak in{" "}
                <span className="text-red-600 bg-red-50 px-1 rounded">
                  Graphs
                </span>{" "}
                have a 90% rejection rate at Amazon."
              </p>
            </div>
            <p className="text-sm text-slate-500">
              We don't just show data; we interpret it for you.
            </p>
          </div>

          {/* Card 3: Privacy & Security (Full Width) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:col-span-3 hover:shadow-card transition-shadow duration-300 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  100% Anonymous & Secure
                </h3>
              </div>
              <p className="text-slate-500 mb-4 max-w-2xl">
                Your interview failures are sensitive data. We aggregate
                everything anonymously so you can help the community without
                ever exposing your identity.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Encrypted Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>No Names Shared</span>
                </div>
              </div>
            </div>

            {/* Decorative Privacy Visual */}
            <div className="hidden md:flex gap-3 opacity-60">
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-400">
                User: *******
              </div>
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-400">
                Status: Rejected
              </div>
              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-400">
                Company: Amazon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Why PrepGap?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We combined data analytics with Generative AI to give you the unfair
            advantage in placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "Failure Analytics",
              desc: "Don't just see who got selected. See why 90% got rejected so you don't make the same mistakes.",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: Brain,
              title: "Gemini AI Engine",
              desc: "Our AI reads thousands of interview logs to summarize patterns and generate custom study plans.",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              icon: PieChart,
              title: "Readiness Score",
              desc: "Rate your skills and get an instant risk assessment before you sit for the actual interview.",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100 transition-all group cursor-default"
            >
              <div
                className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-800/30 via-slate-900 to-slate-900"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to debug your prep strategy?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Join students who are securing top offers by focusing on what
              actually matters.
            </p>
            <button
              onClick={handleLogin}
              className="px-10 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900">PrepGap</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 PrepGap. Empowering students with data, not rumors.
          </p>
        </div>
      </footer>
    </div>
  );
}
