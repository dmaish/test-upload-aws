import jwt from 'jsonwebtoken';
import errorHandler from '../../helpers/errorHandler';
import models from './../../database/models';
import Sequelize, { QueryTypes } from 'sequelize';
import multer from 'multer';
import dotenv from 'dotenv';

import {
    BID_TYPE_BID
} from './../../helpers/constants';

dotenv.config();

class JobPostsController {
    static async fetchJobPosts(req, res) {
        try {
            const Op = Sequelize.Op;

            if (req.query.categories && !req.query.jobPostTitle) {
                const searchableCategoriesIds = req.query.categories.map((eachCategory) => {
                    let parsedCategory = JSON.parse(eachCategory);
                    return parsedCategory.id;
                });
                
                const jobPosts = await models.JobPost.findAll({
                    order: [['createdAt', 'DESC' ]],
                    where: {
                        published: 2,
                        createdAt: {
                            [Op.gte]: new Date(
                                new Date().getFullYear(),
                                new Date().getMonth() - 2, 
                                new Date().getDate()
                            )
                        },
                        '$User.active$': true,
                    },
                    include: [{
                        model: models.User,
                        attributes: ['nationality', 'city', 'createdAt', ]
                    },
                    {
                        model: models.Bid,
                        as: 'bids',
                        where: {
                            type: 2,
                            status: {
                                [Op.or]: [0,2]
                            },
                        },
                        required: false
                    },
                    {
                        model: models.Category,
                        as: 'categories',
                        through: models.JobPostsCategoriesJoin,
                        where: {
                            id: {
                                [Op.in]: searchableCategoriesIds
                            }
                        }
                    }],
                },
                );

                return res.status(200).json({
                    success: true,
                    message: 'Job posts fetched successfully.',
                    jobPosts: jobPosts,
                });


            } else if ( !req.query.categories && req.query.jobPostTitle ) {
                var seachableJobPostTitle = req.query.jobPostTitle.split(' ').join('|');

                const matchingJobPosts = await models.sequelize.query(`
                    SELECT *
                    FROM "JobPosts"
                    WHERE _searchable @@ to_tsquery('english', :query);
                    `, {
                    type: QueryTypes.SELECT,
                    replacements: { query: seachableJobPostTitle },
                });


                const jobPosts =  await Promise.all(
                    matchingJobPosts.map((eachJobPost) => 
                        models.JobPost.findOne({
                            order: [['createdAt', 'DESC' ]],
                            where: {
                                id: eachJobPost.id,
                                published: 2,
                                createdAt: {
                                    [Op.gte]: new Date(
                                        new Date().getFullYear(),
                                        new Date().getMonth() - 2, 
                                        new Date().getDate()
                                    )
                                },
                                '$User.active$': true,
                            },
                            include: [{
                                model: models.User,
                                attributes: ['nationality', 'city', 'createdAt', ]
                            },
                            {
                                model: models.Bid,
                                as: 'bids',
                                where: {
                                    type: 2,
                                    status: {
                                        [Op.or]: [0,2]
                                    },
                                },
                                required: false
                            },
                            {
                                model: models.Category,
                                as: 'categories',
                                through: models.JobPostsCategoriesJoin,
                            }],
                        },)
                    )
                )

                const nullValuesRemovedJobPosts = jobPosts.filter(jobPost => jobPost);

                return res.status(200).json({
                    success: true,
                    message: 'Job posts fetched successfully.',
                    jobPosts: nullValuesRemovedJobPosts,
                });
                

            } else if ( req.query.categories && req.query.jobPostTitle ) {
                var seachableJobPostTitle = req.query.jobPostTitle.split(' ').join('|');

                const searchableCategoriesIds = req.query.categories.map((eachCategory) => {
                    let parsedCategory = JSON.parse(eachCategory);
                    return parsedCategory.id;
                });

                const matchingJobPosts = await models.sequelize.query(`
                    SELECT *
                    FROM "JobPosts"
                    WHERE _searchable @@ to_tsquery('english', :query);
                    `, {
                    type: QueryTypes.SELECT,
                    replacements: { query: seachableJobPostTitle },
                });

                const jobPosts = await Promise.all(
                    matchingJobPosts.map((eachJobPost) =>
                        models.JobPost.findOne({
                            order: [ ['createdAt', 'DESC' ]],
                            where: {
                                id: eachJobPost.id,
                                published: 2,
                                createdAt: {
                                    [Op.gte]: new Date(
                                        new Date().getFullYear(),
                                        new Date().getMonth() - 2, 
                                        new Date().getDate()
                                    )
                                },
                                '$User.active$': true,
                            },
                            include: [{
                                model: models.User,
                                attributes: ['nationality', 'city', 'createdAt', ]
                            },
                            {
                                model: models.Bid,
                                as: 'bids',
                                where: {
                                    type: 2,
                                    status: {
                                        [Op.or]: [0,2]
                                    },
                                },
                                required: false
                            },
                            {
                                model: models.Category,
                                as: 'categories',
                                through: models.JobPostsCategoriesJoin,
                                where: {
                                    id: {
                                        [Op.in]: searchableCategoriesIds
                                    }
                                }
                            }],
                        },)
                    )
                );

                const nullValuesRemovedJobPosts = jobPosts.filter(jobPost => jobPost);

                return res.status(200).json({
                    success: true,
                    message: 'Job posts fetched successfully.',
                    jobPosts: nullValuesRemovedJobPosts,
                });

            } 
            else {
            const jobPosts = await models.JobPost.findAll({
                order: [ ['createdAt', 'DESC' ]],
                where: {
                    published: 2,
                    createdAt: {
                        [Op.gte]: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() - 2, 
                            new Date().getDate()
                        )
                    },
                    '$User.active$': true,
                },
                include: [{
                    model: models.User,
                    attributes: ['nationality', 'city', 'createdAt', ]
                },
            {
                model: models.Category,
                as: 'categories',
                attributes: ['category'],
                through: {
                    attributes: [],   //helps remove unwanted join table data
                }
            }, 
            {
                model: models.Bid,
                as: 'bids',
                where: {
                    type: 2,
                    status: {
                        [Op.or]: [0,2]
                    },
                },
                required: false
            }
        ]
            });

            return res.status(200).json({
                success: true,
                message: 'Job posts fetched successfully.',
                jobPosts: jobPosts,
            });
        }
            
        } catch (error) {
            console.log('+++++++++error', error);
            errorHandler.handleError(error, 500, res);
        }
    }


    static async fetchJobPostBid(req, res) {
        try {
            const {id} = req.query;
            const userEmail = req.user.email;
           
            const jobPostBid = await models.JobPost.findOne({
                where: { id: id },
                include: [{
                    model: models.User,
                    attributes: ['nationality', 'city', 'createdAt', ]
                },{
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
                        }
                    },{
                        model: models.Comment,
                        where: {
                            active: true,
                        },
                        required: false ,
                        include: [{
                            model: models.User,
                            attributes: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
                            where: {
                                active: true,
                            }
                        }]
                    }
                ]
                }, 
            {
                model: models.Bid,
                attributes: ['id', 'amount', 'type'],
                as: 'bids',
                include: [{
                    model: models.User,
                    attributes: ['id', 'email']
                }]
            }]
            });

            if (jobPostBid.bids.length >= 1) {
                await jobPostBid.bids.forEach((eachBid) => {
                    if (eachBid.User.email === userEmail && eachBid.type === BID_TYPE_BID) {
                        jobPostBid.dataValues['alreadyBid'] = true;
                        return res.status(200).json({
                            success: true,
                            message: 'Job posts bid fetched successfully.',
                            jobPostBid: jobPostBid,
                        });
                    } 
                })
                
                jobPostBid.dataValues['alreadyBid'] = false;
                return res.status(200).json({
                    success: true,
                    message: 'Job posts bid fetched successfully.',
                    jobPostBid: jobPostBid,
                });

            } else {
                jobPostBid.dataValues['alreadyBid'] = false;
                return res.status(200).json({
                    success: true,
                    message: 'Job posts bid fetched successfully.',
                    jobPostBid: jobPostBid,
                });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async createJobPost(req, res) {
        try {
            let token = req.headers['authorization'];
            let categories, aestheticSketches = [];
            let budget, objective, toggleObjective, visibility, projectKeyFeatures, projectUsers, dimensionalSketches,
            metricsOfSuccess, milestones, targetMSRP,volume, prefferedMaterials, savePartially = '';
            
            categories = JSON.parse(req.body.categories);
            budget = req.body.budget; 
            objective = req.body.objective; 
            toggleObjective = req.body.toggleObjective; 
            visibility = Number(req.body.visibility);  
            projectKeyFeatures = req.body.features;  
            projectUsers = req.body.users;
            metricsOfSuccess = req.body.metricsOfSuccess;
            milestones = req.body.milestones;
            targetMSRP = req.body.targetMSRP;
            volume = req.body.volume;
            prefferedMaterials = req.body.prefferedMaterials;
            savePartially = req.body.savePartially && req.body.savePartially === 'true' || req.body.savePartially && req.body.savePartially[0] === 'true'  ? true : false;
            
            if (req.files.aestheticSketches) {
                aestheticSketches = req.files.aestheticSketches.map((eachFile) => { 
                    return eachFile.path
                });
            }

            if (req.files.dimensionalSketches) {
                dimensionalSketches = req.files.dimensionalSketches.map((eachFile) => eachFile.path);
            }     

            token = token.slice(7, token.length);
            const email = await jwt.verify(token, process.env.SECRET_KEY).email;
            const user = await models.User.findOne({
                where: {email: email},
            });

            const createdJobPost = await models.JobPost.create({
                objective, toggleObjective, 
                budget, prefferedMaterials, 
                aestheticSketches, dimensionalSketches, 
                visibility, projectKeyFeatures, 
                projectUsers, userId: user.id,
                metricsOfSuccess, milestones,
                milestones, targetMSRP,
                volume,
                savePartially,
            });

            if (categories) {
                const existingCategories = [];
                const newCategories = [];

                await categories.map((eachCategory) => {
                        if (eachCategory.id){
                            existingCategories.push(eachCategory.id);

                        } else if (eachCategory.__isNew__) {
                            newCategories.push({ category: eachCategory.value });

                        }
                    return null;
                });

                const createdCategories = await models.Category.bulkCreate(
                    newCategories
                );

                //add to join table
                const result = await createdJobPost.addCategories([...createdCategories, ...existingCategories]);

                return res.status(201).json({
                    success: true,
                    message: savePartially ?  'job post saved partially':'job created successfully.Pay to publish.',
                    category: result,
                    jobPost: createdJobPost
                });
            }

            return res.status(201).json({
                success: true,
                message: savePartially ?  'job post saved partially':'job created successfully.Pay to publish.',
                jobPost: createdJobPost
            });

        } catch (error) {
            console.log(error)
            errorHandler.handleError(error, 500, res);
        }
    }

    static async savePartiallyAlreadyCreatedJobPost(req, res) {
        try {
            
            let token = req.headers['authorization'];
            let categories = [];
            let budget, objective, toggleObjective, visibility, projectKeyFeatures, projectUsers, dimensionalSketches, aestheticSketches,
            metricsOfSuccess, milestones, targetMSRP,volume, prefferedMaterials, savePartially = '';
            categories = JSON.parse(req.body.categories);
            budget = req.body.budget; 
            objective = req.body.objective; 
            toggleObjective = req.body.toggleObjective; 
            visibility = Number(req.body.visibility);  
            projectKeyFeatures = req.body.features;  
            projectUsers = req.body.users;
            metricsOfSuccess = req.body.metricsOfSuccess;
            milestones = req.body.milestones;
            targetMSRP = req.body.targetMSRP;
            volume = req.body.volume;
            prefferedMaterials = req.body.prefferedMaterials;
            savePartially = req.body.savePartially && req.body.savePartially === 'true' || req.body.savePartially && req.body.savePartially[0] === 'true'  ? true : false;
            const id = req.body.id;

            if (req.files.aestheticSketches) {
                aestheticSketches = req.files.aestheticSketches.map((eachFile) => { 
                    return eachFile.path
                });
            }

            if (req.files.dimensionalSketches) {
                dimensionalSketches = req.files.dimensionalSketches.map((eachFile) => eachFile.path);
            }    

            const partiallySavedJobPost = await models.JobPost.update({
                objective, toggleObjective, 
                budget, prefferedMaterials, 
                aestheticSketches, dimensionalSketches, 
                visibility, projectKeyFeatures, 
                projectUsers,
                metricsOfSuccess, milestones,
                milestones, targetMSRP,
                savePartially,
            }, {
                where: {id}
            });

            if(partiallySavedJobPost[0] === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'Job post partially saved.'
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Job post partial save not successfull.Please try again.'
                });

            }

            
        } catch (error) {
            console.log(error)
            errorHandler.handleError(error, 500, res);
        }
    }

    static async publishPartiallyAlreadyCreatedJobPost(req, res) {
        try {
            let token = req.headers['authorization'];
            let categories, aestheticSketches = [];
            let budget, objective, toggleObjective, visibility, projectKeyFeatures, projectUsers, dimensionalSketches,
            metricsOfSuccess, milestones, targetMSRP,volume, prefferedMaterials, savePartially = '';
            
            categories = JSON.parse(req.body.categories);
            budget = req.body.budget; 
            objective = req.body.objective; 
            toggleObjective = req.body.toggleObjective; 
            visibility = Number(req.body.visibility);  
            projectKeyFeatures = req.body.features;  
            projectUsers = req.body.users;
            metricsOfSuccess = req.body.metricsOfSuccess;
            milestones = req.body.milestones;
            targetMSRP = req.body.targetMSRP;
            volume = req.body.volume;
            prefferedMaterials = req.body.prefferedMaterials;
            savePartially = false;
            const id = Number(req.body.id);

            if (req.files.aestheticSketches) {
                aestheticSketches = req.files.aestheticSketches.map((eachFile) => { 
                    return eachFile.path
                });
            }

            if (req.files.dimensionalSketches) {
                dimensionalSketches = req.files.dimensionalSketches.map((eachFile) => eachFile.path);
            }  

            const publishedPartiallySavedJobPost = await models.JobPost.update({
                objective, toggleObjective, 
                budget, prefferedMaterials, 
                aestheticSketches, dimensionalSketches, 
                visibility, projectKeyFeatures, 
                projectUsers,
                metricsOfSuccess, milestones,
                milestones, targetMSRP,
                savePartially,
            }, {
                where: {id}
            });

            if (publishedPartiallySavedJobPost[0] === 1) {
                const jobPost = await models.JobPost.findByPk(id);
                return res.status(200).json({
                    success: false,
                    jobPost,
                    message: 'Job post created successfully.',
                });
            } else {
                return res.status(405).json({
                    success: false,
                    message: 'Job post submission not successful.Try again.',
                });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
            
        }
    }

    static async editJobPost(req, res) {
        try {
            let token = req.headers['authorization'];
            let categories, aestheticSketches = [];
            let budget, objective, toggleObjective, visibility, projectKeyFeatures, projectUsers, dimensionalSketches,
            metricsOfSuccess, milestones, targetMSRP,volume, prefferedMaterials = '';
            
            categories = JSON.parse(req.body.categories);
            budget = req.body.budget; 
            objective = req.body.objective; 
            toggleObjective = req.body.toggleObjective; 
            visibility = Number(req.body.visibility);  
            projectKeyFeatures = req.body.features;  
            projectUsers = req.body.users;
            metricsOfSuccess = req.body.metricsOfSuccess;
            milestones = req.body.milestones;
            targetMSRP = req.body.targetMSRP;
            volume = req.body.volume;
            prefferedMaterials = req.body.prefferedMaterials;
            const id = Number(req.body.id);

            if (req.files.aestheticSketches) {
                aestheticSketches = req.files.aestheticSketches.map((eachFile) => { 
                    return eachFile.path
                });
            }

            if (req.files.dimensionalSketches) {
                dimensionalSketches = req.files.dimensionalSketches.map((eachFile) => eachFile.path);
            }  

            const publishedPartiallySavedJobPost = await models.JobPost.update({
                objective, toggleObjective, 
                budget, prefferedMaterials, 
                aestheticSketches, dimensionalSketches, 
                visibility, projectKeyFeatures, 
                projectUsers,
                metricsOfSuccess, milestones,
                milestones, targetMSRP,
            }, {
                where: {id}
            });

            if (publishedPartiallySavedJobPost[0] === 1) {
                const jobPost = await models.JobPost.findByPk(id);
                return res.status(200).json({
                    success: false,
                    jobPost,
                    message: 'Job post edited successfully.',
                });
            } else {
                return res.status(405).json({
                    success: false,
                    message: 'Job post edit not successful.Try again.',
                });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
            
        }
    }

    static async publishJobPost(req, res) {
        try {
            const { jobPostId } = req.body.data;
            const publishedJobPost = await models.JobPost.update(
                    { published: 2 },
                    { where: { id: jobPostId }}
                );
            if (publishedJobPost[0] === 1) {
                return res.status(200).json({
                    success: false,
                    message: 'Job post published successfully.',
                });
            } else {
                return res.status(405).json({
                    success: false,
                    message: 'Job post publishing not successful.Try again.',
                });
            }
            
        } catch (error) {
            console.log('ERROR PUBLISHING JOB POST', error);
            errorHandler.handleError(error, 500, res);
        }
    }
}

export default JobPostsController;