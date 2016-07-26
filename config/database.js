var pg = require('pg');

var config = {
  user: 'ghezewixgsxrga', //env var: PGUSER
  database: 'd41mr9bqibsrom', //env var: PGDATABASE
  password: 'jB3wNTUIQKlbXQXMgVLOHwoHqM', //env var: PGPASSWORD
  host: 'ec2-54-235-95-188.compute-1.amazonaws.com'
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool

function connectMiddleware(req, res, next){
  getDB(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      req.db = client
      next()
    })
}

function getDB(callback){
  console.log('CONNECTING TO HEROKU', process.env.DATABASE_URL)
    pool = pool || new pg.Pool(process.env.DATABASE_URL || config);
    pool.connect(callback)
}

module.exports = {getDB, connectMiddleware}