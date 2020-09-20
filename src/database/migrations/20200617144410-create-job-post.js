'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objective: {
        type: Sequelize.STRING(1000)
      },
      toggleObjective: {
        type: Sequelize.STRING(1000)
      },
      visibility: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      savePartially: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      projectUsers: {
        type: Sequelize.STRING(100000),
      },
      aestheticSketches: {
        type: Sequelize.STRING(100000),
      },
      dimensionalSketches: {
        type: Sequelize.STRING(100000),
      },
      prefferedMaterials: {
        type: Sequelize.STRING(1000)
      },
      projectKeyFeatures: {
        type: Sequelize.STRING(100000),
      },
      budget: {
        type: Sequelize.INTEGER,
      },
      metricsOfSuccess: { 
        type: Sequelize.STRING(100000),
      }, 
      milestones: { 
        type: Sequelize.STRING(100000),
      }, 
      targetMSRP: Sequelize.STRING,
      volume: Sequelize.STRING,
      published: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'set null',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'users',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('JobPosts');
  }
};
