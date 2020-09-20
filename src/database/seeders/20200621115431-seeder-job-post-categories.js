'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      id: 1000,
      category: 'Functional Prototype',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1001,
      category: '3D Model',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1002,
      category: 'UX Prototype',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
