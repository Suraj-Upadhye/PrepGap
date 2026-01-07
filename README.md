# PrepGap

### Placement Readiness & Failure Insight System

PrepGap is a data-driven platform designed to help students prepare smarter for campus placements by analyzing real interview failure patterns and readiness gaps.

---

## Problem Statement

Students often prepare for placements based on assumptions, rumors, or scattered interview experiences.  
There is no structured system to answer:

- Why candidates fail in interviews
- What skills companies actually evaluate
- Whether a student is ready for a specific company

As a result, the same preparation mistakes are repeated every year.

---

## Solution Overview

PrepGap collects **anonymous interview experiences**, analyzes **skill-wise and stage-wise failures**, and uses **Google Gemini AI** to generate concise, actionable insights.

It helps students:

- Understand real interview expectations
- Identify common failure hotspots
- Evaluate their personal readiness before interviews

---

## Key Features

- Secure authentication using Google OAuth 2.0
- Anonymous interview experience submission
- Company-wise interview insights
- Skill-based failure analytics (eg., DSA, OS, DBMS, CN, OOPS)
- AI-generated summaries using Google Gemini
- Personal readiness gap analysis
- Year-wise and internship/placement separation

---

## Google Technologies Used

### Google OAuth 2.0

- Secure authentication
- Ensures access only to verified users
- Prevents spam and fake submissions

### Google Gemini AI (Gemini 2.5 Flash)

- Generates summaries from aggregated interview data
- Highlights technical weaknesses and preparation priorities
- Used as an AI-assisted insight generator (not a chatbot)

---

## Tech Stack

### Backend

- Spring Boot (Java)
- Spring Security
- REST APIs
- OAuth 2.0 (Google Login)

### Database

- MongoDB

### Frontend

- React.js
- Tailwind CSS

### AI & Analytics

- Google Gemini API

---

## System Flow (High-Level)

1. User logs in using Google OAuth
2. Student submits interview experience anonymously
3. Data is stored securely in MongoDB
4. Failure patterns are analyzed skill-wise
5. Gemini AI generates insight summaries
6. Students view company insights and readiness gaps

---

## Why PrepGap?

- Focuses on **why candidates fail**, not just experiences
- Converts scattered data into structured insights
- Helps students prepare based on evidence, not assumptions
- Preserves valuable interview knowledge across batches
- Scalable across colleges

---

## Future Scope

- Resume-based readiness analysis
- Company-specific preparation roadmaps
- Cross-college benchmarking
- Multi-year interview trend analysis
- Admin dashboards for placement cells

---

## Hackathon Information

- **Event:** TechSprint 2K25
- **Organized by:** GDG on Campus WCE Sangli
- **Domain:** Open Innovation

---

## Team

- **Team Name:** Homo Sapiens
- **Team Lead:** Suraj Upadhye

---

## Disclaimer

This project is built as a hackathon MVP.  
All interview data is anonymous and used only for analytical and educational purposes.
