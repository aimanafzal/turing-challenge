/**
 * The Shipping Controller contains all the static methods that handles all shipping request
 * This piece of code work fine, but you can test and debug any detected issue
 *
 * - getShippingRegions - Returns a list of all shipping region
 * - getShippingType - Returns a list of shipping type in a specific shipping region
 *
 */
import { ShippingRegion, Shipping } from '../database/models';
const error = require('../Error/error');
class ShippingController {
  /**
   * get all shipping regions
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and shipping regions data
   * @memberof ShippingController
   */
  static async getShippingRegions(req, res, next) {
    try {
      const shippingRegions = await ShippingRegion.findAll();
      if (shippingRegions)
        return res.status(200).json(shippingRegions);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get get shipping region shipping types
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and shipping types data
   * @memberof ShippingController
   */
  static async getShippingType(req, res, next) {
    const { shipping_region_id } = req.params; // eslint-disable-line
    try {
      const shippingTypes = await Shipping.findByPk(shipping_region_id);
      if (shippingTypes)
        return res.status(200).json(shippingTypes);
      else {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'SHP_01',
            message: `${error.ShippingError.SHP_01} ${shipping_region_id}`,  // eslint-disable-line
            field: 'shipping_region_id'
          }
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default ShippingController;
