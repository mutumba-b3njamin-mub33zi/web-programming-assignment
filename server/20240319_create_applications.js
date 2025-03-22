export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('applications', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    jobId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    status: {
      type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'withdrawn'),
      defaultValue: 'pending'
    },
    coverLetter: {
      type: Sequelize.TEXT
    },
    resume: {
      type: Sequelize.STRING
    },
    appliedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  // Add indexes
  await queryInterface.addIndex('applications', ['userId']);
  await queryInterface.addIndex('applications', ['jobId']);
  await queryInterface.addIndex('applications', ['status']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('applications');
} 