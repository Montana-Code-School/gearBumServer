var pg = require('pg');

process.env.DATABASE_URL
var parseDbUrl = require("parse-database-url");

const localConfig = {
  user: 'Soren', //env var: PGUSER
  database: 'gearbum', //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
  host: 'localhost',
  port: 5432, //env var: PGPORT
};

var config = process.env.DATABASE_URL ? parseDbUrl(process.env.DATABASE_URL) : localConfig;
config.max = 10000;
config.idleTimeoutMillis = 1000;

var pool

function connectMiddleware(req, res, next){
  getDB(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      var resSend = res.send
      res.send = function(){
        done()
        return resSend.bind(res)(...arguments)
      }
      req.db = client
      req.db.done = done
      next()
    })
}

function getDB(callback){
    console.log(pool ? 'Pool Exists' : 'Creating Pool Connection')
    pool = pool || new pg.Pool(config);
    pool.connect(callback)
}

module.exports = {getDB, connectMiddleware}