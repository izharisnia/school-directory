import { Router } from 'express';
import { listSchools, getSchool, createSchool } from '../controllers/schoolController.js';
import { uploadMemory } from '../middleware/uploadToCloud.js';

const router = Router();

// Corrected GET routes
router.get('/schools', listSchools);
router.get('/schools/:id', getSchool);

// Corrected POST route (from previous fix)
router.post('/schools', uploadMemory.single('image'), createSchool);

export default router;