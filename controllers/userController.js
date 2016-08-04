
function retrieveUserByEmail (req, res){
	req.db.query(`select * from gb.gb_users WHERE email = '${req.params.email}'`, function(err, sqlRes){
      	if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		}    
	})
}

function updateUserByEmail (req, res){
	req.db.query(`UPDATE gb.gb_users SET (email, bio, username, picture) = ('${req.body.email}','${req.body.bio}','${req.body.username}','${req.body.picture}') WHERE email='${req.params.email}'`, function(err, sqlRes){
      	if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		}    
	})
}
//UPDATE table SET columnn name = new value WHERE column = old value
	// req.db.query("UPDATE gb.gb_equip SET category = 'bike' WHERE category = 'boat'", function(err, sqlRes){
	// 	if (err) {
	// 		res.json(Object.assign(err, {sqlError: true}));
	// 	} else {
	// 		res.json(sqlRes)
	// 	}
	// })

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
	updateUserByEmail,
	retrieveUserByEmail,
	login,
	logout,
}