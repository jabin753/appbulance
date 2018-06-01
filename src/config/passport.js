var LocalStrategy = require('passport-local').Strategy
var model = require('./../model/model')

module.exports = (passport) => {
    
    passport.serializeUser((user, done) => {
        return done(null,user)
    })
    passport.deserializeUser((user, done) => {
        return done(null,user)
    })
  
    //Autenticación local para los usuarios
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'contra',
        passReqToCallback: true}, 
        model.authuser 
    ))
}