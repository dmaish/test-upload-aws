import express from 'express';
import authenticate from './../../middlewares/authenticate';

import ProfileController from './profileController';

const Router = express.Router();

Router.get(
    '/profile',
    authenticate,
    ProfileController.fetchProfile
);

Router.put(
    '/profile',
    authenticate,
    ProfileController.editProfile
);


export default Router;