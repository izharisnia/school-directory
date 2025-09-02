// backend/fixImages.js
import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";
import path from "path";

// 1️⃣ Setup Sequelize connection (adjust DB credentials as per your .env / config)
const sequelize = new Sequelize("school_directory", "root", "ishnia0523@", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// 2️⃣ Define School model inline
const School = sequelize.define(
  "School",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    contact: DataTypes.STRING,
    email_id: DataTypes.STRING,
    board: DataTypes.STRING,
    hostel: DataTypes.STRING,
    type: DataTypes.STRING,
    medium: DataTypes.STRING,
  },
  {
    tableName: "schools",
    timestamps: false,
  }
);

// 3️⃣ Directory where images are stored
const imagesDir = path.join(process.cwd(), "backend", "public", "schoolImages");

async function fixImages() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    const files = fs.readdirSync(imagesDir);
    console.log(`📸 Found ${files.length} images in folder`);

    for (const file of files) {
      const cleanFile = file.replace(/\s+/g, "-").toLowerCase();
      const dbPath = `schoolImages/${cleanFile}`;

      // Find schools with mismatched/old image names
      const school = await School.findOne({
        where: { image: { [Sequelize.Op.like]: `%${path.basename(file, path.extname(file))}%` } },
      });

      if (school) {
        console.log(`🔄 Updating ${school.name} -> ${dbPath}`);
        school.image = dbPath;
        await school.save();
      } else {
        console.log(`⚠️ No school found for file: ${file}`);
      }
    }

    console.log("✅ Image paths fixed in database");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

fixImages();
