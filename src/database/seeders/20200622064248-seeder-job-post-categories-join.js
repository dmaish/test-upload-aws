'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('JobPostsCategoriesJoins', [{
        id: 1000,
        jobPostId: 1000,
        categoryId: 1001,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1001,
        jobPostId: 1000,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1002,
        jobPostId: 1001,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1003,
        jobPostId: 1001,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1004,
        jobPostId: 1001,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1005,
        jobPostId: 1002,
        categoryId: 1002,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1006,
        jobPostId: 1002,
        categoryId: 1001,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1007,
        jobPostId: 1002,
        categoryId: 1002,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1008,
        jobPostId: 1002,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1009,
        jobPostId: 1003,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1010,
        jobPostId: 1003,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1011,
        jobPostId: 1004,
        categoryId: 1001,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1012,
        jobPostId: 1004,
        categoryId: 1001,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1013,
        jobPostId: 1004,
        categoryId: 1002,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1014,
        jobPostId: 1005,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1015,
        jobPostId: 1005,
        categoryId: 1001,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1016,
        jobPostId: 1005,
        categoryId: 1002,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1017,
        jobPostId: 1007,
        categoryId: 1002,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 1018,
        jobPostId: 1008,
        categoryId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('JobPostsCategoriesJoins', null, {});
  }
};
