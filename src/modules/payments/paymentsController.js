import stripe from 'stripe';
import {
  JOB_POST_PAYMENT,
  BID_ACCEPT_PAYMENT,
  BID_PAYMENT 
} from './../../helpers/constants';
import SendgridHandler from './../../helpers/sendGridHandler';
import models from './../../database/models';

import errorHandler from '../../helpers/errorHandler';
import { model } from 'mongoose';
import SendGridHelper from './../../helpers/sendGridHandler';

const stripeObj = stripe(process.env.STRIPE_SECRET_KEY);

class PaymentsController {

    static async getPaymentIntent (req, res) {
        const {paymentType, bidAmount} = req.body.data;
        let chargeAmount = 100;    // this amount is in cents

          if (paymentType === JOB_POST_PAYMENT) {
            chargeAmount = 2500;  // this amount is in cents

          } else if (paymentType === BID_ACCEPT_PAYMENT) {
            chargeAmount = bidAmount * 100.00 ;
          }

        const paymentIntent = await stripeObj.paymentIntents.create({
            amount: chargeAmount,
            currency: "usd"
          });

          if (paymentIntent.client_secret) {
              return res.status(201).json({
                  success: true,
                  message: 'Payment Intent created successfully.',
                  clientSecret: paymentIntent.client_secret
              });

          } else {
            return res.status(500).json({
                success: true,
                message: 'Payment Intent failed.Refresh page.',
            });
          }
          
    }

    static async sendTransactionAlert (req, res) {
      try {
        let message;
        const {paymentType, userId, bidAmount} = req.body.data;

        const user = await models.User.findByPk(userId);
        const {firstName, lastName} = user;

        if (paymentType === JOB_POST_PAYMENT) {
          message = `A payment of $25 recieved from <b> ${firstName} ${lastName} </b> for publishing of a job post.`
        } else if (paymentType === BID_ACCEPT_PAYMENT) {
          message = `A payment of $${bidAmount} has been received from <b> ${firstName} ${lastName} </b> to accept a bid for a job post.`
        } else {
          message = `A payment of $1 has been recieved from <b> ${firstName} ${lastName} </b> to make a bid to a job post.`
        }
        
        const admin = await models.User.findOne({
          where: {
            role: 2,
          }
        }); 

        SendGridHelper.sendPaymentConfirmationEmail(admin.email, message);

        
      } catch (error) {
        errorHandler.handleError(error, 500, res);
        
      }
    }

}

export default PaymentsController;