import errorHandler from '../../helpers/errorHandler';
import models from './../../database/models';

class CategoriesController {

    static async fetchCategories(req, res) {
        try {
            let categories = await models.Category.findAll({
                attributes: ['id', 'category'],
            });
            return res.status(200).json({
                success: true,
                message: 'Job posts fetched successfully.',
                categories: categories,
            });
            
        } catch (error) {
            errorHandler.handleError(error, 500, res);
        }
    }
}

export default CategoriesController;