var User = require('./models/userModel')
var soren = new User()
soren.email = 'des@troyer.com'
soren.username = 'creator?'
soren.password = '1234asdf'
soren.save((err, resp)=> console.log(err, resp))
