import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout"; // Keep the sidebar
import {
  FileText,
  Brain,
  Target,
  TrendingUp,
  ArrowRight,
  Plus,
  Activity,
  Calendar,
} from "lucide-react";
import api from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => navigate("/"));
  }, [navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">
        Loading Dashboard...
      </div>
    );

  const firstName = user.email.split("@")[0];

  return (
    <Layout user={user}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-wide">
                Student Portal
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, <span className="text-indigo-600">{firstName}</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Track your placement readiness and analyze failure trends.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* 2. Primary Action Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Insights (Featured) */}
          <div
            onClick={() => navigate("/insights")}
            className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Failure Intelligence
              </h3>
              <p className="text-slate-500 mb-6 max-w-md">
                Analyze why candidates fail at Amazon, Google, and more. Get
                Gemini AI-powered summaries.
              </p>
              <div className="flex items-center text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                Get Intelligence <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>

          {/* Card: Submit */}
          <div
            onClick={() => navigate("/submit")}
            className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm hover:shadow-lg hover:shadow-slate-200 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-white border border-slate-700">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Submit Data
                </h3>
                <p className="text-slate-400 text-sm">
                  Help juniors by sharing your interview experience anonymously.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Secondary Actions & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Readiness Check */}
          <div
            onClick={() => navigate("/assessment")}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Assessment
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Check Readiness
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Update your skill profile.
            </p>
          </div>

          {/* Activity Placeholder */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <Activity className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-slate-900 font-bold">No Recent Activity</h3>
            <p className="text-sm text-slate-500 mt-1">
              Your submissions and viewed reports will appear here.
            </p>
          </div>
        </div>

        {/* 4. Pro Tip Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg flex items-start gap-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Pro Tip: Focus on Graphs</h4>
            <p className="text-indigo-100 text-sm mt-1 max-w-2xl">
              Based on yesterday's data, Amazon rejected 4 candidates
              specifically due to lack of Graph Algorithm knowledge. Update your
              preparation strategy!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
