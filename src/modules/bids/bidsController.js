import jwt from 'jsonwebtoken';
import errorHandler from '../../helpers/errorHandler';
import models from './../../database/models';
import SendGridHandler from './../../helpers/sendGridHandler';
import dotenv from 'dotenv';
import stripe from 'stripe';

import { 
    BID_TYPE_BID, 
    BID_TYPE_REQUEST
} from './../../helpers/constants';

const stripeObj = stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();

class BidsController {
    static async getViewAccess (req, res) {

        try {
            const { jobPostId } = req.body.data;
            let token = req.headers['authorization'];
            token = token.slice(7, token.length);
            const email = await jwt.verify(token, process.env.SECRET_KEY).email;

            const user = await models.User.findOne({
                where: {email: email},
            });

            const alreadyAccessBid = await models.Bid.findOne({
                where : {
                    type: 2,
                    userId: user.id,
                    jobPostId
                }
            });

            if (alreadyAccessBid) {
                return res.status(405).json({
                    success: true,
                    message: 'you have already sent a view access bid to this job post',
                });

            } else {

                const response = await models.Bid.create({
                    type: 2,
                    userId: user.id,
                    jobPostId
                }); 

                if (response.dataValues){
                    const jobPostOwner = await models.JobPost.findOne({
                        where: {
                            id: jobPostId,
                        },
                        include: [{
                            model: models.User,
                            }],
                    });

                    const jobPostToBid = await models.JobPost.findOne({
                        where : {
                            id: jobPostId,
                        },
                        include: [{
                            model: models.User,
                            attributes: ['email', 'firstName']
                        }]
                    }); 

                    const {email, firstName} = jobPostToBid.User;

                    SendGridHandler.sendAccessAuthorizationBidEmail(firstName, email, jobPostId); 

                    return res.status(200).json({
                        success: true,
                        message: 'access bid sent successfully.',
                    });
                } else {
                    return res.status(405).json({
                        success: false,
                        message: 'access bid not successful.Try again.',
                    });
                }
    
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async acceptRequestBid(req, res) {

        try {
            const { bidId } = req.body.data;
            const acceptedRequestBid = await models.Bid.update(
                    { status: 2 },
                    { where: { id: bidId }}
                );
            if (acceptedRequestBid[0] === 1) {

                const privateBid = await models.Bid.findOne({
                    where: {
                        id: bidId,
                    },
                    include: [{
                        model: models.User,
                        },{
                            model: models.JobPost,
                        }],
                });

                const bidderEmail = privateBid.User.email;
                const jobPostId = privateBid.JobPost.id;

                SendGridHandler.sendAccessAuthorizationBidAccepted(bidderEmail, jobPostId);

                return res.status(200).json({
                    success: false,
                    message: 'view access request accepted successfully.',
                });
            } else {
                return res.status(405).json({
                    success: false,
                    message: 'view access not successful.Try again.',
                });
            }
            
        } catch (error) {
            console.log(error)
            errorHandler.handleError(error, 500, res);
        }

    }

    static async rejectRequestBid(req, res) {
        try {
            const {bidId} = req.body.data;
            const rejectedBid = await models.Bid.update({
                status: 0
            }, { 
                where: { id: bidId } 
            }
            );

            if(rejectedBid[0] === 1) {

                const privateBid = await models.Bid.findOne({
                    where: {
                        id: bidId,
                    },
                    include: [{
                        model: models.User,
                        },{
                            model: models.JobPost,
                        }],
                });

                const bidderEmail = privateBid.User.email;
                const jobPostId = privateBid.JobPost.id;

                SendGridHandler.sendAccessAuthorizationBidRejected(bidderEmail);

                return res.status(200).json({
                    success: true,
                    message: 'Bid successfully rejected.'
                });
            } else {
                return res.status(500).json({
                    success: true,
                    message: 'Bid rejection not successfull.Please try again.'
                });
            }
            
        } catch (error) {
            
        }
    }

    static async acceptBid(req, res) {
        try {
            const {bidId} = req.body.data;
            const acceptedBid = await models.Bid.update({
                status: 2
            }, { 
                where: { id: bidId } 
            }
            );

            if(acceptedBid[0] === 1) {
                // get the bidder's ID and send them an email
                const bid = await models.Bid.findOne({
                    where: bidId,
                    include: [{
                        model: models.User,
                        attributes: ['email']
                    }]
                });
                const bidderEmail = bid.User.email;

                SendGridHandler.sendAcceptedBidEmail(bidderEmail, bidId);

                return res.status(200).json({
                    success: true,
                    message: 'Bid successfully accepted.'
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Bid acceptance not successfull.Please try again.'
                });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async fetchBids (req, res) {

        try {

            let token = req.headers['authorization'];
            token = token.slice(7, token.length);
            const email = await jwt.verify(token, process.env.SECRET_KEY).email;

            const user = await models.User.findOne({
                where: {email: email},
            });

            const bids = await  models.Bid.findAll({
                order: [ ['createdAt', 'DESC' ]],
                where: {
                    userId: user.id,
                },
                include: [{
                    model: models.JobPost,
                }]
            });


            return res.status(200).json({
                success: true,
                message: 'Bids fetched successfully.',
                bids: bids,
            });

        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async fetchSingleBid (req, res) {

        try {
            const {id} = req.query;
            const bid = await models.Bid.findOne({
                where: {
                    id: id,
                },
                include: [{
                    model: models.JobPost,
                    }],
            })

            return res.status(200).json({
                success: true,
                message: 'Bid fetched successfully.',
                bid: bid,
            });
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async userBid (req, res) {
        try {
            const {user} = req;
            let bidNote = '';
            let amount = null;
            const {jobPostId} = req.body.data;
            bidNote = req.body.data.bidNote;
            amount = req.body.data.amount;

            const activeUser = await models.User.findOne({
                where: {email: user.email},
            });

            const alreadyAccessBid = await models.Bid.findOne({ 
                where : {
                    userId: activeUser.id,
                    jobPostId: jobPostId,
                }
            });


            if (alreadyAccessBid) { 
                if (alreadyAccessBid.type === BID_TYPE_BID) {
                    return res.status(405).json({
                            success: true,
                            message: 'you have already sent a bid to this job post',
                        });

                } else {
                    const response = await models.Bid.update(
                        {
                            note: bidNote,
                            amount: Number(amount),
                            status: 1,
                            type: 1,
                        },
                        { where: { id: alreadyAccessBid.id }},
                        );

                        if (response[0] === 1) {
                            return res.status(201).json({
                                success: true,
                                message: 'successfully applied to job post.'
                            });
                        }
                }

            } else {
                const response = await models.Bid.create({
                    userId: activeUser.id,
                    jobPostId: jobPostId,
                    note: bidNote,
                    amount: Number(amount)
                }); 

                if (response.dataValues) {

                    // find the jobPostOwner's email then send them a link to that job post
                    const jobPostToBid = await models.JobPost.findOne({
                        where : {
                            id: jobPostId,
                        },
                        include: [{
                            model: models.User,
                            attributes: ['email', 'firstName']
                        }]
                    }); 

                    const {email, firstName} = jobPostToBid.User;
                    SendGridHandler.sendBidEmailToJobPostOwner(firstName, email, jobPostId); 

                    return res.status(201).json({
                        success: true,
                        message: 'successfully applied to job post.',
                    });
                } else {
                    return res.status(405).json({
                        success: false,
                        message: 'access bid not successful.Try again.',
                    });
                }
            }

            
        } catch (error) {
            console.log('xxxxdddddd', error);
            errorHandler.handleError(error, 500, res);
        }
    }


}

export default BidsController;