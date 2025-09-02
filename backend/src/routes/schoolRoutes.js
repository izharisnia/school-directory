import { Router } from 'express';
import { listSchools, getSchool, createSchool } from '../controllers/schoolController.js';
import { uploadMemory } from '../middleware/uploadToCloud.js';

const router = Router();
router.get('/schools', listSchools);
router.get('/schools/:id', getSchool);

// use uploadMemory.single('image') so req.file is available in memory
router.post('/schools', uploadMemory.single('image'), createSchool);

export default router;
