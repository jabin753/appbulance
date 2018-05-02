var bcrypt = require('bcrypt')
var LocalStrategy = require('passport-local').Strategy
var db = require('./dbConnection')

module.exports = (passport)=>{
    //Autenticación local
    passport.use(new LocalStrategy((username,password,cb) =>{
        console.log('Iniciando autenticación')
        db.query('SELECT ID_P, Email_P, Contrasena_P from pacientes WHERE Email_P = $1',[username],
    (err,result) =>{
        if(err){
            return cb(err)
        }
        if(result.rows.lenght > 0){
            const first = result.rows[0]
            bcrypt.compare(password, first.password, (err,res)=>{
                if(res){
                    cb(null,{id: first.id, username:first.username})
                }
                else{
                    cb(null, false)
                }
            })
        } else{
            cb(null,false)
        }
    })
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
      })
      passport.deserializeUser((id, cb) => {
        db.query('SELECT ID_P, Email_P, Contrasena_P from pacientes WHERE Email_P = $1', [parseInt(id, 10)], (err, results) => {
          if(err) {
            return cb(err)
          }
          cb(null, results.rows[0])
        })
      })
}