var pg = require('pg');

var config = {
  user: 'Soren', //env var: PGUSER
  database: 'gearbum', //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
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
    pool = pool || new pg.Pool(process.env.DATABASE_URL || config);
    pool.connect(callback)
}

module.exports = {getDB, connectMiddleware}