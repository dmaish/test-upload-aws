import express from 'express';

import CategoriesController from './categoriesController';

const Router = express.Router();

Router.get(
    '/categories',
    CategoriesController.fetchCategories
);

export default Router;