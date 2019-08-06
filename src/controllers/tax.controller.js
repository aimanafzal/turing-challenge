
/**
 * Tax controller contains methods which are needed for all tax request
 * Implement the functionality for the methods
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { Tax } from '../database/models';
class TaxController {
  /**
   * This method get all taxes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllTax(req, res, next) {
    // write code to get all tax from the database here
    const tax = await Tax.findAndCountAll();
    if (tax) {
      let data = tax.rows;
      return res.status(200).json(tax.rows);
    }
  }

  /**
   * This method gets a single tax using the tax id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleTax(req, res, next) {

    // Write code to get a single tax using the tax Id provided in the request param
    const tax = await Tax.findByPk(tax_id);
    if (tax) {
      return res.status(200).json(tax);
    }
  }
}

export default TaxController;
