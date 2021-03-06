// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require ('bcrypt-nodejs')
// load up the user model
//var User            = require('../models/userModel');

// expose this function to our app using module.exports
module.exports = function(passport) {


    function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    function validPassword (password) {
        return bcrypt.compareSync(password, this.password);
    };



    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // config/passport.js

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log('performing local signup')
        process.nextTick(function() {
            req.db.query(`SELECT * from gb.gb_users WHERE email='${req.email}'`,(err,result) => {
                if (err){
                    return done(err)
                }
                if (result.rows[0]) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // set the user's local credentials
                    var queryStr = `INSERT INTO gb.gb_users VALUES ('${req.body.email}', '${generateHash(password)}', '${req.body.username}', False, '${req.body.bio}', '${req.body.location}', False)`;
                    req.db.query(queryStr, function(err, sqlRes){
                        done(sqlRes)
                    })
                }
            }) 
        })
    }));
};