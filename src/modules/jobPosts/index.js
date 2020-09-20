import express from 'express';
import authenticate from './../../middlewares/authenticate';

import JobPostsController from './jobPostsController';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
  })

var imageUpload = multer({ storage: storage }).fields([{ name: 'aestheticSketches', maxCount: 8 }, { name: 'dimensionalSketches', maxCount: 8 }]); 

const Router = express.Router();

Router.get(
    '/all-job-posts',
    authenticate,              
    JobPostsController.fetchJobPosts
);

Router.get(
    '/job-post-bid',
    authenticate,
    JobPostsController.fetchJobPostBid
);

Router.post(
    '/job-post',
    authenticate,
    imageUpload,
    JobPostsController.createJobPost
)

Router.put(
    '/job-post',
    authenticate,
    JobPostsController.publishJobPost
)

Router.put(
  '/job-post-partially',
  authenticate,
  imageUpload,
  JobPostsController.savePartiallyAlreadyCreatedJobPost
)

Router.put(
  '/job-post-edit',
  authenticate,
  imageUpload,
  JobPostsController.editJobPost
)

Router.put(
  '/publish-job-post-partially',
  authenticate,
  imageUpload,
  JobPostsController.publishPartiallyAlreadyCreatedJobPost
)

export default Router;