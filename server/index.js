import sequelize from '../config/database.js';

// Import models
import User from './User.js';
import Job from './Job.js';
import Application from './Application.js';
import Message from './Message.js';

// Define associations
Job.belongsTo(User, { as: 'employer', foreignKey: 'employerId' });
Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });
Application.belongsTo(User, { foreignKey: 'userId' });

// Sync database
const syncDatabase = async () => {
  try {
    // First, authenticate the connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Drop all tables
    await sequelize.drop();

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Sync models in correct order (User first, then models that reference User)
    await User.sync({ force: true });
    await Job.sync({ force: true });
    await Application.sync({ force: true });
    await Message.sync({ force: true });
    
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
};

// Initialize database
syncDatabase();

export { User, Job, Application, Message }; 