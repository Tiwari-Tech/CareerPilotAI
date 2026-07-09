<div align="center">

# 🚀 CareerPilot AI

### AI-Powered Personalized Interview Preparation Platform

Analyze your **Resume** and **Target Job Description** using **Google Gemini AI** to generate a personalized interview preparation roadmap, technical questions, behavioral questions, and skill gap analysis.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" />
</p>

### 🌐 Live Demo
**Frontend:** https://YOUR-VERCEL-URL.vercel.app

**Backend API:** https://YOUR-RENDER-URL.onrender.com

</div>

---

# 📖 About

**CareerPilot AI** is a full-stack AI-powered interview preparation platform that helps candidates prepare smarter for job interviews.

Instead of providing generic interview questions, the application analyzes your **Resume** and **Target Job Description** using **Google Gemini AI** to create a completely personalized interview preparation experience.

The platform identifies missing skills, highlights strengths, generates technical and behavioral interview questions, and creates a roadmap tailored to the specific role you're targeting.

---

# ✨ Features

### 🤖 AI Features

- Resume Analysis
- Job Description Analysis
- Personalized Interview Roadmap
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Analysis
- AI Career Suggestions

### 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- HTTP-only Cookies
- Protected Routes

### 📄 Resume Processing

- Upload PDF Resume
- AI Resume Parsing
- Personalized Recommendations

### 🔒 Security

- Helmet Security
- Rate Limiting
- CORS Protection
- Environment Variables
- Password Hashing

---

# 🏗 System Architecture

```text
                    React Frontend (Vite)
                            │
                            │
                      REST API Requests
                            │
                            ▼
                  Express.js Backend
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
          ▼                                   ▼
   MongoDB Atlas                     Google Gemini AI
(Authentication)                (Interview Generation)
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router
- Axios
- Sass (SCSS)
- Vite

## Backend

- Node.js
- Express.js
- JWT
- Multer
- Cookie Parser
- Helmet
- Express Rate Limit

## Database

- MongoDB Atlas
- Mongoose

## AI

- Google Gemini API

## Deployment

- Vercel
- Render

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
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── services
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

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

Create a `.env` file:

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

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| POST | `/api/auth/logout` |
| GET | `/api/auth/profile` |

---

## Interview

| Method | Endpoint |
|---------|----------|
| POST | `/api/interview/generate` |
| GET | `/api/interview/history` |
| GET | `/api/interview/:id` |

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
 ├── Skill Gap Analysis
 ├── Personalized Roadmap
 ├── Technical Questions
 └── Behavioral Questions
 │
 ▼
Preparation Dashboard
```

---

# 📸 Screenshots

## 🏠 Home Page

> Add screenshot here

---

## 🔐 Login Page

> Add screenshot here

---

## 📄 Resume Upload

> Add screenshot here

---

## 🤖 AI Generated Report

> Add screenshot here

---

## 🛣 Preparation Roadmap

> Add screenshot here

---

## 💬 Interview Questions

> Add screenshot here

---

# 🔐 Security

- JWT Authentication
- HTTP-only Cookies
- Password Hashing
- Helmet
- Rate Limiting
- CORS Protection
- Environment Variables
- Secure API Validation

---

# 🚀 Future Improvements

- AI Mock Interview
- Voice-Based Interview Practice
- ATS Resume Score
- Resume Optimizer
- Company-Specific Interview Kits
- PDF Report Export
- Email Report Sharing
- Interview Progress Analytics
- Multi-language Support

---

# 💡 Why CareerPilot AI?

Unlike traditional interview preparation platforms, CareerPilot AI creates a **personalized preparation plan** by combining:

- Resume Analysis
- Target Job Description
- Google Gemini AI
- Skill Gap Detection

This helps candidates prepare specifically for the role they are applying for instead of practicing generic interview questions.

---

# 👨‍💻 Author

## Someshmani Tiwari

**B.Tech Information Technology**

Full Stack MERN Developer • AI Enthusiast

📧 Email: YOUR_EMAIL

💼 LinkedIn: YOUR_LINKEDIN

🐙 GitHub: https://github.com/Tiwari-Tech

---

<div align="center">

## ⭐ If you found this project useful, please consider giving it a Star!

Made with ❤️ by **Someshmani Tiwari**

</div>
