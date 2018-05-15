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
            db.query({text:'SELECT perfiles.authuser($1)',
            values:[req.body]},(err,result)=>{
                console.log(err,result)
                if(!err){
                    if(result.rows[0]['authuser']){
                        var user = {id_p:result.rows[0]['authuser'],
                        style:{
                            nav_style:'navbar-dark',
                            nav_background_style:'bg-light',
                            body_style:'bg-light' 
                        }}
                        return done(null, user)
                    }
                    else return done(null, false)
                }
                else return done(null, false)
            }
            
        ) 
    }))
}