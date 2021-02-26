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
//middleware
const verifyTokenMiddleWare = require('../middlewares/verifyToken');

/* === User Routes === */

//Get Request
router.get('/fetchuser',verifyTokenMiddleWare.verifyToken, userController.getReadUser);

router.get('/deleteuser:uid',verifyTokenMiddleWare.verifyToken, userController.getDeleteUser);

//Delete Request
router.delete('/logout', userController.logout);

//Post Request
router.post('/signup', userController.postCreateUser);

router.post('/updateuser',verifyTokenMiddleWare.verifyToken, userController.postUpdateUser);

router.post('/login', userController.postLogin);

router.post('/refreshtoken', userController.postRefreshToken);

//Testing API's  for Development
router.get('/test/fetchusers', userController.getAllUser);



/* === Menu Routes === */

//POST Request
router.post('/menu/newitem', menuController.postNewItem);

router.post('/menu/fetchmenu', menuController.fetchMenu);

router.post('/menu/updateitem', menuController.updateNewItem);

router.delete('/menu/deleteitem/:item_id', menuController.deleteItem);


/* === Restaurant Routes === */

//POST Request
router.post('/restaurant/new', restaurantController.postCreateRestaurant);

router.post('/restaurant/fetchall', restaurantController.postReadRestaurant);

router.post('/restaurant/update', restaurantController.postUpdateRestaurant);

//DELETE Request
router.delete('/restaurant/delete/:restaurant_id', restaurantController.postDeleteRestaurant);



/* === Outlet Routes === */

//POST Request
router.post('/outlet/new', outletController.postCreateOutlet);

router.post('/outlet/fetchall', outletController.postReadOutlet);

router.post('/outlet/update', outletController.postUpdateOutlet);

//DELETE Request
router.delete('/outlet/delete/:outlet_id', outletController.deleteDeleteOutlet);


/* === Employee Routes === */
router.post('/employee/new', employeeController.postNewEmployee); //tested

router.post('/employee/fetchall', employeeController.postFetchEmployee); //tested

router.post('/employee/update', employeeController.postUpdateEmployee);

//DELETE Request
router.delete('/employee/delete/:employee_id', employeeController.deleteDeleteEmployee);

module.exports = router;