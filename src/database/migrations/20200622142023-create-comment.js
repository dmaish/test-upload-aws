'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deleted: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      comment: {
        type: Sequelize.STRING(1000)
      },
      edited: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      jobPostId: {
        type: Sequelize.INTEGER,
        onDelete: 'set null',
        allowNull: true,
        references: {
          model: 'JobPosts',
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'set null',
        allowNull: true,
        references: {
          model: 'Users',
        }
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      commentId: {
        type: Sequelize.INTEGER,
        onDelete: 'set null',
        allowNull: true,
        references: {
          model: 'Comments',
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
    return queryInterface.dropTable('Comments');
  }
};