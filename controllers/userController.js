
function retrieveUserByID (req, res){
	req.db.query(`select * from gb.gb_users WHERE usersid = '${req.params.usersid}'`, function(err, sqlRes){
      	if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		}    
	})
}
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
	req.db.query(`UPDATE gb.gb_users SET (email, bio, username) = ('${req.body.email}','${req.body.bio}','${req.body.username}') WHERE email='${req.params.email}'`, function(err, sqlRes){
      	if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		}    
	})
}


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
	retrieveUserByID,
	retrieveUserByEmail,
	login,
	logout,
}