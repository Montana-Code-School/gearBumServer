
function retrieveAllUsers (req, res){
    req.db.query('select * from gb.gb_users', function(err, result){
      res.json(result.rows[0])
    })
}

// var User = require("../models/userModel")

function login (req, res){
	return res.json({message: "to be implemented"})
}
function logout (req, res){
	req.logout()
	res.json({loggedOut: true})
	console.log('user logged out')
}


module.exports = {
	retrieveAllUsers,
	login,
	logout,
}