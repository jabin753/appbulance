var inicio = require('../controllers/inicio')
var crum  = require('../controllers/crum-panel')
var user  = require('../controllers/user-panel')
var tamp = require('../controllers/tamp-panel')
var login  = require('../controllers/login')
var registration  = require('../controllers/registration')
module.exports = (app,passport) => {   
    app.get('/',login.validate,login.user)
    app.get('/nosotros',inicio.inicio) 
    app.get('/usuario/ingreso',login.validate,login.user)
    app.post('/usuario/ingreso',passport.authenticate('local',{failureRedirect : '/usuario/ingreso'}),login.validate)
    //Exclusive Users Routes
    app.get('/usuario/registro',registration.userPaciente)
    app.post('/usuario/registro',registration.addUserPaciente)
    app.get('/usuario/inicio',user.sesion,user.inicio)
    //Exclusive CRUM Routes
    app.get('/crum/inicio',crum.sesion,crum.inicio)

    app.get('/crum/peticiones',crum.sesion,crum.peticiones)
    app.post('/crum/peticiones-A',crum.sesion,crum.peticiones_A)
    app.post('/crum/peticiones-B',crum.sesion,crum.peticiones_B)
    app.post('/crum/peticiones-C',crum.sesion,crum.peticiones_C)
    
    app.get('/crum/tamps',crum.sesion,crum.tamps)
    app.post('/crum/tamps-A',crum.sesion,crum.tamps_A)
    app.post('/crum/tamps-B',crum.sesion,crum.tamps_B)
    app.post('/crum/tamps-C',crum.sesion,crum.tamps_C)

    app.get('/crum/unidades',crum.sesion,crum.unidades)
    app.post('/crum/unidades-A',crum.sesion,crum.unidades_A)
    app.post('/crum/unidades-B',crum.sesion,crum.unidades_B)
    app.post('/crum/unidades-C',crum.sesion,crum.unidades_C)

    app.get('/crum/usuarios',crum.sesion,crum.usuarios)
    app.post('/crum/usuarios-A',crum.sesion,crum.usuarios_A)
    app.post('/crum/usuarios-B',crum.sesion,crum.usuarios_B)
    app.post('/crum/usuarios-C',crum.sesion,crum.usuarios_C)

    app.get('/crum/configuracion',crum.sesion,crum.configuracion)
    //Exclusive TAMP Routes
    app.get('/tamp/inicio',tamp.sesion,tamp.inicio)
    
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/usuario/ingreso');
    })
    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
