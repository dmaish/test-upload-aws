import express from 'express';

import CommentsController from './commentsController';
import authenticate from './../../middlewares/authenticate';

const Router = express.Router();


Router.post(
    '/comments',
    authenticate,
    CommentsController.postComment
);

Router.delete(
    '/comments',
    authenticate,
    CommentsController.deleteReply
);

Router.put(
    '/comments',
    authenticate,
    CommentsController.editReply
);

Router.delete(
    '/comment',
    authenticate,
    CommentsController.deleteComment
);

export default Router;