import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jobs',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'),
    defaultValue: 'pending'
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'applications',
  timestamps: true
});

export default Application; 