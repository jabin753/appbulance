var bcrypt = require('bcrypt')
var LocalStrategy = require('passport-local').Strategy
var db = require('./dbConnection')

module.exports = (passport)=>{
    
    passport.serializeUser((user, done) => {
        return done(null,user)
    })
    passport.deserializeUser((user, done) => {
        return done(null,user)
    })
    
    //Autenticación local para el paciente
    passport.use('local-usuario',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'contra',
        passReqToCallback: true},  
        (req,email,contra,done) => {
            db.query({text:'SELECT authuser($1,$2)',
            values:[req.body['email'],req.body['contra']]},(err,result)=>{
                if(!err){
                    if(result.rows[0]['authuser']){
                        var user = {id_p:result.rows[0]['authuser']}
                        return done(null, user)
                    }
                    else return done(null, false)
                }
                else return done(null, false)
            }
            
        ) 
    }))
}