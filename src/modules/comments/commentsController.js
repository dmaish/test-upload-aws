import jwt from 'jsonwebtoken';
import errorHandler from '../../helpers/errorHandler';
import models from './../../database/models';
import dotenv from 'dotenv';

dotenv.config();

class CommentsController {
    static async postComment(req, res) {
        try {
            let comment = '';
            let jobPostId = null;
            let commentId = null;
            let token = req.headers['authorization'];
            token = token.slice(7, token.length);
            const email = await jwt.verify(token, process.env.SECRET_KEY).email;


            comment = req.body.data.comment;
            commentId = req.body.data.commentId;
            jobPostId = req.body.data.jobPostId;

            
            const user = await models.User.findOne({
                where: {email: email},
            });

            const createdComment = await models.Comment.create({
                comment,
                jobPostId,
                commentId,
                userId: user.id,
            });

            return res.status(201).json({
                success: true,
                message: 'comment sent successfully.',
                category: createdComment,
            });
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async deleteReply(req, res) {
        try {
            const {replyId} = req.body;
            const response = await models.Comment.destroy({
                where: {
                    id: replyId,
                }

            });

            if (response === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'comment reply deleted successfully.',
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'comment not delete successfully.Try again.',
                });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async editReply(req, res) {
        try {
            const {commentId, editedComment} = req.body.data;
            const response = await models.Comment.update(
                { comment: editedComment, edited: 2 },
                {
                    where: {
                        id: commentId
                    }
                });

            if (response[0] === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'comment reply edited successfully.',
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'comment not edited successfully.Try again.',
                });
            }

        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

    static async deleteComment(req, res) {
        try {
            const {commentId} = req.body;
            const response = await models.Comment.update(
                { 
                    comment: null, 
                    deleted: 2 
                },
                {
                    where: {
                        id: commentId
                    }
                });

            if (response[0] === 1) {
                return res.status(200).json({
                    success: true,
                    message: 'comment deleted successfully.',
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'comment not delete successfully.Try again.',
                });
            }
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }

}

export default CommentsController;

