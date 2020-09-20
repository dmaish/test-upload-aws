import auth from './auth';
import profile from './profile';
import jobPosts from './jobPosts';
import myJobPosts from './myJobPosts';
import bids from './bids';
import categories from './categories';
import comments from './comments';
import payments from './payments';
import admin from './admin';

const apiPrefix = '/api/v1';

const routes = (app) => {
    app.use(apiPrefix, auth);
    app.use(apiPrefix, profile);
    app.use(apiPrefix, jobPosts);
    app.use(apiPrefix, myJobPosts);
    app.use(apiPrefix, bids);
    app.use(apiPrefix, categories);
    app.use(apiPrefix, comments);
    app.use(apiPrefix, payments);
    app.use(apiPrefix, admin);
    return app;
}

export default routes;