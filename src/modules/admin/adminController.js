import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import errorHandler from '../../helpers/errorHandler';
import models from './../../database/models';
import Sequelize, { QueryTypes } from 'sequelize';
import dotenv from 'dotenv';

import {
    BID_TYPE_BID
} from './../../helpers/constants';

dotenv.config();

class AdminController {
    static async fetchUsers(req, res) {
        try {
            
            if (req.query.id == null && req.query.firstName == null && req.query.lastName == null) {

                const users = await models.User.findAll({
                    where: {
                        role: 1,
                    },
                    order: [['createdAt', 'DESC' ]],
                });

                return res.status(200).json({
                    success: true,
                    message: 'users fetched successfully.',
                    users: users,
                });

            } else {
                const users = await models.User.findAll({
                    order: [['createdAt', 'DESC' ]],
                    where: {...req.query, role: 1}
                });

                return res.status(200).json({
                    success: true,
                    message: 'users fetched successfully.',
                    users: users,
                });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async fetchComments(req, res) {
        try {

            const userWhereClause = (firstName, lastName) => {
                if (firstName && lastName) {
                    return {
                        model: models.User,
                        where: {
                            firstName: firstName ? firstName : null,
                            lastName: lastName ? lastName : null,
                        },
                        attributes: ['nationality', 'city', 'createdAt', 'firstName', 'lastName', 'id']
                    }
                } else {
                    return {
                        model: models.User,
                        attributes: ['nationality', 'city', 'createdAt', 'firstName', 'lastName', 'id']
                    }
                }
            }

            const Op = Sequelize.Op;

            if (req.query.userId == null && req.query.firstName == null && req.query.lastName == null && 
                req.query.jobPostId == null && req.query.jobPost == null && 
                req.query.id == null && req.query.comment == null) {

                    const comments = await models.Comment.findAll({
                        order: [['createdAt', 'DESC' ]],
                    include: [{
                            model: models.User,
                            attributes: ['nationality', 'city', 'createdAt', 'firstName', 'lastName', 'id']
                        },]
                    });

                    return res.status(200).json({
                        success: true,
                        message: 'comments fetched successfully.',
                        comments: comments,
                    });

            } else if (req.query.comment && !req.query.jobPost) {

                const {firstName, lastName} = req.query;
                delete req.query.firstName;
                delete req.query.lastName;
                delete req.query.id;

                var seachableComment = req.query.comment.split(' ').join('|');
                delete req.query.comment;
                const matchingComments = await models.sequelize.query(`
                    SELECT *
                    FROM "Comments"
                    WHERE _comment_searchable @@ to_tsquery('english', :query);
                    `, {
                    type: QueryTypes.SELECT,
                    replacements: { query: seachableComment },
                });

                const comments = await Promise.all(
                    matchingComments.map((eachComment) => 
                        models.Comment.findOne({
                            where: {
                                id: eachComment.id,
                                ...req.query,
                            },
                                include: [userWhereClause(firstName, lastName)]
                        })
                    )
                );

                const nullValuesRemovedComments = comments.filter(comment => comment);

                return res.status(200).json({
                    success: true,
                    message: 'comments fetched successfully.',
                    comments: nullValuesRemovedComments,
                });


            } else if (!req.query.comment && req.query.jobPost) {
                var seachableJobPost= req.query.jobPost.split(' ').join('|');


                const {firstName, lastName} = req.query;
                delete req.query.firstName;
                delete req.query.lastName;
                delete req.query.jobPost;
                delete req.query.jobPostId;

                const matchingJobPosts = await models.sequelize.query(`
                    SELECT *
                    FROM "JobPosts"
                    WHERE _searchable @@ to_tsquery('english', :query);
                    `, {
                    type: QueryTypes.SELECT,
                    replacements: { query: seachableJobPost},
                });

                const userDependentQuery = (eachJobPost) => {

                    const  query = firstName ?
                        { where: {
                            jobPostId: eachJobPost.id,
                            ...req.query,
                        },
                        include: [userWhereClause(firstName, lastName)]} 
                        : 
                        { where: {
                            jobPostId: eachJobPost.id,
                            ...req.query,
                        },
                        include: [{
                            model: models.User,
                            attributes: ['nationality', 'city', 'createdAt', 'firstName', 'lastName', 'id']
                        },]}

                        return query;
                        
                    }
                

                const comments = await Promise.all(
                    matchingJobPosts.map(async(eachJobPost) => {
                       const commentsArray = await models.Comment.findAll({
                        order: [['createdAt', 'DESC' ]],
                            ...userDependentQuery(eachJobPost)
                        })
                        return commentsArray;
                        }
                    )
                );
                const flatCommentsArray = comments.flat(1);
                const nullValuesRemovedComments = flatCommentsArray.filter(comment => comment);

                return res.status(200).json({
                    success: true,
                    message: 'comments fetched successfully.',
                    comments: nullValuesRemovedComments,
                });

            } else if (req.query.comment && req.query.jobPost) {
                var seachableJobPost= req.query.jobPost.split(' ').join('|');


                const {firstName, lastName} = req.query;
                delete req.query.firstName;
                delete req.query.lastName;
                delete req.query.jobPost;
                delete req.query.jobPostId;

                const matchingJobPosts = await models.sequelize.query(`
                    SELECT *
                    FROM "JobPosts"
                    WHERE _searchable @@ to_tsquery('english', :query);
                    `, {
                    type: QueryTypes.SELECT,
                    replacements: { query: seachableJobPost},
                });

                const jobPostsIds = matchingJobPosts.map((eachJobPost) => {
                    return eachJobPost.id;
                });

                delete req.query.id;

                var seachableComment = req.query.comment.split(' ').join('|');
                delete req.query.comment;

                const matchingComments = await models.sequelize.query(`
                    SELECT *
                    FROM "Comments"
                    WHERE _comment_searchable @@ to_tsquery('english', :query);
                    `, {
                    type: QueryTypes.SELECT,
                    replacements: { query: seachableComment },
                });

                const comments = await Promise.all(
                    matchingComments.map((eachComment) => 
                        models.Comment.findOne({
                            where: {
                                id: eachComment.id,
                                jobPostId: {
                                    [Op.in]: jobPostsIds
                                },
                                ...req.query
                            },
                            include: [userWhereClause(firstName, lastName)]
                        })
                    )
                );

                const nullValuesRemovedComments = comments.filter(comment => comment);

                return res.status(200).json({
                    success: true,
                    message: 'comments fetched successfully.',
                    comments: nullValuesRemovedComments,
                });

            } else {

                if (!req.query.comment && !req.query.jobPost) {
                    const {firstName, lastName} = req.query;
                    delete req.query.firstName;
                    delete req.query.lastName;

                    const comments = await models.Comment.findAll({
                        order: [['createdAt', 'DESC' ]],
                        where: req.query,
                        include: [
                            userWhereClause(firstName, lastName)
                        ]
                    });

                    return res.status(200).json({
                        success: true,
                        message: 'comments fetched successfully.',
                        comments: comments,
                    });

                } 
        }
            
        } catch (error) {
            console.log(error)
            errorHandler.handleError(error, 500, res);
            
        }
    }

    static async showComment (req, res) {
        try {
            const {id} = req.body;
            const shownComment = await models.Comment.update(
                { active: true} ,
                { where: {
                    id
                }}
            )

            if (shownComment[0] === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'Comment successfully shown.'
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'Comment not shown successfully.Please try again.',
                  });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
            
        }
    }

    static async hideComment (req, res) {
        try {
            const {id} = req.body;
            const hiddenComment = await models.Comment.update(
                { active: false} ,
                { where: {
                    id
                }}
            )

            if (hiddenComment[0] === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'Comment successfully hidden.'
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'Comment not hidden successfully.Please try again.',
                  });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
            
        }
    }

    static async activateUser (req, res) {
        try {
            const {id} = req.body;
            const activatedUser = await models.User.update(
                { active: true} ,
                { where: {
                    id
                }}
            )

            if (activatedUser[0] === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'User successfully activated.'
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'User not activated successfully.Please try again.',
                  });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
            
        }
    }

    static async deactivateUser (req, res) {
        try {
            const {id} = req.body;
            const activatedUser = await models.User.update(
                { active: false} ,
                { where: {
                    id
                }}
            )

            if (activatedUser[0] === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'User successfully deactivated.'
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'User not deactivated successfully.Please try again.',
                  });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
            
        }
    }
    
    static async adminLogin (req, res){
        try {
            const {email, password} = req.body;

            //check if user already exists
            const userExists = await models.User.findOne({
                where: {email: email},
            });

            if (userExists){
                if (userExists.dataValues.status){
                    if (bcrypt.compareSync(password, userExists.dataValues.password)) {

                        const token = jwt.sign({
                        email,
                        }, process.env.SECRET_KEY, { expiresIn: '2h' });

                        return res.status(200).json({
                        success: true,
                        message: 'Logged in successfully.',
                        user: userExists.firstName,
                        id: userExists.id,
                        token,
                        });
                    }
                    return res.status(403).json({
                        success: false,
                        message: 'Password not correct.',
                    });
                }else{
                    return res.status(403).json({
                        success: false,
                        message: 'Log in failed.Confirm email then log in.',
                    });
                }
                
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'No user exists with such email.',
                  });
            }


        } catch (error) {
            console.log('LOGIN ERROR', error);
            errorHandler.handleError(error, 500, res);
        }
    }
}

export default AdminController;