import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();


router.post('/customers', CustomerController.create);

router.post('/customers', CustomerController.getCustomerProfile);
router.post('/customers/login', CustomerController.login);

/**Endpoint: /customers/facebook
 * Method: CustomerController.facebook
 * is custom written */
router.post('/customers/facebook', CustomerController.facebook);

router.get('/customer', CustomerController.getCustomerById);
router.put('/customer', CustomerController.updateCustomerDetails);
router.put('/customer/address', CustomerController.updateCustomerAddress);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
