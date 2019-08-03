/**
 * The Product controller contains all static methods that handles product request
 * Some methods work fine, some needs to be implemented from scratch while others may contain one or two bugs
 * The static methods and their function include:
 *
 * - getAllProducts - Return a paginated list of products
 * - searchProducts - Returns a list of product that matches the search query string
 * - getProductsByCategory - Returns all products in a product category
 * - getProductsByDepartment - Returns a list of products in a particular department
 * - getProduct - Returns a single product with a matched id in the request params
 * - getAllDepartments - Returns a list of all product departments
 * - getDepartment - Returns a single department
 * - getAllCategories - Returns all categories
 * - getSingleCategory - Returns a single category
 * - getDepartmentCategories - Returns all categories in a department
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import {
  Product,
  Department,
  AttributeValue,
  Attribute,
  Category,
  Sequelize,
} from '../database/models';

const { Op } = Sequelize;

/**
 *
 *
 * @class ProductController
 */
class ProductController {
  /**
   * get all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getAllProducts(req, res, next) {

    /**
      "paginationMeta" : {
"currentPage" : integer , // Current page number
"currentPageSize" : integer , // The page limit
"totalPages" : integer , // The total number of pages for all products
"totalRecords" : integer , // The total number of product in the database
},
     */
    const { query } = req;
    const { page, limit, offset } = query
    const sqlQueryMap = {
      description_length: 200,
      page: 1,
      limit: 1,
      offset,
      totalPages: 20
    };
    try {
      const products = await Product.findAndCountAll(sqlQueryMap);

      let _products = JSON.stringify(products)
      return res.status(200).json(
        {
          "paginationMeta": {
            currentPage: sqlQueryMap.page,
            currentPageSize: sqlQueryMap.limit,
            totalPages: sqlQueryMap.totalPages,
            totalRecords: products.count,
          },
          "rows": products.rows
        }
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * search all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async searchProduct(req, res, next) {
    const { query_string, all_words } = req.query;  // eslint-disable-line
    // all_words should either be on or off
    // implement code to search product
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * get all products by caetgory
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getProductsByCategory(req, res, next) {
    try {
      const { category_id } = req.params; // eslint-disable-line
      const products = await Product.findAndCountAll({
        include: [
          {
            model: Department,
            where: {
              category_id,
            },
            attributes: [],
          },
        ],
        limit,
        offset,
      });
      return next(products);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all products by department
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getProductsByDepartment(req, res, next) {
    // implement the method to get products by department
  }

  /**
   * get single product details
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product details
   * @memberof ProductController
   */
  static async getProduct(req, res, next) {

    const { product_id } = req.params;  // eslint-disable-line
    try {
      const product = await Product.findByPk(product_id, {
        include: [
          {
            model: AttributeValue,
            as: 'attributes',
            attributes: ['value'],
            through: {
              attributes: [],
            },
            include: [
              {
                model: Attribute,
                as: 'attribute_type',
              },
            ],
          },
        ],
      });
      return res.status(500).json({ data: product, message: 'This works!!1' });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all departments
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and department list
   * @memberof ProductController
   */
  static async getAllDepartments(req, res, next) {
    try {
      const departments = await Department.findAll();
      return res.status(200).json(departments);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get a single department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartment(req, res, next) {
    const { department_id } = req.params; // eslint-disable-line
    try {
      const department = await Department.findByPk(department_id);
      if (department) {
        return res.status(200).json(department);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `Department with id ${department_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get all categories
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllCategories(req, res, next) {
    // Implement code to get all categories here
    // try {
    //   const departments = await Department.findAll();
    //   return res.status(200).json(departments);
    // } catch (error) {
    //   return next(error);
    // }
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      return next(error);
    }
    //return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method should get a single category using the categoryId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleCategory(req, res, next) {
    // implement code to get a single category here
    //return res.status(200).json({ message: 'this works' });
    const { category_id } = req.params; // eslint-disable-line
    try {
      const category = await Category.findByPk(category_id);
      if (category) {
        return res.status(200).json(category);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `Category with id ${category_id} does not exist`,  // eslint-disable-line
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get list of categories in a department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartmentCategories(req, res, next) {
    //const { department_id } = req.params;  // eslint-disable-line
    // implement code to get categories in a department here
    try {
      const { query } = req;
      const { page, limit, offset } = query
      const { department_id } = req.params;  // eslint-disable-line
      const products = await Category.findAndCountAll({
        include: [
          {
            model: Department,
            where: {
              department_id,
            },
            attributes: [],
          },
        ],
        limit,
        offset,
      });
      //return next( products);
      return res.status(200).json({ rows: products.rows });
    } catch (error) {
      return next(error);
    }
  }



  /**
  * get the category of a product
  *
  * @static
  * @param {object} req express request object
  * @param {object} res express response object
  * @param {object} next next middleware
  * @returns {json} json object with status and product data
  * @memberof ProductController
  */
  static async getCategoryOfProduct(req, res, next) {
    try {
      const { product_id } = req.params; // eslint-disable-line
      const products = await Category.findAndCountAll({
        include: [
          {
            model: Product,
            where: {
              product_id,
            },
            attributes: [],
          },
        ],
      });
      //return next(products.rows);
      return res.status(200).json({ rows: products.rows });
    } catch (error) {
      return next(error);
    }
  }
}

export default ProductController;
