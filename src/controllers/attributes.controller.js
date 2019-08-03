/**
 * The controller defined below is the attribute controller, highlighted below are the functions of each static method
 * in the controller
 *  Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - getAllAttributes - This method should return an array of all attributes
 * - getSingleAttribute - This method should return a single attribute using the attribute_id in the request parameter
 * - getAttributeValues - This method should return an array of all attribute values of a single attribute using the attribute id
 * - getProductAttributes - This method should return an array of all the product attributes
 * NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */

import {
  Product,
  Department,
  AttributeValue,
  Attribute,
  ProductAttribute,
  Category,
  Sequelize,
} from '../database/models';
class AttributeController {
  /**
   * This method get all attributes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllAttributes(req, res, next) {
    // write code to get all attributes from the database here
    //return res.status(200).json({ message: 'this works' });
    const { query } = req;
    const { page, limit, offset } = query
    const sqlQueryMap = {
      limit,
      offset,
    };
    try {
      const attributes = await Attribute.findAndCountAll(sqlQueryMap);
      return res.status(200).json(attributes.rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a single attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleAttribute(req, res, next) {
    // Write code to get a single attribute using the attribute id provided in the request param
    // return res.status(200).json({ message: 'this works' });
    const { query } = req;
    const { page, limit, offset } = query
    const { attribute_id } = req.params;  // eslint-disable-line
    const sqlQueryMap = {
      limit,
      offset,
    };
    try {
      const attribute = await AttributeValue.findAndCountAll({
        include: [
          {
            model: Attribute,
            as: 'attribute_type',
            where: {
              attribute_id,
            },
          },
        ],
        limit,
        offset,
      });
      return res.status(200).json({ attribute });
      //return next(attribute);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAttributeValues(req, res, next) {
    // Write code to get all attribute values for an attribute using the attribute id provided in the request param
    // This function takes the param: attribute_id
    // return res.status(200).json({ message: 'this works' });
    const { query } = req;
    const { page, limit, offset } = query
    const { attribute_id } = req.params;  // eslint-disable-line
    const sqlQueryMap = {
      limit,
      offset,
    };
    try {
      let attribute = await AttributeValue.findAndCountAll({
        include: [
          {
            model: Attribute,
            as: 'attribute_type',
            attributes: [],
            where: {
              attribute_id,
            },
          },
        ],
        limit,
        offset,
      });
      return res.status(200).json(attribute.rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in a product using the product id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductAttributes(req, res, next) {
    // Write code to get all attribute values for a product using the product id provided in the request param
    //return res.status(200).json({ message: 'this works' });

    const { query } = req;
    const { page, limit, offset } = query
    const { product_id } = req.params;  // eslint-disable-line
    const sqlQueryMap = {
      limit,
      offset,
    };
    try {
      let attribute = await Product.findAndCountAll({
        include: [
          {
            model: AttributeValue,
            as: 'product',
            attributes: [],
            where: {
              product_id,
            },
          },
        ],
        limit,
        offset,
      });
      return res.status(200).json(attribute.rows);
    } catch (error) {
      return next(error);
    }


  }
}

export default AttributeController;
