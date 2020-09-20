import express from 'express';
import authenticate from './../../middlewares/authenticate';

import MyJobPostsController from './myJobPostsController';

const Router = express.Router();

Router.get(
    '/my-job-posts',
    authenticate,
    MyJobPostsController.fetchMyJobPosts
);

Router.get(
    '/my-job',
    authenticate,
    MyJobPostsController.fetchMyJob
);

export default Router;