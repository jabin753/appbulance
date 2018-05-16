var inicio = require('../controllers/inicio')
var crum  = require('../controllers/crum-panel')
var user  = require('../controllers/user-panel')
var login  = require('../controllers/login')
var registration  = require('../controllers/registration')
module.exports = (app,passport) => {    
    app.get('/',inicio.inicio)
    
    //Exclusive Users Routes
    app.get('/usuario/*',user.sesion)
    app.get('/usuario/registro',registration.userPaciente)
    app.post('/usuario/registro',registration.addUserPaciente)
    app.get('/usuario/ingreso',login.validateUser,login.user)
    app.post('/usuario/ingreso',passport.authenticate('local-usuario',{
        successRedirect : '/usuario/inicio',
        failureRedirect : '/usuario/ingreso'
    }))
    app.get('/usuario/inicio',user.sesion,user.inicio)
<<<<<<< HEAD
<<<<<<< HEAD

    //Exclusive CRUM Routes
    app.get('/crum/registro',registration.userCrum)
    app.post('/crum/registro',registration.addUserCrum)
    app.get('/crum/ingreso',login.validateCrum,login.crum)
    app.post('/crum/ingreso',passport.authenticate('local-crum',{
        successRedirect : '/crum/inicio',
        failureRedirect : '/crum/ingreso'
    }))
    app.get('/crum/*',crum.sesion)
    app.get('/crum/inicio',crum.inicio)
=======
    app.get('/crum',crum.sesion,crum.inicio)
    app.get('/crum/*',crum.sesion)
>>>>>>> 14f5f3632899ea2af3b7541818478f633a3caaf8
=======
    app.get('/crum',crum.sesion,crum.inicio)
    app.get('/crum/*',crum.sesion)
>>>>>>> 14f5f3632899ea2af3b7541818478f633a3caaf8
    app.get('/crum/peticiones',crum.peticiones)
    app.get('/crum/tamps',crum.tamps)
    app.get('/crum/unidades',crum.unidades)
    app.get('/crum/usuarios',crum.usuarios)
    app.get('/crum/configuracion',crum.configuracion)
<<<<<<< HEAD
<<<<<<< HEAD
    
=======
    app.get('/crum/registro')   /*AQUI AGREGA LOS PARAMETROS DE SESION*/
>>>>>>> 14f5f3632899ea2af3b7541818478f633a3caaf8
=======
    app.get('/crum/registro')   /*AQUI AGREGA LOS PARAMETROS DE SESION*/
>>>>>>> 14f5f3632899ea2af3b7541818478f633a3caaf8
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/usuario/ingreso');
    })
    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
