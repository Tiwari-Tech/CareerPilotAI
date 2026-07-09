import "../style/home.scss"
import { useState, useRef, useEffect } from "react"
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from "react-router"

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [uploadError, setUploadError] = useState("");
  const resumeInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getReports().catch((err) => console.error("Failed to load reports:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MAX_RESUME_BYTES = 3 * 1024 * 1024; // matches backend's 3MB multer limit

  const handleGenerateReport = async () => {
    setUploadError("");
    const resumeFile = resumeInputRef.current.files[0] || null;

    if (resumeFile) {
      if (resumeFile.type !== "application/pdf") {
        setUploadError("Only PDF files are supported for the resume upload.");
        return;
      }
      if (resumeFile.size > MAX_RESUME_BYTES) {
        setUploadError("Resume file is too large. Max size is 3MB.");
        return;
      }
    }

    try {
      const data = await generateReport(jobDescription, selfDescription, resumeFile);
      navigate(`/interview/${data._id}`);
    } catch (error) {
      setUploadError(error?.response?.data?.message || "Failed to generate report. Please try again.");
    }
  }

  if (loading) {
    return (
      <main className="loading-screen">
        <p>Generating your personalized interview strategy...</p>
      </main>
    );
  }

  return (
    <main className="home">
      {/* Hero */}
      <div className="hero-text">
        <h1>Create Your Custom <em>Interview Plan</em></h1>
        <p>Let our AI analyze the job requirements and your unique profile to build a high-conversion<br />preparation strategy tailored for excellence.</p>
      </div>

      {/* Two-column form */}
      <div className="form-columns">

        {/* LEFT — Job Description */}
        <div className="col col-left">
          <div className="col-header">
            <span className="step-badge">1</span>
            <span className="col-icon">📋</span>
            <span className="col-title">Target Job Description</span>
            <span className="badge-required">REQUIRED</span>
          </div>
          <div className="card card-left">
            <p className="card-label">JOB CONTEXT &amp; REQUIREMENTS</p>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              className="job-desc-textarea"
              placeholder="Paste the full job description here… e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design….'"
            />
            <div className="card-footer">
              <span className="ai-dot">AI is ready to analyze</span>
              <span className="char-count">0 / 5000 characters</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Professional Profile */}
        <div className="col col-right">
          <div className="col-header">
            <span className="step-badge">2</span>
            <span className="col-icon">👤</span>
            <span className="col-title">Your Professional Profile</span>
          </div>
          <div className="card card-right">
            <div className="upload-section">
              <div className="upload-row-title">
                <span>Upload Resume</span>
                <span className="badge-best">BEST RESULTS</span>
              </div>
              <label className="drop-zone" htmlFor="resume">
                <span className="upload-icon">⬆️</span>
                <span className="drop-main">Click to upload or drag &amp; drop</span>
                <span className="drop-sub">PDF only (Max 3MB)</span>
              </label>
              <input ref={resumeInputRef} hidden type="file" id="resume" name="resume" accept=".pdf" onChange={() => setUploadError("")} />
              {uploadError && <p className="upload-error">{uploadError}</p>}
            </div>

            <div className="or-divider"><span>OR</span></div>

            <div className="self-desc-section">
              <p className="section-label">Quick Self-Description</p>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                className="self-desc-textarea"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy…"
              />
            </div>

            <div className="info-box">
              <span className="info-icon">ℹ️</span>
              <span>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar">
        <div className="bottom-left">
          <span className="sparkle">✦</span> AI-Powered Strategy Generation
          <span className="dot-sep">•</span>
          Processing time: ~45 seconds
        </div>
        <button onClick={handleGenerateReport} className="generate-btn">⚡ Generate My Interview Strategy</button>
      </div>

     {/* Recent Reports */}
      {reports.length > 0 && (
        <div className="recent-reports">
          <h2>My Recent Interview Plans</h2>
          <ul className="report-list">
            {reports.map((report) => (
              <li
                key={report._id}
                className="report-item"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <span className="report-title">{report.title}</span>
                <span className="report-generated">
                  Generated on {new Date(report.createdAt).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
                <span className="report-score">
                  Match Score: {report.matchScore}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

export default Home