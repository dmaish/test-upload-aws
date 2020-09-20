'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 999,
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      password: '$2b$10$70miNZz/jT6jjEaG9pjaPu3UC3KXhYg3KReGqNlgTMpjTiG//OI72',
      status: 1,
      nationality: '',
      city: '',
      company: '',
      tagline: 'phidi admin',
      role: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1000,
      firstName: 'jade',
      lastName: 'blue',
      email: 'jadeb9864@gmail.com',
      password: '$2b$10$SlU0qVN91Ti3dD0cSvHfN.5nXCjw8jOlMOzPuc/bfsSHlzUdh7N6m',
      status: 1,
      nationality: 'singapore',
      city: 'palau',
      company: 'hurakan',
      tagline: 'best IOS dev',
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1001,
      firstName: 'quartz',
      lastName: 'red',
      email: 'quartzred932@gmail.com',
      password: '$2b$10$CU1ep0LE0D041UvuxTXjDOOfAxPWhGpKS1vYm//dTcxxkmreNUMYy',
      status: 1,
      nationality: 'USA',
      city: 'florida',
      company: 'hurakan-2',
      tagline: 'best IOS dev-2',
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1002,
      firstName: 'John-1',
      lastName: 'Doe-1',
      email: 'johndoe-1@gmail.com',
      password: '$2b$10$qx8owsI5RhZnAN0UPyVCu.iRNdl4eAV0BKiRc4C0S2bALBYIqtN7G',
      status: 1,
      nationality: 'serbia-3',
      city: 'montecarlo-3',
      company: 'hurakan-3',
      tagline: 'best IOS dev-3',
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
