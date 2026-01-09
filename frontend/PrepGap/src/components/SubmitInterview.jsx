import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import {
  Plus,
  Trash2,
  Save,
  FileText,
  Layers,
  Link as LinkIcon,
  BookOpen,
  MessageSquareQuote,
} from "lucide-react";
import api from "../api";

const SubmitInterview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "Student" });

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  // 1. Basic Info State
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    experienceType: "PLACEMENT",
    finalResult: "REJECTED",
    interviewStageReached: "",
    failedSkillsInput: "",
    primaryRejectionReason: "",
    selfConfidenceLevel: 3,
    tipsForJuniors: "",
  });

  // 2. Dynamic Stages State
  const [stages, setStages] = useState([
    {
      stageName: "Online Assessment",
      durationMinutes: 60,
      topicsInput: "",
      cleared: true,
      keyMistake: "",
    },
  ]);

  // 3. NEW: Dynamic Resources State
  const [resources, setResources] = useState([{ name: "", url: "" }]);

  // --- Handlers ---

  const handleBasicChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStageChange = (index, field, value) => {
    const newStages = [...stages];
    newStages[index][field] = value;
    setStages(newStages);
  };

  const addStage = () => {
    setStages([
      ...stages,
      {
        stageName: "",
        durationMinutes: 45,
        topicsInput: "",
        cleared: false,
        keyMistake: "",
      },
    ]);
  };

  const removeStage = (index) => {
    const newStages = stages.filter((_, i) => i !== index);
    setStages(newStages);
  };

  // Resource Handlers
  const handleResourceChange = (index, field, value) => {
    const newRes = [...resources];
    newRes[index][field] = value;
    setResources(newRes);
  };

  const addResource = () => {
    setResources([...resources, { name: "", url: "" }]);
  };

  const removeResource = (index) => {
    const newRes = resources.filter((_, i) => i !== index);
    setResources(newRes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStages = stages.map((stage) => ({
      stageName: stage.stageName,
      durationMinutes: parseInt(stage.durationMinutes) || 0,
      topicsAsked: stage.topicsInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      cleared: stage.cleared === "true" || stage.cleared === true,
      evaluationBasis: "Standard",
      keyMistake: stage.keyMistake,
    }));

    // Filter out empty resources
    const validResources = resources.filter(
      (r) => r.name.trim() !== "" && r.url.trim() !== ""
    );

    const payload = {
      company: formData.company,
      role: formData.role,
      experienceType: formData.experienceType,
      finalResult: formData.finalResult,
      interviewStageReached: formData.interviewStageReached,
      primaryRejectionReason: formData.primaryRejectionReason,
      selfConfidenceLevel: parseInt(formData.selfConfidenceLevel),
      tipsForJuniors: formData.tipsForJuniors,
      failedSkillTags: formData.failedSkillsInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      stages: formattedStages,
      totalInterviewStages: formattedStages.length,
      candidateResources: validResources, // Send the resources!
      interviewYear: new Date().getFullYear(),
      graduationYear: 2026,
      department: "CSE",
    };

    try {
      await api.post("/api/interviews", payload);
      alert("Experience Submitted Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission failed", error);
      alert("Error submitting experience.");
    }
  };

  return (
    <Layout user={user}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Submit Experience
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Share your interview journey to help juniors prepare better.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Company Details */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-slate-800">Company & Role</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                  Company Name
                </label>
                <input
                  name="company"
                  onChange={handleBasicChange}
                  placeholder="e.g. Amazon"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                  Role Title
                </label>
                <input
                  name="role"
                  onChange={handleBasicChange}
                  placeholder="e.g. SDE Intern"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                  Type
                </label>
                <select
                  name="experienceType"
                  onChange={handleBasicChange}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option value="PLACEMENT">Full-time Placement</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                  Final Outcome
                </label>
                <select
                  name="finalResult"
                  onChange={handleBasicChange}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option value="REJECTED">Rejected</option>
                  <option value="SELECTED">Selected</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                Weak Skills / Tags
              </label>
              <input
                name="failedSkillsInput"
                onChange={handleBasicChange}
                placeholder="e.g. Dynamic Programming, Graphs, SQL"
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              />
              <p className="text-xs text-slate-400 mt-1">
                Comma separated. These tags help our AI identify patterns.
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                Final Verdict Reason
              </label>
              <textarea
                name="primaryRejectionReason"
                rows="2"
                onChange={handleBasicChange}
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="e.g. Cleared all rounds but failed to explain project architecture clearly."
              />
            </div>
          </div>

          {/* Card 2: Interview Rounds */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-slate-800">Interview Rounds</h3>
              </div>
              <button
                type="button"
                onClick={addStage}
                className="text-xs bg-brand-50 text-brand-700 font-bold px-3 py-1.5 rounded-md hover:bg-brand-100 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Round
              </button>
            </div>

            <div className="space-y-4">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className="bg-slate-50 p-5 rounded-lg border border-slate-200 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeStage(index)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove Round"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
                    Round {index + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <input
                      placeholder="Stage Name (e.g. Coding)"
                      value={stage.stageName}
                      onChange={(e) =>
                        handleStageChange(index, "stageName", e.target.value)
                      }
                      className="border border-slate-300 p-2 rounded text-sm outline-none focus:border-brand-500"
                    />
                    <input
                      type="number"
                      placeholder="Duration (mins)"
                      value={stage.durationMinutes}
                      onChange={(e) =>
                        handleStageChange(
                          index,
                          "durationMinutes",
                          e.target.value
                        )
                      }
                      className="border border-slate-300 p-2 rounded text-sm outline-none focus:border-brand-500"
                    />
                  </div>

                  <input
                    placeholder="Topics Asked (e.g. Arrays, OS)"
                    value={stage.topicsInput}
                    onChange={(e) =>
                      handleStageChange(index, "topicsInput", e.target.value)
                    }
                    className="w-full border border-slate-300 p-2 rounded text-sm outline-none focus:border-brand-500 mb-3"
                  />

                  <div className="flex gap-4 items-center">
                    <select
                      value={stage.cleared}
                      onChange={(e) =>
                        handleStageChange(index, "cleared", e.target.value)
                      }
                      className={`border p-1.5 rounded text-sm font-medium outline-none ${
                        stage.cleared == "true" || stage.cleared === true
                          ? "text-green-700 bg-green-50 border-green-200"
                          : "text-red-700 bg-red-50 border-red-200"
                      }`}
                    >
                      <option value={true}>Cleared</option>
                      <option value={false}>Failed</option>
                    </select>
                    <input
                      placeholder="Key Mistake / Lesson (Optional)"
                      value={stage.keyMistake}
                      onChange={(e) =>
                        handleStageChange(index, "keyMistake", e.target.value)
                      }
                      className="flex-grow border border-slate-300 p-1.5 rounded text-sm outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Resources (NEW) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-slate-800">Helpful Resources</h3>
              </div>
              <button
                type="button"
                onClick={addResource}
                className="text-xs bg-brand-50 text-brand-700 font-bold px-3 py-1.5 rounded-md hover:bg-brand-100 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Resource
              </button>
            </div>

            <div className="space-y-3">
              {resources.map((res, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      placeholder="Resource Name (e.g. Striver Graph Playlist)"
                      value={res.name}
                      onChange={(e) =>
                        handleResourceChange(index, "name", e.target.value)
                      }
                      className="border border-slate-300 p-2 rounded text-sm outline-none focus:border-brand-500"
                    />
                    <div className="relative">
                      <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        placeholder="URL (https://...)"
                        value={res.url}
                        onChange={(e) =>
                          handleResourceChange(index, "url", e.target.value)
                        }
                        className="w-full border border-slate-300 p-2 pl-9 rounded text-sm outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <p className="text-xs text-slate-400 italic">
                Share the links that actually helped you crack the rounds.
              </p>
            </div>
          </div>

          {/* Card 4: Tips & Detailed Note (NEW) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareQuote className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-slate-800">
                Final Tips & Detailed Walkthrough
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Describe the interview flow, specific questions asked, your
              preparation strategy, and advice for juniors. (Supports
              Markdown-style spacing).
            </p>
            <textarea
              name="tipsForJuniors"
              rows="6"
              onChange={handleBasicChange}
              className="w-full border border-slate-300 p-4 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm leading-relaxed"
              placeholder="e.g. 'Round 1 started with... The interviewer focused heavily on... My advice is to practice...'"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Submit Experience
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SubmitInterview;
