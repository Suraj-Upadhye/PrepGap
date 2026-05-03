import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import SubmitInterview from "./components/SubmitInterview";
import CompanyInsights from "./components/CompanyInsights";
import SelfAssessment from "./components/SelfAssessment";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import CompanyList from "./components/CompanyList";
import ExperienceList from "./components/ExperienceList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes 
            (These components handle the <Layout> internally) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitInterview />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:companyName" element={<ExperienceList />} />
        <Route path="/insights" element={<CompanyInsights />} />
        <Route path="/assessment" element={<SelfAssessment />} />
      </Routes>
    </Router>
  );
}

export default App;
