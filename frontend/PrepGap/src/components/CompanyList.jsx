import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { Building2, Filter, ChevronRight } from "lucide-react";
import api from "../api";

const CompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ email: "Student" });

  // Filters
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Fetch User for Layout
  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  // Fetch Companies when filters change
  useEffect(() => {
    fetchCompanies();
  }, [yearFilter, typeFilter]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const params = {};
      if (yearFilter) params.year = yearFilter;
      if (typeFilter) params.type = typeFilter;

      const res = await api.get("/api/interviews/companies", { params });

      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout user={user}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Browse Companies
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Find interview experiences shared by your seniors.
            </p>
          </div>

          <div className="flex gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center px-3 border-r border-slate-200">
              <Filter className="w-4 h-4 text-slate-400" />
            </div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="PLACEMENT">Full Time</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
        </div>

        {/* Company Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">
            Loading directory...
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">
              No companies found matching these filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company}
                onClick={() => navigate(`/companies/${company}`)}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-xl font-bold text-slate-700 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {company.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {company}
                      </h3>
                      <p className="text-xs text-slate-500">View Experiences</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompanyList;
