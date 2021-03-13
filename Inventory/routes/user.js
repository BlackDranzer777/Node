const express = require('express');
const path = require('path');

//Router
const router = express.Router();

//Controllers
const menuController = require('../controllers/user/menu');
const userController = require('../controllers/user/user');
const restaurantController = require('../controllers/user/restaurant');
const outletController = require('../controllers/user/outlet');
const employeeController = require('../controllers/user/employee');
const customerController = require('../controllers/user/customer');
const orderController = require('../controllers/user/order');
//middleware
const verifyTokenMiddleWare = require('../middlewares/verifyToken');

/* === User Routes === */

//Get Request
router.get('/fetchuser', verifyTokenMiddleWare.verifyToken , userController.getReadUser);

router.get('/deleteuser:uid',verifyTokenMiddleWare.verifyToken , userController.getDeleteUser);

//Delete Request
router.delete('/logout', userController.logout);

//Post Request
router.post('/signup', userController.postCreateUser);

router.post('/updateuser', verifyTokenMiddleWare.verifyToken, userController.postUpdateUser);

router.post('/login', userController.postLogin);

// router.post('/refreshtoken', userController.postRefreshToken);



/* === Menu Routes === */

//POST Request
router.post('/menu/newitem',verifyTokenMiddleWare.verifyToken, menuController.postNewItem);

router.post('/menu/fetchmenu',verifyTokenMiddleWare.verifyToken, menuController.fetchMenu);

router.post('/menu/updateitem',verifyTokenMiddleWare.verifyToken, menuController.updateNewItem);

router.delete('/menu/deleteitem/:item_id',verifyTokenMiddleWare.verifyToken, menuController.deleteItem);


/* === Restaurant Routes === */

//POST Request
router.post('/restaurant/new',verifyTokenMiddleWare.verifyToken, restaurantController.postCreateRestaurant);

router.post('/restaurant/fetchall',verifyTokenMiddleWare.verifyToken, restaurantController.postReadRestaurant);

router.post('/restaurant/update',verifyTokenMiddleWare.verifyToken, restaurantController.postUpdateRestaurant);

//DELETE Request
router.delete('/restaurant/delete/:restaurant_id',verifyTokenMiddleWare.verifyToken, restaurantController.postDeleteRestaurant);



/* === Outlet Routes === */

//POST Request
router.post('/outlet/new',verifyTokenMiddleWare.verifyToken, outletController.postCreateOutlet);

router.post('/outlet/fetchall',verifyTokenMiddleWare.verifyToken, outletController.postReadOutlet);

router.post('/outlet/update',verifyTokenMiddleWare.verifyToken, outletController.postUpdateOutlet);

//DELETE Request
router.delete('/outlet/delete/:outlet_id',verifyTokenMiddleWare.verifyToken, outletController.deleteDeleteOutlet);


/* === Employee Routes === */
router.post('/employee/new',verifyTokenMiddleWare.verifyToken, employeeController.postNewEmployee); //tested

router.post('/employee/fetchall',verifyTokenMiddleWare.verifyToken, employeeController.postFetchEmployee); //tested

router.post('/employee/update',verifyTokenMiddleWare.verifyToken, employeeController.postUpdateEmployee);

//DELETE Request
router.delete('/employee/delete/:employee_id',verifyTokenMiddleWare.verifyToken, employeeController.deleteDeleteEmployee);


/* === Customer Routes === */
router.post('/customer/new',verifyTokenMiddleWare.verifyToken, customerController.postNewCustomer); 

router.post('/customer/fetchall/outlet/:outlet_id',verifyTokenMiddleWare.verifyToken, customerController.postFetchCustomerByOutlet);

router.post('/customer/fetchall/customer/:customer_id',verifyTokenMiddleWare.verifyToken, customerController.postFetchCustomerByCustomerID);

router.post('/customer/update',verifyTokenMiddleWare.verifyToken, customerController.postUpdateCustomer);


//DELETE Request
router.delete('/customer/delete/:customer_id',verifyTokenMiddleWare.verifyToken, customerController.deleteDeleteCustomer);


/* === Order Routes === */

//POST Request
router.post('/order/new',verifyTokenMiddleWare.verifyToken, orderController.postNewOrder); 

router.post('/order/fetchall/outlet/:outlet_id',verifyTokenMiddleWare.verifyToken, orderController.postFetchOrderByOutlet );

router.post('/order/fetchall/customer/:customer_id',verifyTokenMiddleWare.verifyToken, orderController.postFetchOrderByCustomerID );

router.post('/order/fetch/:order_id',verifyTokenMiddleWare.verifyToken, orderController.postFetchOrderByOrderID);

router.post('/order/update',verifyTokenMiddleWare.verifyToken, orderController.postUpdateOrder);

//DELETE Request
router.delete('/customer/delete/:order_id',verifyTokenMiddleWare.verifyToken, orderController.deleteDeleteOrder);

module.exports = router;