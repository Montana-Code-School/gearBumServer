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

module.exports = function(app, passport) {

 	//User Routes
  	router.get('/getUsers', userController.retrieveAllUsers)
	
	router.post('/login', passport.authenticate('local-login', {
	    successRedirect : '/api/v1/login/success', // redirect to the secure profile section
	    failureRedirect : '/api/v1/login/failure', // redirect back to the signup page if there is an error
	    failureFlash : true // allow flash messages
	}));

	router.get('/login/:result', function(req, res){
	res.json({success: 'success' === req.params.result, user: req.user})
	});

	router.get('/user', function(req, res){
	if(req.isAuthenticated()){
	  res.json({user:req.user,loggedIn:true})
	} else {
	  res.json({loggedIn: false})
	}
	})

  	router.post('/logout', userController.logout); 

  	router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/success', // redirect to the secure profile section
        failureRedirect : '/brutalfailure', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  	}));

  	//Equip Routes
  	router.post('/equip', equipController.createEquip)
  	router.get('/equip/:category', equipController.retrieveEquipByCat)
  	router.delete('/equip', equipController.deleteEquip)
  	router.put('/equip', equipController.updateEquip)
  	router.get('/equip', equipController.retrieveAllEquip)

  	app.use('/api/v1', router)

}
  
  