/**
 * Check each method in the shopping cart controller and add code to implement
 * the functionality or fix any bug.
 * The static methods and their function include:
 *
 * - generateUniqueCart - To generate a unique cart id
 * - addItemToCart - To add new product to the cart
 * - getCart - method to get list of items in a cart
 * - updateCartItem - Update the quantity of a product in the shopping cart
 * - emptyCart - should be able to clear shopping cart
 * - removeItemFromCart - should delete a product from the shopping cart
 * - createOrder - Create an order
 * - getCustomerOrders - get all orders of a customer
 * - getOrderSummary - get the details of an order
 * - processStripePayment - process stripe payment
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { Order, OrderDetail, Customer, ShoppingCart, Product } from '../database/models';
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const error = require('../Error/error')
/**
 *
 *
 * @class shoppingCartController
 */
class ShoppingCartController {
  /**
   * generate random unique id for cart identifier
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart_id
   * @memberof shoppingCartController
   */
  static async generateUniqueCart(req, res) {
    // implement method to generate unique cart Id
    const shoppingCart = await ShoppingCart.findAndCountAll();
    let index = shoppingCart.count - 1;

    return res.status(200).json({ "cart_id": parseInt(shoppingCart.rows[index].cart_id) + 1 });
  }

  /**
   * adds item to a cart with cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async addItemToCart(req, res, next) {
    let metaData = {
      "cart_id": req.body.cart_id,
      "product_id": req.body.product_id,
      "attributes": req.body.attributes,
      "quantity": req.body.quantity
    }

    const shoppingCart = await ShoppingCart.create(metaData);
    if (shoppingCart) {
      let data = {
        item_id: shoppingCart.item_id,
        cart_id: shoppingCart.cart_id,
        attributes: shoppingCart.attributes,
        product_id: shoppingCart.product_id,
        quantity: shoppingCart.quantity,
      }
      return res.status(201).json(data);
    }
  }

  /**
   * get shopping cart using the cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async getCart(req, res, next) {
    // implement method to get cart items
    const cart_id = req.params.cart_id;
    const shoppingcart = await ShoppingCart.findByPk(cart_id);

    if (shoppingcart) {
      const product = await Product.findByPk(shoppingcart.product_id);
      if (product) {
        return res.status(200).json(
          {
            "item_id": shoppingcart.item_id,
            "cart_id": shoppingcart.cart_id,
            "name": product.name,
            "attributes": shoppingcart.attributes,
            "product_id": shoppingcart.product_id,
            "image": product.image,
            "price": product.price,
            "discounted_price": product.discounted_price,
            "quantity": parseInt(shoppingcart.quantity),
            "subtotal": parseFloat(shoppingcart.quantity) * parseFloat(product.price),
          }
        );
      }

    }
    else {

        return res.status(404).json({
          error: {
            status: 404,
            code: 'CRT_02',
            message: `${error.CartError.CRT_02} ${cart_id} `,  // eslint-disable-line
            field: 'cart_id'
          }
        });
      }
  }

  /**
   * update cart item quantity using the item_id in the request param
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async updateCartItem(req, res, next) {
    const item_id = req.params.item_id; // eslint-disable-line
    const quantity = req.body.quantity;

    const shoppingcart = await ShoppingCart.update({ quantity }, {
      where: { item_id },
    });

    if (shoppingcart[0] == '1') {
      const shoppingcartData = await ShoppingCart.findByPk(item_id);
      if (shoppingcartData) {
        return res.status(200).json({
          "item_id": shoppingcartData.item_id,
          "cart_id": shoppingcartData.cart_id,
          "attributes": shoppingcartData.attributes,
          "product_id": shoppingcartData.product_id,
          "quantity": shoppingcartData.quantity
        });
      }
    }
    else {
      return res.status(404).json({
        error: {
          status: 404,
          code: 'CRT_01',
          message: `${error.CartError.CRT_01} ${item_id}`,  // eslint-disable-line
          field: 'item_id'
        }
      });
    }

  }

  /**
   * removes all items in a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async emptyCart(req, res, next) {
    // implement method to empty cart
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * remove single item from cart
   * cart id is obtained from current session
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with message
   * @memberof ShoppingCartController
   */
  static async removeItemFromCart(req, res, next) {
    try {
      // implement code to remove item from cart here
      const item_id = req.params.item_id; // eslint-disable-line
      res.status(200).send({ message: "It works" });

    } catch (error) {
      return next(error);
    }
  }

  /**
   * create an order from a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with created order
   * @memberof ShoppingCartController
   */
  static async createOrder(req, res, next) {
    try {
      let metaData = {
        cart_id: req.body.cart_id,
        shipping_id: req.body.shipping_id,
        tax_id: req.body.tax_id,
      }
      const order = await Order.create(metaData)
      if (order) {
        let order_id = order.order_id;
        return res.status(201).json({ order_id });
      } else {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'ORD_01',
            message: `${error.OrderError.ORD_01}`,  // eslint-disable-line
            field: 'order_id'
          }
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get all orders made by Customers
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with customer's orders
   * @memberof ShoppingCartController
   */
  static async getCustomerOrders(req, res, next) {
    let customer_id;  // eslint-disable-line
    try {
      // implement code to get customer order
      const orders = await Order.findAndCountAll();
      if (orders) {
        let orderData = {};
        orders.rows.forEach(element => {
          orderData.order_id = element.order_id;
          orderData.total_amount = element.total_amount;
          orderData.created_on = element.created_on;
          orderData.shipped_on = element.shipped_on;
          let customers = Customer.findByPk(element.customer_id).then(data => {
            orderData.name = data.name
            //  return res.status(200).json(orderData);
            res.status(200).end(JSON.stringify(orderData))
          });

        });
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with order summary
   * @memberof ShoppingCartController
   */
  static async getOrderSummary(req, res, next) {
    const { order_id } = req.params;  // eslint-disable-line
    try {
      const orders = await Order.findByPk(order_id);
      if (orders) {
        let orderData = {};
        orderData.order_id = orders.order_id;
        orderData.total_amount = orders.total_amount;
        orderData.created_on = orders.created_on;
        orderData.shipped_on = orders.shipped_on;
        orderData.status = orders.status;
        let customers = Customer.findByPk(orders.customer_id).then(data => {
          orderData.name = data.name
          return res.status(200).json(orderData);
        });
      }
      else {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'ORD_01',
            message: `${error.OrderError.ORD_01}`,  // eslint-disable-line
            field: 'order_id'
          }
        });
      }
    } catch (error) {
      return next(error);
    }
  }


  /**
   * Get Order by Order_id
     * @static
     * @param {obj} req express request object
     * @param {obj} res express response object
     * @returns {json} returns json response with order summary
     * @memberof ShoppingCartController
     */
  static async getOrder(req, res, next) {
    const { order_id } = req.params;  // eslint-disable-line
    const { customer_id } = req;   // eslint-disable-line
    try {
      // write code to get order summary

      const order = await OrderDetail.findAndCountAll({
        where: {
          order_id,
        }
      });

      if (order) {
        let orderId, order_items;
        order.rows.forEach(element => {
          orderId = element.order_id;
          order_items = {
            product_id: element.product_id,
            attributes: element.attributes,
            product_name: element.product_name,
            quantity: element.quantity,
            unit_cost: element.unit_cost,
            subtotal: element.quantity * element.unit_cost,
          }
        });
        return res.status(200).json({
          order_id,
          order_items
        });
      }
      else {
        return res.status(404).json({
          error: {
            status: 404,
            code: 'ORD_02',
            message: `${error.OrderError.ORD_02} ${order_id}`,  // eslint-disable-line
            field: 'order_id'
          }
        });
      }

    } catch (error) {
      return next(error);
    }
  }


  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async processStripePayment(req, res, next) {
    const { email, stripeToken, order_id } = req.body; // eslint-disable-line
    const { customer_id } = req;  // eslint-disable-line
    try {
      // implement code to process payment and send order confirmation email here
      const order = await Order.findByPk(order_id);
      if (order) {
        let amount = parseInt(order.total_amount);
        let stripeObject = await stripe.customers.create({
          email: email, // customer email, which user need to enter while making payment
          source: stripeToken, // token for the given card // we are using "tok_visa" considering a VISA Payment
        }).then(customer =>
          stripe.charges.create({ // charge the customer
            amount,
            description: "Sample Charge",
            currency: "usd",
            customer: customer.id,
          })).then(charge => {
            return {
              charge,
              message: charge.status
            }
          });
        return res.status(200).json(stripeObject)
      }else {

        return res.status(404).json({
          error: {
            status: 404,
            code: 'ORD_02',
            message: `${error.OrderError.ORD_02}${order_id} to perform the transaction.`,  // eslint-disable-line
            field: 'order_id'
          }
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default ShoppingCartController;
