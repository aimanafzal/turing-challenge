/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { Customer } from '../database/models';
const config = require('../jwtSecret')
const jwt = require('jsonwebtoken')

/**
 * @class CustomerController
 */
class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof CustomerController
   */
  static async create(req, res, next) {
    // Implement the function to create the customer account
    try {
      const customer = await Customer.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      let accessToken = jwt.sign({ username: req.body.email },
        config.secret,
        {
          expiresIn: '24h' // expires in 24 hours
        }
      )
      return res.status(201).json({ customer: customer, accessToken, expiresIn: '24h' });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * log in a customer
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof CustomerController
   */
  static async login(req, res, next) {
    // implement function to login to user account
    try {
      let credentials = {
        email: req.body.email,
        password: req.body.password
      }
      const _customer = await Customer.findAndCountAll(credentials);
      let accessToken
      if (_customer) {
        accessToken = jwt.sign({ username: credentials.email },
          config.secret, { expiresIn: config.expiresIn } // expires in 24 hours
        )
      }
      return res.status(200).json({
        customer: _customer.rows,
        accessToken,
        expiresIn: config.expiresIn
      });
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async getCustomerProfile(req, res, next) {
    // fix the bugs in this code
    const { customer_id } = req;  // eslint-disable-line
    try {
      const customer = await Customer.findByPk(customer_id);
      return res.status(400).json({
        status: true,
        customer,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
    return res.status(200).json({ message: 'this works' });
  }

  /**
     * Login using Facebook accesstoken
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status customer profile data
     * @memberof CustomerController
     */
  static async facebook(req, res, next) {
    // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
    //return res.status(200).json({ message: 'Facebook Login this works' });
    let accessToken = req.body.access_token
    let jwtToken = jwt.decode(accessToken)
    if (jwtToken) {
      //const customer = Customer.findAndCountAll({
      //   email: jwtToken.username
      // });
      const customer = Customer.findAndCountAll({

        where: { email: jwtToken.username }
      });
      console.log(customer.rows)
      return res.status(200).json({
        jwtToken: jwtToken.username,
        customer: customer,
        //message: 'Facebook Login this works'
      });
    }
  }


  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerAddress(req, res, next) {
    // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
    // and shipping_region_id

    const { customer_id } = req.headers;  // eslint-disable-line
    const metaData = {
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      city: req.body.city,
      region: req.body.region,
      postal_code: req.body.postal_code,
      shipping_region_id: req.body.shipping_region_id,
    };
    try {
      const customer = await Customer.update(metaData, {
        where: { customer_id, },
      });
      if (customer[0] == '1') {
        const customerData = await Customer.findByPk(customer_id);
        if (customerData) {
          return res.status(200).json({
            customerData
          });
        }
      }
      else {
        return res.status(200).json({
          message: 'Record Could not be updated!'
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer credit card
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCreditCard(req, res, next) {
    // write code to update customer credit card number
    const { customer_id } = req.headers;  // eslint-disable-line
    const metaData = {
      credit_card: req.body.credit_card
    };
    try {
      const customer = await Customer.update(metaData, {
        where: { customer_id, },
      });
      if (customer[0] == '1') {
        const customerData = await Customer.findByPk(customer_id);
        return res.status(200).json({
          customerData
        });
      }
      else
        return res.status(200).json({
          message: 'Record Could not be updated!'
        });

    } catch (error) {
      return next(error);
    }
  }


  /**
   * get customer by their id provided in header
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */

  static async getCustomerById(req, res, next) {
    const { customer_id } = req.headers;  // eslint-disable-line
    try {
      const customer = await Customer.findByPk(customer_id);
      return res.status(200).json({
        customer
      });
    } catch (error) {
      return next(error);
    }
  }


  /**
     * Update customer Details by their id provided in header
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status customer profile data
     * @memberof CustomerController
     */
  static async updateCustomerDetails(req, res, next) {
    const { customer_id } = req.headers;  // eslint-disable-line
    const metaData = {
      email: req.body.email,
      name: req.body.name,
      day_phone: req.body.day_phone,
      eve_phone: req.body.eve_phone,
      mob_phone: req.body.mob_phone
    };
    try {
      const customer = await Customer.update(metaData, {
        where: { customer_id, },
      });
      if (customer[0] == '1') {
        const customerData = await Customer.findByPk(customer_id);
        return res.status(200).json({
          customerData
        });
      }
      else {
        return res.status(200).json({
          message: 'Record Could not be updated!'
        });
      }
    } catch (error) {
      return next(error);
    }
  }

}

export default CustomerController;
