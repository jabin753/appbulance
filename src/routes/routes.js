var inicio = require('../controllers/inicio')
var panel = require('../controllers/crum-panel')
module.exports = app => {

    app.get('/panel',inicio.panel)
    app.get('/inicio',inicio.inicio)
	app.get('/time',inicio.time)
  
  app.get('/panel/inicio',panel.inicio)
   app.get('/panel/peticiones',panel.peticiones)
    app.get('/panel/tamps',panel.tamps)
    app.get('/panel/unidades',panel.unidades)
    app.get('/panel/usuarios',panel.usuarios)
    app.get('/panel/configuracion',panel.configuracion)

    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
