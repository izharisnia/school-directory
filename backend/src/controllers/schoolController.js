// backend/src/controllers/schoolController.js
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { School } from '../models/School.js'; // or adjust path if using named export

export async function listSchools(_req, res) {
  try {
    const rows = await School.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to fetch schools' });
  }
}

export async function getSchool(req, res) {
  try {
    const one = await School.findByPk(req.params.id);
    if (!one) return res.status(404).json({ error: 'School not found' });
    return res.json(one);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to fetch school' });
  }
}

export async function createSchool(req, res) {
  try {
    const {
      name, address, city, state, contact, email_id,
      board, hostel, type, medium
    } = req.body;

    // If no file -> reject
    if (!req.file) return res.status(400).json({ error: 'Image is required' });

    // Upload to Cloudinary via upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const upload_stream = cloudinary.uploader.upload_stream(
        { folder: 'school_images' }, // optional folder
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(upload_stream);
    });

    const imageUrl = uploadResult.secure_url; // store this in DB

    const created = await School.create({
      name, address, city, state, contact, email_id,
      board, hostel, type, medium,
      image: imageUrl
    });

    return res.status(201).json(created);
  } catch (e) {
    console.error('createSchool error', e);
    return res.status(500).json({ error: 'Failed to create school' });
  }
}
