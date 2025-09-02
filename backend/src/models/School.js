import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const School = sequelize.define('School', {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  email_id: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },

  // New fields
  board: { type: DataTypes.STRING, allowNull: true },
  hostel: { type: DataTypes.STRING, allowNull: true },  // Yes / No
  type: { type: DataTypes.STRING, allowNull: true },    // All Girls / All Boys / Co-education
  medium: { type: DataTypes.STRING, allowNull: true }   // English / Hindi / Regional / Bilingual
}, {
  tableName: 'schools'
});
