<div align="center">

# 🚀 CareerPilot AI

### AI-Powered Personalized Interview Preparation Platform

**CareerPilot AI** is a full-stack **MERN + Generative AI** application that analyzes your **Resume** and **Target Job Description** to generate personalized interview preparation content using **Google Gemini AI**.

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
</p>

</div>

---

# 📖 About

Preparing for interviews requires understanding the job description, identifying skill gaps, and practicing role-specific questions. CareerPilot AI automates this entire workflow using **Google Gemini AI**.

The platform analyzes both the candidate's **Resume** and **Target Job Description** to generate:

- Personalized Interview Preparation Roadmap
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Analysis
- Resume Insights
- AI-Powered Career Suggestions

---

# ✨ Features

## 🤖 AI Features

- Resume Analysis using Gemini AI
- Job Description Analysis
- Personalized Preparation Roadmap
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Identification
- AI-Based Career Suggestions

---

## 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- HTTP-only Cookie Authentication
- Protected Routes

---

## 📄 Resume Processing

- PDF Resume Upload
- Resume Parsing
- AI Content Analysis
- Personalized Recommendations

---

## 🔒 Security

- Helmet Security
- Rate Limiting
- Secure Cookies
- CORS Protection
- Environment Variables
- Password Hashing

---

# 🏗️ System Architecture

```text
                   React Frontend
                         │
                         │ REST API
                         ▼
                 Express.js Backend
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
 MongoDB Atlas                  Google Gemini AI
(User Authentication)       (Interview Generation)
```

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Axios
- Sass (SCSS)
- Vite

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- Cookie Parser
- Helmet
- Express Rate Limit

## Database

- MongoDB Atlas
- Mongoose

## Generative AI

- Google Gemini API

---

# 📂 Project Structure

```text
CareerPilotAI
│
├── frontend
│   ├── src
│   ├── assets
│   ├── components
│   ├── features
│   ├── pages
│   └── package.json
│
├── backend
│   ├── src
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
│
├── README.md
└── .gitignore
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Tiwari-Tech/CareerPilotAI.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

Create a `.env` file

```env
MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY

FORCE_GOOGLE_DNS=true
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:3000
```

---

# 🔄 Application Workflow

```text
User
 │
 ▼
Register/Login
 │
 ▼
Upload Resume
 │
 ▼
Paste Job Description
 │
 ▼
Google Gemini AI
 │
 ├── Resume Analysis
 ├── Job Description Analysis
 ├── Skill Gap Detection
 ├── Technical Questions
 ├── Behavioral Questions
 └── Personalized Roadmap
 │
 ▼
Interview Preparation Dashboard
```

---

# 📸 Screenshots

### 🏠 Home Page

_Add screenshot_

### 🔐 Login

_Add screenshot_

### 📄 Resume Upload

_Add screenshot_

### 🤖 AI Generated Report

_Add screenshot_

### 🛣️ Preparation Roadmap

_Add screenshot_

### 💬 Interview Questions

_Add screenshot_

---

# 🔒 Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing
- Helmet Security
- Express Rate Limiting
- CORS Configuration
- Environment Variable Protection

---

# 🚀 Future Enhancements

- AI Mock Interview
- Voice-Based Interview Practice
- ATS Resume Score
- Resume Optimizer
- Company-Specific Interview Preparation
- PDF Report Export
- Interview Progress Tracking
- Multi-language Support

---

# 👨‍💻 Author

## Someshmani Tiwari

**B.Tech Information Technology**

Full Stack MERN Developer | Generative AI Enthusiast

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

**Built with ❤️ using the MERN Stack and Google Gemini AI**

</div>
