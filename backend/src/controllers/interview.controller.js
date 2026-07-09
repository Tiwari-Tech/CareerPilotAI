const pdfParse = require('pdf-parse');
const { generateInterviewReport } = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

/**
 * @desc Controller to generate interview report based on resume, self description and job description
 */
async function generateInterviewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required" });
        }
        if (!req.file && !selfDescription) {
            return res.status(400).json({ message: "Either a resume file or a self description is required" });
        }

        let resumeText = "";
        if (req.file) {
            const parsed = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
            resumeText = parsed.text;
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        });

        res.status(201).json({
            message: "Interview report generated successfully",
            data: interviewReport
        });

    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ message: err.message });
    }
}

/**
 * @desc Controller to get interview report by interviewId
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        });
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(400).json({ message: "Invalid interview id" });
    }
}

/**
 * @desc Controller to get all interview reports of the logged in user
 * @access Private
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select('-resume -selfDescription -jobDescription -__v -technicalQuestions.answer -behavioralQuestions.answer -skillGaps -preparationPlan');

        res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports
        });
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ message: err.message });
    }
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController };