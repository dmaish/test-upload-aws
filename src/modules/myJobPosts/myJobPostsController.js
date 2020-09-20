import jwt from 'jsonwebtoken';

import errorHandler from '../../helpers/errorHandler';
import models from './../../database/models';
import dotenv from 'dotenv';

dotenv.config();
class MyJobPostsController {
    static async fetchMyJobPosts(req, res) {
        try {
            let token = req.headers['authorization'];
            token = token.slice(7, token.length);
            const email = await jwt.verify(token, process.env.SECRET_KEY).email;
            const user = await models.User.findOne({
                where: {email: email},
            });

            const myJobPosts = await models.JobPost.findAll({
                order: [ ['createdAt', 'DESC' ]],
                where: {
                    userId: user.id
                },
                include: [{
                    model: models.Bid,
                    as: 'bids',
                    attributes: ['id', 'amount', 'type'],
                    include: [{
                        model: models.User,
                        attributes: ['id'],
                        where: {
                            active: true,
                        },
                    }]
                }]
            });

            return res.status(200).json({
                success: true,
                message: 'My Job posts fetched successfully.',
                myJobPosts: myJobPosts,
            });
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async fetchMyJob(req, res) {
        try {
            const {id} = req.query;

            const myJob = await models.JobPost.findOne({
                    where: { id: id },
                    include: [{
                        model: models.Comment,
                        as: 'comments',
                        where: {
                            active: true,
                        },
                        required: false ,
                        include: [{
                            model: models.User,
                            attributes: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
                            where: {
                                active: true,
                            },
                        },
                        {
                            model: models.Comment,
                            where: {
                                active: true,
                            },
                            required: false,
                            include: [{
                                model: models.User,
                                attributes: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
                                where: {
                                    active: true,
                                },
                            }]
                        }]
                    },
                    {
                        model: models.Bid,  
                        as: 'bids',
                        include: [{
                            model: models.User,
                            attributes: ['id', 'firstName', 'lastName', 'email'],
                            where: {
                                active: true,
                            }
                        }]
                    },
                    {
                        model: models.Category,  
                        as: 'categories',
                    }]
                });

            return res.status(200).json({
                success: true,
                message: 'My Job fetched successfully.',
                myJob: myJob,
            });
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }
}

export default MyJobPostsController;