const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const interviewRouter = express.Router();
const upload = require('../middlewares/file.middleware');




    /**
     * @route POST /api/interview
     * @desc Generate new interview report on the basis of resume user self description,resume pdf and job description
     * @access Private
     * */
    interviewRouter.post("/", authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController);

    /**
     * @route GET /api/interview/report/:interviewId
     * @desc Get interview report by interviewId
     * @access Private
     * */
    interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);  
    
    
    /**
     * @route GET /api/interview
     * @desc Get all interview reports of the logged in user
     * @access Private
     * */
    interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);


    







module.exports = interviewRouter;