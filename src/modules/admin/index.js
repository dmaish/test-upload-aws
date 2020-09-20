import express from 'express';
import loggedInAdminVerify from './../../middlewares/loggedInAdminVerify';
import loginAdminVerify from './../../middlewares/loginAdminVerify';

import AdminController from './adminController';

const Router = express.Router();

Router.get(
    '/admin-users',
    loggedInAdminVerify,
    AdminController.fetchUsers
);

Router.get(
    '/admin-comments',
    loggedInAdminVerify,
    AdminController.fetchComments
);

Router.put(
    '/admin-show-comment',
    loggedInAdminVerify,
    AdminController.showComment
)

Router.put(
    '/admin-hide-comment',
    loggedInAdminVerify,
    AdminController.hideComment
)

Router.put(
    '/admin-activate-user',
    loggedInAdminVerify,
    AdminController.activateUser
)

Router.put(
    '/admin-deactivate-user',
    loggedInAdminVerify,
    AdminController.deactivateUser
)

Router.post(
    '/admin-login',
    loginAdminVerify,
    AdminController.adminLogin
)

export default Router;