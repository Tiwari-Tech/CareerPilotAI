const { GoogleGenAI } = require("@google/genai");

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_API_KEY
    });

    try {
        const prompt = `Generate an interview report as a valid JSON object only. No extra text.

        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}

        The "preparationPlan" MUST contain exactly 7 entries, one for each day from day 1 to day 7, forming a complete week-long preparation roadmap that progressively builds toward the interview.

        Return ONLY this JSON structure with no extra text or markdown:
        {
            "matchScore": 75,
            "technicalQuestions": [
                {"question": "question text here", "intention": "intention text here", "answer": "answer text here"},
                {"question": "question text here", "intention": "intention text here", "answer": "answer text here"},
                {"question": "question text here", "intention": "intention text here", "answer": "answer text here"}
            ],
            "behavioralQuestions": [
                {"question": "question text here", "intention": "intention text here", "answer": "answer text here"},
                {"question": "question text here", "intention": "intention text here", "answer": "answer text here"}
            ],
            "skillGaps": [
                {"skill": "skill name here", "severity": "high"},
                {"skill": "skill name here", "severity": "medium"},
                {"skill": "skill name here", "severity": "low"}
            ],
            "preparationPlan": [
                {"day": 1, "focus": "focus area here", "task": "task description here"},
                {"day": 2, "focus": "focus area here", "task": "task description here"},
                {"day": 3, "focus": "focus area here", "task": "task description here"},
                {"day": 4, "focus": "focus area here", "task": "task description here"},
                {"day": 5, "focus": "focus area here", "task": "task description here"},
                {"day": 6, "focus": "focus area here", "task": "task description here"},
                {"day": 7, "focus": "focus area here", "task": "task description here"}
            ],
            "title": "a short descriptive title for this interview report, based on the job description"
        }`;

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const cleaned = response.text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleaned);

    } catch (error) {
        console.error("❌ AI generation error:", error);
        throw error;
    }
}

module.exports = {
    generateInterviewReport
};