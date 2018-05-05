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
    
    //Autenticación local
    passport.use('local-usuario',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'contra',
        passReqToCallback: true},  
        (req,email,contra,done) => {
            db.query({text:'SELECT * FROM public.pacientes WHERE "Email_P" = $1 AND "Contrasena_P" = md5($2)',
            values:[req.body['email'],req.body['contra']]},(err,result)=>{
                if(!err){
                    if(result.rowCount > 0){
                        var user = result.rows[0]
                        return done(null, user)
                    }
                    else return done(null, false)
                }
                
                else return done(null, false)
            }
            
        ) 
    }))
}