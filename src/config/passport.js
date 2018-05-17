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
            db.query({text:'SELECT  * FROM perfiles.authuser2($1)',
            values:[req.body]},(err,result)=>{
                    if(result.rowCount > 0 && result.rows[0]['tipo_usr'] === 2){
                        var user = {id_usr:result.rows[0]['id_usr'],
                        tipo_usr:result.rows[0]['tipo_usr'],
                        style:{
                            nav_style:result.rows[0]['nav_style'],
                            body_style:result.rows[0]['body_style'] 
                        }}
                        return done(null, user)
                    }
                    else return done(null, false)
            }
            
        ) 
    }))

    //Autenticación local para el CRUM
    passport.use('local-crum',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'contra',
        passReqToCallback: true},  
        (req,email,contra,done) => {
            db.query({text:'SELECT  * FROM perfiles.authuser2($1)',
            values:[req.body]},(err,result)=>{
                console.log(err,result)
                if(result.rowCount > 0 && result.rows[0]['tipo_usr'] === 1 ){
                    var user = {id_usr:result.rows[0]['id_usr'],
                    tipo_usr:result.rows[0]['tipo_usr'],
                    style:{
                        nav_style:result.rows[0]['nav_style'],
                        body_style:result.rows[0]['body_style'] 
                    }}
                    return done(null, user)
                }
                else return done(null, false)
            }
        ) 
    }))
}