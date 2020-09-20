import express from 'express';
import authenticate from './../../middlewares/authenticate';

import BidsController from './bidsController';

const Router = express.Router();

Router.post(
    '/view-access-bid',
    authenticate,
    BidsController.getViewAccess
);

Router.post(
    '/accept-request-bid',
    authenticate,
    BidsController.acceptRequestBid
);

Router.post(
    '/reject-request-bid',
    authenticate,
    BidsController.rejectRequestBid
);

Router.get(
    '/bids',
    authenticate,
    BidsController.fetchBids
);

Router.get(
    '/bid',
    authenticate,
    BidsController.fetchSingleBid
);

Router.post(
    '/bid',
    authenticate,
    BidsController.userBid
);

Router.put(
    '/bid',
    authenticate,
    BidsController.acceptBid
);
 
export default Router;