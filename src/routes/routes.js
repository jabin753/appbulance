var inicio = require('../controllers/inicio')
var crum  = require('../controllers/crum-panel')
var user  = require('../controllers/user-panel')
var login  = require('../controllers/login')
var registration  = require('../controllers/registration')
module.exports = (app,passport) => {    
    app.get('/',inicio.inicio)
    app.get('/usuario/inicio', )
    app.get('/usuario/registro',registration.userPaciente)
    app.post('/usuario/registro',registration.addUserPaciente)
    
    app.get('/usuario/ingreso',login.sesion,login.user)
    app.post('/usuario/ingreso',passport.authenticate('local-usuario',{
        successRedirect : '/usuario/inicio',
        failureRedirect : '/usuario/ingreso'
    }))
    app.get('/usuario/inicio',user.sesion,user.inicio)
    app.get('/crum',crum.sesion,crum.inicio)
    app.get('/crum/*',crum.sesion)
    app.get('/crum/peticiones',crum.peticiones)
    app.get('/crum/tamps',crum.tamps)
    app.get('/crum/unidades',crum.unidades)
    app.get('/crum/usuarios',crum.usuarios)
    app.get('/crum/configuracion',crum.configuracion)
    app.get('/crum/registro')   /*AQUI AGREGA LOS PARAMETROS DE SESION*/
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/usuario/ingreso');
    })
    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
