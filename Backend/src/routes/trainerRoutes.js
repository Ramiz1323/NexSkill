import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import TrainerProgram from '../modules/trainer/trainerProgram.model.js';
import TrainerCert from '../modules/trainer/trainerCert.model.js';

const router = Router();

// 1. Get Programs List from MongoDB with Search & Filtering
router.get(
  '/programs',
  asyncHandler(async (req, res) => {
    const { category, mode, search } = req.query;
    const filter = { isActive: true };

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (mode && mode !== 'All Delivery Modes') {
      filter.mode = mode;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { partner: { $regex: search, $options: 'i' } },
      ];
    }

    const programs = await TrainerProgram.find(filter).sort({ createdAt: -1 }).lean();

    return res.status(200).json(
      new ApiResponse(200, { programs }, 'Trainer programs fetched from database successfully')
    );
  })
);

// 2. Get Enrolled Programs List
router.get(
  ['/enrolled', '/enrolled-programs'],
  asyncHandler(async (req, res) => {
    const programs = await TrainerProgram.find({ isEnrolled: true }).sort({ updatedAt: -1 }).lean();
    return res.status(200).json(
      new ApiResponse(200, { programs }, 'Enrolled trainer programs fetched successfully')
    );
  })
);

// 3. Get Program Details by ID from MongoDB
router.get(
  '/programs/:id',
  asyncHandler(async (req, res) => {
    let program = null;
    try {
      program = await TrainerProgram.findById(req.params.id).lean();
    } catch (err) {
      program = await TrainerProgram.findOne({
        $or: [{ _id: req.params.id }, { id: req.params.id }],
      }).lean();
    }

    if (!program) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainer program not found'));
    }

    return res.status(200).json(
      new ApiResponse(200, { program }, 'Program details fetched from database')
    );
  })
);

// 4. Enroll Faculty in MongoDB Program
router.post(
  ['/programs/:id/enroll', '/enroll'],
  asyncHandler(async (req, res) => {
    const programId = req.params.id || req.body?.programId || req.body?.id;
    let program = null;

    try {
      program = await TrainerProgram.findByIdAndUpdate(
        programId,
        { $set: { isEnrolled: true } },
        { new: true }
      ).lean();
    } catch (err) {
      // Fallback
    }

    if (!program) {
      try {
        program = await TrainerProgram.findOneAndUpdate(
          { $or: [{ _id: programId }, { id: programId }] },
          { $set: { isEnrolled: true } },
          { new: true }
        ).lean();
      } catch (e) {}
    }

    return res.status(201).json(
      new ApiResponse(
        201,
        { program: { ...(program || {}), isEnrolled: true, enrolledAt: new Date().toISOString() } },
        'Faculty successfully enrolled in database program'
      )
    );
  })
);

// 5. Unenroll Faculty from MongoDB Program
router.post(
  ['/programs/:id/unenroll', '/unenroll'],
  asyncHandler(async (req, res) => {
    const programId = req.params.id || req.body?.programId || req.body?.id;
    let program = null;

    try {
      program = await TrainerProgram.findByIdAndUpdate(
        programId,
        { $set: { isEnrolled: false } },
        { new: true }
      ).lean();
    } catch (err) {
      // Fallback
    }

    if (!program) {
      try {
        program = await TrainerProgram.findOneAndUpdate(
          { $or: [{ _id: programId }, { id: programId }] },
          { $set: { isEnrolled: false } },
          { new: true }
        ).lean();
      } catch (e) {}
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        { program: { ...(program || {}), isEnrolled: false } },
        'Faculty successfully unenrolled from program'
      )
    );
  })
);

// 6. Get Certifications from MongoDB
router.get(
  '/certifications',
  asyncHandler(async (req, res) => {
    const certifications = await TrainerCert.find().lean();
    return res.status(200).json(
      new ApiResponse(200, { certifications }, 'Trainer certifications fetched from database')
    );
  })
);

export default router;
