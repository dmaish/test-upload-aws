'use strict';

const jobPost = require("../models/jobPost");

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Comments', [{
        id: 1000,
        comment: 'I am a magento specialist but I need more details about the logistics of the gig.This is because I live in Egypt and I can only work remote.',
        jobPostId: 1000,
        userId: 1002,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1002,
        comment: 'Heeey, sure, you can always work remote.Just make sure you bid then we can have a conversation.',
        userId: 1000,
        commentId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1003,
        comment: 'Also be on the lookout for a bid accept email soon.Then we can lay out other details about the gig',
        userId: 1000,
        commentId: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1004,
        comment: 'Link me on this gig!',
        jobPostId: 1000,
        userId: 1001,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
