
var bcrypt = require ('bcrypt-nodejs')
var db = require('../config/database').getDB
var _ = require('lodash')

var properties = [
	'email',
	'password',
	'username',
	'usersid',
]

var table = 'gb.gb_users'
var idColumn = 'usersid'

function User(){

}

User.findById =function(id, callback){
	db(function(err, client, done){
		client.query(`SELECT * FROM ${table} WHERE ${idColumn}='${id}'`, (err, resp) =>{
			done()
			if (err) return callback(err);
			if (resp.rows.length === 0) return callback (new Error('No user found'))
			var user = new User()
			properties.map(property => 
				user[property] = resp.rows[0][property])
			callback(undefined, user)
		})
	})


}

User.findOne =function(searchObj, callback){
	db(function(err, client, done){
		var searchTerms = []
		for (var key in searchObj){
			searchTerms.push(`${key}='${searchObj[key]}'`)
		}
		var searchClause = searchTerms.length ? `WHERE ${searchTerms.join(' AND ')}`: ''
		var queryString = `SELECT * FROM ${table} ${searchClause} LIMIT 1;`
		console.log("Querying", queryString)
		client.query(queryString, (err, resp) =>{
			done()
			if (err) return callback(err);
			if (resp.rows.length === 0) return callback ()
			var user = new User()
			properties.map(property => 
				user[property] = resp.rows[0][property])
			console.log('USER', user)
			callback(undefined, user)
		})
	})
}

User.prototype.generateHash =function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


User.prototype.save =function(callback){
	db((err, client, done)=>{
		var queryString = `INSERT INTO ${table} (${properties.filter(property=> this[property]).join(', ')}) VALUES (${properties.filter(property=> this[property] !== undefined).map(property => `'${this[property]}'`).join(', ')}) RETURNING usersid;`
		client.query(queryString, (err, resp) =>{
			this.usersid = _.get(resp, 'rows[0].usersid', undefined)
			done()
			callback(err, resp)
		} )
	})


}

module.exports = User