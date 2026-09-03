import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';
import resumeService from './resume.service.js';

export const uploadAndAnalyzeResumeHandler = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Please upload a resume file (PDF, DOC, DOCX)');
  }

  const analysis = await resumeService.analyzeResumeContent({
    filePath: req.file.path,
    originalName: req.file.originalname,
    targetRole: req.body.targetRole || 'Software Engineer',
    userId: req.user ? req.user.id : null,
  });

  return res.status(200).json(
    new ApiResponse(200, analysis, 'Resume analyzed successfully against ATS benchmark')
  );
});

export default {
  uploadAndAnalyzeResumeHandler,
};
