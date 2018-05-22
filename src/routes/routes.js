var inicio = require('../controllers/inicio')
var crum  = require('../controllers/crum-panel')
var user  = require('../controllers/user-panel')
var tamp  = require('../controllers/tamp-panel')
var login  = require('../controllers/login')
var registration  = require('../controllers/registration')
module.exports = (app,passport) => {    
    app.get('/',inicio.inicio)
    
    //Exclusive Users Routes
    app.get('/usuario/registro',registration.userPaciente)
    app.post('/usuario/registro',registration.addUserPaciente)
    app.get('/usuario/ingreso',login.validateUser,login.user)
    app.post('/usuario/ingreso',passport.authenticate('local-usuario',{
        successRedirect : '/usuario/inicio',
        failureRedirect : '/usuario/ingreso'
    }))
    app.get('/usuario/inicio',user.sesion,user.inicio)
    
    //Exclusive CRUM Routes
    app.get('/crum/registro',registration.userCrum)
    app.post('/crum/registro',registration.addUserCrum)
    app.get('/crum/ingreso',login.validateCrum,login.crum)
    app.post('/crum/ingreso',passport.authenticate('local-crum',{
        successRedirect : '/crum/inicio',
        failureRedirect : '/crum/ingreso'
    }))
    app.get('/crum/inicio',crum.sesion,crum.inicio)
    app.get('/crum/peticiones',crum.sesion,crum.peticiones)
    app.get('/crum/tamps',crum.sesion,crum.tamps)
    app.get('/crum/unidades',crum.sesion,crum.unidades)
    app.get('/crum/usuarios',crum.sesion,crum.usuarios)
    app.get('/crum/configuracion',crum.sesion,crum.configuracion)
    
    //Exclusive TAMP Routes
    app.get('/tamp/registro',registration.userTamp)
    app.post('/tamp/registro',registration.addUserTamp)
    app.get('/tamp/ingreso',login.validateUser,login.tamp)
    app.post('/tamp/ingreso',passport.authenticate('local-tamp',{
        successRedirect : '/tamp/inicio',
        failureRedirect : '/tamp/ingreso'
    }))
        /*Falta agregar las sesiones de tamp*/
    app.get('/tamp/inicio',user.sesion,user.inicio)
    app.get('/tamp/peticion',user.sesion,user.peticion)

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/usuario/ingreso');
    })
    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
