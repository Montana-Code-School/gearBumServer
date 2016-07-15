
function retrieveAllUsers (req, res){
    req.db.query('select * from gb.gb_users', function(err, result){
      res.json(result.rows[0])
    })
}

module.exports = {
	retrieveAllUsers
}