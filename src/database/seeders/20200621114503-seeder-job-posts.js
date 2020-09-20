'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('JobPosts', [{
      id: 1000,
      objective: 'URGENT TASK - 2 Shipping API Integrations (Shipstation + Sendcloud - Magento 2 - Codazon Infinit)',
      toggleObjective: 'I am looking for Magento 2 specialist that have experience in working with the Codazon Infinit We have multistore and multilanguage stores - one for clients in USa and second for clients in EU.',
      visibility: 1,
      budget: 1000,
      userId: 1000,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1001,
      objective: 'Video Production',
      toggleObjective: 'Need a powerful video trailer for my latest Novel. This novel is published by a reputed publications and will be available in lot of offline stores across the country along with e commerce channels. Its a mythological thriller.',
      visibility: 2,
      budget: 2000,
      userId: 1000,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1002,
      objective: '2+ yrs iOS developer with Firebase Firestore experience',
      toggleObjective: ' I need a long term iOS developer with 2+ years of experience.all options of the pixels, the events, tracking url...ONLY FOR FRENCH SPEAKER',
      visibility: 2,
      budget: 3000,
      userId: 1000,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1003,
      objective: 'Product Research/Admin Assistant - Amazon Virtual Assistant',
      toggleObjective: 'We are a U.S. based Amazon seller looking for a talented VA to work from the comfort of their own home and help grow our business.',
      visibility: 1,
      budget: 4000,
      userId: 1000,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1004,
      objective: 'Full stack web developer for Importing Products to Shopify via CSV file.',
      toggleObjective: 'Online store for lovers of homewares, beautiful homes and loving the space you live in.An experienced developer who can assist with IT challenges - particularly how to import CSV files of products to Shopify, an overview to us on how to do this, and how to maintain. Inc updating as new CSV file arrives with product inventory info.',
      visibility: 1,
      budget: 5000,
      userId: 1000,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 1005,
      objective: 'I am looking for a macOS Swift/ SwiftUI or Object C developer (long-term)',
      toggleObjective: 'Looking for productivity applications for macOS (Not iOS) a Swift developer.Experience request: - React Native: 2 years (preferred)- Software development: 3 years (required)- Bachelors degree',
      visibility: 1,
      budget: 6000,
      userId: 1000,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1006,
      objective: 'Manage, create, and post social media content.',
      toggleObjective: 'I am looking for an intermediate-level freelancer with Social Media Marketing experience who can help me plan and complete my project. We are an architecture firm located in the Washington DC metro area. We are looking for someone to create and post social media content on multiple platforms, including a Instagram, Houzz, Pinterest, and Facebook.',
      visibility: 1,
      budget: 7000,
      userId: 1001,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1007,
      objective: 'Editing & Proofreading.',
      toggleObjective: 'I am a PhD student, doing my PhD in Architecture UK. I need English native speaker who has experience in writing PhD thesis.',
      visibility: 1,
      budget: 6000,
      userId: 1001,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1008,
      objective: 'UK Short text writer.',
      toggleObjective: 'Hello we need someone to help us writing 2 short texts (about 100 words) in English. Its a very easy task and it could be a nice opportunity for you if you are just beginning .',
      visibility: 1,
      budget: 100,
      userId: 1002,
      published: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('JobPosts', null, {});
  }
};
