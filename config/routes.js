/**
 * Routes for express app
 */
var express = require('express');
var _ = require('lodash');
var path = require('path');
var router = express.Router();
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var equipController = require('../controllers/equipController')

module.exports = function(app) {

  //User Routes
  router.get('/getUsers', userController.retrieveAllUsers)

  //Equip Routes
  router.post('/equip', equipController.createEquip)
  router.get('/equip/:category', equipController.retrieveEquipByCat)
  router.delete('/equip', equipController.deleteEquip)
  router.put('/equip', equipController.updateEquip)

  app.use('/api/v1', router)

}
  
  