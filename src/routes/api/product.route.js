import { Router } from 'express';
import ProductController from '../../controllers/product.controller';
import CategoryController from '../../controllers/product.controller';

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();
router.get('/products', ProductController.getAllProducts);
router.get('/products/:product_id', ProductController.getProduct);

router.get('/products/:product_id/reviews', ProductController.getProductReviews);

/**Posting a product review is a custom made API */
router.post('/products/:product_id/reviews', ProductController.postProductReviews);


router.get('/products/search', ProductController.searchProduct);
router.get('/products/inCategory/:category_id', ProductController.getProductsByCategory);
router.get('/products/inDepartment/:department_id', ProductController.getProductsByDepartment);
router.get('/departments', ProductController.getAllDepartments);
router.get('/departments/:department_id', ProductController.getDepartment);
//router.get('/categories', ProductController.getAllCategories);
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:category_id', CategoryController.getSingleCategory);
router.get('/categories/inDepartment/:department_id', ProductController.getDepartmentCategories);


// This endpoint returns the category of a particular product.
router.get('/categories/inProduct/:product_id', CategoryController.getCategoryOfProduct);

export default router;
