import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Hash,
  X,
  Linkedin,
  Mail,
  GraduationCap,
  Lightbulb,
  BookOpen,
  Link as LinkIcon,
  Loader2,
  Bot,
  MessageSquareQuote,
} from "lucide-react";
import api from "../api";

const ExperienceList = () => {
  const { companyName } = useParams();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ email: "Student" });
  const [yearFilter, setYearFilter] = useState("");

  // Modal State
  const [selectedExp, setSelectedExp] = useState(null);
  const [aiResources, setAiResources] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiFetched, setAiFetched] = useState(false); // Track if we already fetched

  // Fetch User
  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  // Fetch Experiences
  useEffect(() => {
    const fetchExp = async () => {
      setLoading(true);
      try {
        const params = yearFilter ? { year: yearFilter } : {};
        const res = await api.get(`/api/interviews/company/${companyName}`, {
          params,
        });
        setExperiences(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, [companyName, yearFilter]);

  // Reset AI state when modal closes/opens
  useEffect(() => {
    if (selectedExp) {
      setAiResources([]);
      setAiFetched(false);
    }
  }, [selectedExp]);

  // Handler for Manual AI Fetch
  const handleFetchAiResources = async () => {
    setLoadingAi(true);

    // Collect all topics from all rounds
    const allTopics = selectedExp.stages?.flatMap((s) => s.topicsAsked) || [];
    const uniqueTopics = [...new Set(allTopics)];

    if (uniqueTopics.length > 0) {
      try {
        const res = await api.post("/api/insights/resources", uniqueTopics);
        setAiResources(res.data);
      } catch (err) {
        console.error("AI Resource fetch failed", err);
      } finally {
        setLoadingAi(false);
        setAiFetched(true);
      }
    } else {
      setLoadingAi(false);
      setAiFetched(true);
    }
  };

  return (
    <Layout user={user}>
      <div className="max-w-5xl mx-auto space-y-8 relative">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {companyName.charAt(0)}
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                {companyName}
              </h1>
            </div>
            <p className="text-slate-500">
              {experiences.length} experiences shared by seniors.
            </p>
          </div>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-white border border-slate-300 text-sm font-medium p-2.5 rounded-lg outline-none"
          >
            <option value="">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Experience Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">
            Loading experiences...
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            No experiences found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExp(exp)}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        exp.finalResult === "SELECTED"
                          ? "bg-green-50 border-green-200 text-green-600"
                          : "bg-red-50 border-red-200 text-red-600"
                      }`}
                    >
                      {exp.finalResult === "SELECTED" ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <XCircle className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {exp.role}{" "}
                        <span className="text-slate-400 font-normal">
                          @ {exp.company}
                        </span>
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> {exp.experienceType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {exp.interviewYear}
                        </span>
                        <span className="flex items-center gap-1">
                          <Hash className="w-3 h-3" />{" "}
                          {exp.totalInterviewStages} Rounds
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    View Diary →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- DIARY SLIDE-OVER --- */}
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedExp(null)}
            ></div>

            <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

              <div className="p-8 lg:p-10 space-y-8">
                {/* Header Profile */}
                <div className="border-b border-slate-100 pb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 ${
                        selectedExp.finalResult === "SELECTED"
                          ? "bg-green-100 border-green-50 text-green-700"
                          : "bg-red-100 border-red-50 text-red-700"
                      }`}
                    >
                      {selectedExp.finalResult === "SELECTED" ? "🎉" : "📚"}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {selectedExp.role}
                      </h2>
                      <p className="text-slate-500 font-medium">
                        {selectedExp.company} • {selectedExp.interviewYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg hover:bg-blue-100 transition-colors">
                      <Linkedin className="w-4 h-4" /> Connect
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors">
                      <Mail className="w-4 h-4" /> Email
                    </button>
                  </div>
                </div>

                {/* Round Breakdown */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" /> Process
                    Timeline
                  </h3>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {selectedExp.stages.map((stage, idx) => (
                      <div
                        key={idx}
                        className="relative flex items-start gap-4"
                      >
                        <div
                          className={`absolute left-0 mt-1.5 ml-2.5 w-5 h-5 rounded-full border-4 border-white ${
                            stage.cleared ? "bg-indigo-600" : "bg-slate-300"
                          }`}
                        ></div>
                        <div className="ml-10 w-full">
                          <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-indigo-200 transition-colors shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-slate-900">
                                {stage.stageName}
                              </h4>
                              <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                {stage.durationMinutes} mins
                              </span>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">
                                  Topics
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {stage.topicsAsked.map((t) => (
                                    <span
                                      key={t}
                                      className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              {stage.keyMistake && (
                                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                                  <p className="text-xs font-bold text-amber-800 uppercase mb-1">
                                    Key Lesson
                                  </p>
                                  <p className="text-sm text-amber-900 italic">
                                    "{stage.keyMistake}"
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Words of Wisdom */}
                {selectedExp.tipsForJuniors && (
                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
                    <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                      <MessageSquareQuote className="w-5 h-5" /> Words of Wisdom
                    </h3>
                    <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedExp.tipsForJuniors}
                    </div>
                  </div>
                )}

                {/* FINAL VERDICT SECTION */}
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-400 shrink-0" />
                    <div className="w-full">
                      <h4 className="font-bold text-lg mb-2">Final Verdict</h4>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        {selectedExp.primaryRejectionReason ||
                          "Candidate was selected based on strong problem solving skills."}
                      </p>

                      {/* 1. Candidate Resources */}
                      {selectedExp.candidateResources &&
                        selectedExp.candidateResources.length > 0 && (
                          <div className="border-t border-slate-700 pt-4 mt-4">
                            <h5 className="font-bold text-xs text-slate-400 uppercase mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" /> Resources used by
                              Candidate
                            </h5>
                            <ul className="space-y-2">
                              {selectedExp.candidateResources.map((res, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
                                >
                                  <LinkIcon className="w-3 h-3" />
                                  <a
                                    href={res.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline underline-offset-2"
                                  >
                                    {res.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {/* 2. AI Resources */}
                      <div className="border-t border-slate-700 pt-4 mt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-bold text-xs text-slate-400 uppercase flex items-center gap-2">
                            <Bot className="w-4 h-4" /> Gemini AI Suggestions
                          </h5>

                          {!aiFetched && !loadingAi && (
                            <button
                              onClick={handleFetchAiResources}
                              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                            >
                              <Bot className="w-3 h-3" /> Curate Links
                            </button>
                          )}
                        </div>

                        {loadingAi ? (
                          <div className="flex items-center gap-2 text-sm text-slate-500 py-2">
                            <Loader2 className="w-4 h-4 animate-spin" /> Finding
                            top-rated tutorials...
                          </div>
                        ) : (
                          aiFetched && (
                            <ul className="space-y-2 animate-in fade-in duration-300">
                              {aiResources.map((res, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                                >
                                  <LinkIcon className="w-3 h-3" />
                                  <a
                                    href={res.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline underline-offset-2"
                                  >
                                    {res.name}
                                  </a>
                                </li>
                              ))}
                              {aiResources.length === 0 && (
                                <span className="text-xs text-slate-500">
                                  No specific resources found for these topics.
                                </span>
                              )}
                            </ul>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExperienceList;
