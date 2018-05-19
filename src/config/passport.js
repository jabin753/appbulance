var LocalStrategy = require('passport-local').Strategy
var db = require('./../model/model')

module.exports = (passport)=>{
    
    passport.serializeUser((user, done) => {
        return done(null,user)
    })
    passport.deserializeUser((user, done) => {
        return done(null,user)
    })
    
    //Autenticación local para el CRUM
    passport.use('local-crum',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'contra',
        passReqToCallback: true}, 
        db.authusercrum 
    ))
    
    //Autenticación local para el paciente
    passport.use('local-usuario',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'contra',
        passReqToCallback: true}, 
        db.authuser 
    ))
    
    //Autenticación local para el TAMP
    passport.use('local-tamp',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'contra',
        passReqToCallback: true}, 
        db.addUserTamp 
    ))
}