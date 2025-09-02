import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/db.js';
import schoolRoutes from './routes/schoolRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(schoolRoutes);

async function start() {
  await connectDB();
  await sequelize.sync(); // sync models
  app.listen(PORT, () => console.log(`✅ API listening on http://localhost:${PORT}`));
}

start();
