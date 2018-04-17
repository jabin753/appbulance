var statements = require('../model/model')
var bd = require('../config/dbConnection')

module.exports = app => {

	app.get('/time',(req,res)=>{
    bd.query(statements.showDate,(err,result)=>{
    res.render('time',{pageTitle : 'Fecha',time: result.rows})
    })
	})

    app.get('/inicio',(req,res)=>{
        res.render('index')
    })

    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
