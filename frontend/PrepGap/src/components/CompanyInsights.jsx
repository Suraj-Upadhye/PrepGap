import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  BarChart3,
  Brain,
  AlertTriangle,
  Target,
  Zap,
  ShieldAlert,
  Search,
  Loader2,
} from "lucide-react";
import api from "../api";

const CompanyInsights = () => {
  const [company, setCompany] = useState("Amazon");
  const [stats, setStats] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [readiness, setReadiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "Student" });

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.log("Not logged in"));
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setStats(null);
    setAiSummary(null);
    setReadiness(null);

    try {
      // Parallel requests for better performance
      const [statsRes, aiRes] = await Promise.all([
        api.get(`/api/insights/company/${company}`),
        api.get(`/api/insights/company/${company}/summary`),
      ]);

      setStats(statsRes.data);
      setAiSummary(aiRes.data);

      if (user && user.id) {
        try {
          const readyRes = await api.get(
            `/api/insights/readiness?userId=${user.id}&company=${company}`
          );
          setReadiness(readyRes.data);
        } catch (e) {
          console.warn("Could not fetch readiness.");
        }
      }
    } catch (error) {
      console.error("Failed to fetch insights", error);
      alert("Could not fetch data. Ensure company name is correct.");
    } finally {
      setLoading(false);
    }
  };

  const RiskBadge = ({ level }) => {
    const styles = {
      HIGH: "bg-red-50 text-red-700 border-red-200 ring-red-100",
      MEDIUM: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-100",
      LOW: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-100",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded text-[10px] font-bold border ring-1 uppercase tracking-wide ${
          styles[level] || "bg-gray-100"
        }`}
      >
        {level} Risk
      </span>
    );
  };

  return (
    <Layout user={user}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Company Intelligence
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Analyze failure patterns and check your personal readiness score.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow w-full relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Target Company
            </label>
            <div className="relative">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-slate-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                placeholder="e.g. Amazon, Google, Microsoft"
                onKeyDown={(e) => e.key === "Enter" && fetchInsights()}
              />
              <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            </div>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                Get Intelligence
              </>
            )}
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Column: Stats & Readiness */}
            <div className="space-y-6">
              {/* Failure Hotspots Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                  <div className="p-1.5 bg-red-50 rounded-md">
                    <BarChart3 className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                    Failure Hotspots
                  </h3>
                </div>

                {Object.keys(stats).length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm italic">
                    No failure data available yet.
                  </div>
                ) : (
                  <div className="space-y-5">
                    {Object.entries(stats).map(([skill, count]) => (
                      <div key={skill} className="group">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-700 font-semibold">
                            {skill}
                          </span>
                          <span className="text-slate-500 text-xs font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                            {count} Failures
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-red-600"
                            style={{ width: `${Math.min(count * 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Readiness Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full opacity-60"></div>
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 relative z-10">
                  <div className="p-1.5 bg-indigo-50 rounded-md">
                    <ShieldAlert className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                    Your Readiness
                  </h3>
                </div>

                {!readiness ? (
                  <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 relative z-10">
                    <p className="text-sm text-slate-500 mb-3 font-medium">
                      No skill data found.
                    </p>
                    <a
                      href="/assessment"
                      className="text-indigo-600 text-xs font-bold hover:text-indigo-800 uppercase tracking-wide hover:underline"
                    >
                      Take Assessment →
                    </a>
                  </div>
                ) : (
                  <ul className="space-y-2 relative z-10">
                    {Object.entries(readiness).map(([skill, risk]) => (
                      <li
                        key={skill}
                        className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                      >
                        <span className="font-semibold text-slate-700 text-sm">
                          {skill}
                        </span>
                        <RiskBadge level={risk} />
                      </li>
                    ))}
                    {Object.keys(readiness).length === 0 && (
                      <li className="text-sm text-slate-400 italic text-center py-4">
                        No overlapping skills found.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Right Column: AI Analysis */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Gemini Intelligence
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-xs text-slate-500 font-medium">
                      AI Analysis for {company}
                    </p>
                  </div>
                </div>
              </div>

              {!aiSummary ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  <div className="h-32 bg-slate-50 rounded-xl mt-4"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50/50 border border-red-100 p-5 rounded-xl">
                      <h4 className="font-bold text-red-900 text-sm mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Major Weaknesses
                      </h4>
                      <ul className="space-y-2">
                        {aiSummary.mainWeaknesses?.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-700 flex items-start gap-2"
                          >
                            <span className="text-red-400 mt-1.5">•</span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-xl">
                      <h4 className="font-bold text-amber-900 text-sm mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" /> High-Value Topics
                      </h4>
                      <ul className="space-y-2">
                        {aiSummary.underestimatedTopics?.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-700 flex items-start gap-2"
                          >
                            <span className="text-amber-400 mt-1.5">•</span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-indigo-600 fill-current" />{" "}
                      Recommended Action Plan
                    </h4>
                    <div className="space-y-3">
                      {aiSummary.juniorPriorities?.map((item, i) => (
                        <div key={i} className="flex gap-3 items-start group">
                          <span className="flex-shrink-0 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                            {i + 1}
                          </span>
                          <p className="text-sm text-slate-700 leading-relaxed pt-0.5 font-medium">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompanyInsights;
