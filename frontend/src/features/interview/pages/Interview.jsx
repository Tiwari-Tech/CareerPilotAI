import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";



const MatchScoreGauge = ({ score }) => {
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(score, 0), 100);
  const offset = circumference * (1 - clamped / 100);

  const getColor = (value) => {
    if (value >= 75) return { main: "#22c55e", glow: "rgba(34, 197, 94, 0.35)" };
    if (value >= 50) return { main: "#eab308", glow: "rgba(234, 179, 8, 0.35)" };
    return { main: "#ef4444", glow: "rgba(239, 68, 68, 0.35)" };
  };

  const getLabel = (value) => {
    if (value >= 75) return "Strong match for this role";
    if (value >= 50) return "Moderate match for this role";
    return "Weak match for this role";
  };

  const { main: color, glow } = getColor(clamped);

  return (
    <div className="match-score">
      <div className="match-score__ring-wrap" style={{ "--glow-color": glow }}>
        <svg
          className="match-score__ring"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e2038"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="match-score__center">
          <span className="match-score__value">{clamped}</span>
          <span className="match-score__unit">%</span>
        </div>
      </div>
      <p className="match-score__label" style={{ color }}>
        {getLabel(clamped)}
      </p>
    </div>
  );
};

const SECTIONS = {
  technical: "Technical Questions",
  behavioral: "Behavioral Questions",
  roadmap: "Road Map",
};

function matchesSearch(text = "", query) {
  return text.toLowerCase().includes(query.toLowerCase());
}

function filterQuestions(questions, query) {
  if (!query.trim()) return questions;
  return questions.filter(
    (item) =>
      matchesSearch(item.question, query) ||
      matchesSearch(item.intention, query) ||
      matchesSearch(item.answer, query)
  );
}

function filterPlan(plan, query) {
  if (!query.trim()) return plan;
  return plan.filter(
    (item) =>
      matchesSearch(item.focus, query) ||
      matchesSearch(item.task, query) ||
      matchesSearch(String(item.day), query)
  );
}

const Interview = () => {
  const { interviewId } = useParams();
  const { report, loading, getReportById } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId).catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  const data = report || {};

  const [activeSection, setActiveSection] = useState("technical");
  const [search, setSearch] = useState("");

  const filteredTechnical = useMemo(
    () => filterQuestions(data.technicalQuestions ?? [], search),
    [data.technicalQuestions, search]
  );

  const filteredBehavioral = useMemo(
    () => filterQuestions(data.behavioralQuestions ?? [], search),
    [data.behavioralQuestions, search]
  );

  const filteredPlan = useMemo(
    () => filterPlan(data.preparationPlan ?? [], search),
    [data.preparationPlan, search]
  );

  if (loading) {
    return (
      <main className="interview-page">
        <p>Loading your interview report...</p>
      </main>
    );
  }

  const renderQuestions = (questions) => {
    if (questions.length === 0) {
      return <p className="interview-empty">No results match your search.</p>;
    }

    return questions.map((item, index) => (
      <article className="question-card" key={index}>
        <h3 className="question-card__title">{item.question}</h3>

        <p className="question-card__intention">
          <span className="question-card__label">Intention</span>
          {item.intention}
        </p>

        <p className="question-card__answer">
          <span className="question-card__label">Suggested Answer</span>
          {item.answer}
        </p>
      </article>
    ));
  };

  const renderPlan = () => {
    if (filteredPlan.length === 0) {
      return <p className="interview-empty">No results match your search.</p>;
    }

    return filteredPlan.map((item) => (
      <article className="plan-card" key={item.day}>
        <div className="plan-card__header">
          <span className="plan-card__day">Day {item.day}</span>
          <span className="plan-card__focus">{item.focus}</span>
        </div>
        <p className="plan-card__task">{item.task}</p>
      </article>
    ));
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "technical":
        return renderQuestions(filteredTechnical);
      case "behavioral":
        return renderQuestions(filteredBehavioral);
      case "roadmap":
        return renderPlan();
      default:
        return null;
    }
  };

  return (
    <main className="interview-page">
      <div className="interview-layout">
        <nav className="interview-nav">
          {Object.entries(SECTIONS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`interview-nav__item ${
                activeSection === key ? "interview-nav__item--active" : ""
              }`}
              onClick={() => setActiveSection(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <section className="interview-main">
          <div className="interview-search">
            <svg
              className="interview-search__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>

            <input
              type="search"
              className="interview-search__input"
              placeholder="Search questions, answers, or roadmap..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="interview-content">{renderMainContent()}</div>
        </section>

        <aside className="interview-sidebar">
          <h2 className="interview-sidebar__title">Match Score</h2>

          {typeof data.matchScore === "number" && (
            <MatchScoreGauge score={data.matchScore} />
          )}

          <h2 className="interview-sidebar__title interview-sidebar__title--gaps">
            Skill Gaps
          </h2>

          <div className="skill-gaps">
            {(data.skillGaps ?? []).length > 0 ? (
              data.skillGaps.map((gap, index) => (
                <span
                  key={index}
                  className={`skill-gap skill-gap--${gap.severity}`}
                  title={`${gap.severity} priority`}
                >
                  {gap.skill}
                </span>
              ))
            ) : (
              <p className="interview-empty">No skill gaps available.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;