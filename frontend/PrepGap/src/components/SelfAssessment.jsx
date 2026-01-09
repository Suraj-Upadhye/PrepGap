import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import {
  Target,
  Sliders,
  FileText,
  UploadCloud,
  Save,
  BookOpen,
} from "lucide-react";
import api from "../api";

const SelfAssessment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "Student" });

  // 1. Fetch User for Sidebar
  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  const skillsList = ["DSA", "OS", "DBMS", "CN", "OOPS", "System Design"];

  const [formData, setFormData] = useState({
    currentSemester: 6,
    department: "CSE",
    targetCompaniesInput: "",
    skillRatings: skillsList.reduce(
      (acc, skill) => ({ ...acc, [skill]: 1 }),
      {}
    ),
  });

  // 2. Fetch Existing Assessment
  useEffect(() => {
    api
      .get("/api/assessment/me")
      .then((res) => {
        if (res.status === 200 && res.data) {
          const data = res.data;
          setFormData({
            currentSemester: data.currentSemester || 6,
            department: data.department || "CSE",
            targetCompaniesInput: data.targetCompanies
              ? data.targetCompanies.join(", ")
              : "",
            skillRatings: {
              ...formData.skillRatings,
              ...data.skillSelfRatings,
            },
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSliderChange = (skill, value) => {
    setFormData((prev) => ({
      ...prev,
      skillRatings: { ...prev.skillRatings, [skill]: parseInt(value) },
    }));
  };

  // 4. Save Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      currentSemester: parseInt(formData.currentSemester),
      department: formData.department,
      targetCompanies: formData.targetCompaniesInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      skillSelfRatings: formData.skillRatings,
    };

    try {
      await api.post("/api/assessment", payload);
      alert("Assessment Profile Updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout user={user}>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Skill Readiness Profile
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Update your skills to get accurate risk warnings against company
            failure patterns.
          </p>
        </div>

        {/* Feature Block: Resume Upload (FUTURE SCOPE) */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-sm opacity-80 grayscale-[0.3]">
          <div className="p-3 bg-white rounded-full shadow-sm text-slate-400 border border-slate-100">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              Auto-Fill with Resume AI{" "}
              <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full border border-indigo-200 font-bold">
                COMING SOON
              </span>
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Upload your PDF resume. Gemini will analyze your projects and
              internships to estimate your proficiency.
            </p>
          </div>
          <button
            disabled
            className="cursor-not-allowed bg-white text-slate-400 font-bold px-5 py-2.5 rounded-lg border border-slate-200 flex items-center gap-2 shadow-sm"
          >
            <UploadCloud className="w-4 h-4" />
            Upload PDF
          </button>
        </div>

        {/* Main Form */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section: Academic Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Current Semester
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={formData.currentSemester}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentSemester: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Target className="w-3 h-3" /> Target Companies
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amazon, Google, Microsoft"
                  value={formData.targetCompaniesInput}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetCompaniesInput: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 my-6"></div>

            {/* Section: Skill Ratings */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-800">
                  Self-Rating (1-5)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {skillsList.map((skill) => (
                  <div
                    key={skill}
                    className="bg-slate-50 p-4 rounded-xl border border-slate-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-slate-700 text-sm">
                        {skill}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded border ${
                          formData.skillRatings[skill] >= 4
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : formData.skillRatings[skill] <= 2
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {formData.skillRatings[skill]} / 5
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.skillRatings[skill]}
                      onChange={(e) =>
                        handleSliderChange(skill, e.target.value)
                      }
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />

                    <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-2 px-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:bg-slate-400"
            >
              {loading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Assessment Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SelfAssessment;
