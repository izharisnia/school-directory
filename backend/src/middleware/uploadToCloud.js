// backend/src/middleware/uploadToCloud.js
import multer from 'multer';

// store file in memory so we can upload to cloudinary
const storage = multer.memoryStorage();
export const uploadMemory = multer({ storage });
