module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Users', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          username: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          },
          password: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          created_at: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.fn('NOW'),
          },
      });
  },
  down: async (queryInterface) => {
      await queryInterface.dropTable('Users');
  },
};