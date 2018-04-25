var inicio = require('../controllers/inicio')

module.exports = app => {
    
    app.get('/panel',inicio.panel)
    app.get('/inicio',inicio.inicio)
	app.get('/time',inicio.time)
    
    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
