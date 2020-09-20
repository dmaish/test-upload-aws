import express from 'express';

import authenticate from './../../middlewares/authenticate';
import PaymentsController from './paymentsController';

const Router = express.Router();

Router.post(
    '/get-payment-intent',
    authenticate,
    PaymentsController.getPaymentIntent
);
 
Router.post(
    '/transaction-alert',
    authenticate,
    PaymentsController.sendTransactionAlert

)
export default Router;