var bd = require('../config/dbConnection')
module.exports = {
	addUserCrum: (req,res)=>{
		bd.query({text:'SELECT * FROM perfiles.addusercrum($1)',
		values:[req.body]},(err,result)=>{
			if(!err){
				req.redirect('/crum/ingreso')
			} else{
				req.flash('crum-registration','Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	addUserTamp: (req,res)=>{
		bd.query({text:'SELECT * FROM perfiles.addusertamp($1)',
		values:[req.body]},(err,result)=>{
			if(!err){
				res.redirect('/tamp/ingreso')
			} 
			else {
				req.flash('tamp-registration','Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	addUserPaciente: (req,res)=>{
		bd.query({text:'SELECT * FROM perfiles.adduserpacientes($1)',
		values:[req.body]},(err,result)=>{
			console.log(err)
			if(!err){
				res.redirect('/usuario/ingreso')
			} 
			else{
				req.flash('user-registration','Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	authusercrum: (req,email,contra,done) => {
		bd.query({text:'SELECT  * FROM perfiles.authuser($1)',
		values:[req.body]},(err,result)=>{
			if(result.rowCount > 0){
				if(result.rows[0]['tipo_usr'] === 1){
					var user = {id_usr:result.rows[0]['id_usr'],
					tipo_usr:result.rows[0]['tipo_usr'],
					style:{
						nav_style:result.rows[0]['nav_style'],
						body_style:result.rows[0]['body_style'] 
					}}
					return done(null, user)
				}
				else {
					req.flash('crum-login','No cuenta con los persmisos suficientes para acceder')
					return done(null, false)
				}
			}
			else {
				req.flash('crum-login','Usuario o contraseña incorrecta')
				return done(null, false)
			}
		}
	)},
	authuser: (req,email,contra,done) => {	
		bd.query({text:'SELECT  * FROM perfiles.authuser($1)',
		values:[req.body]},(err,result)=>{
			if(result.rowCount > 0){
				if(result.rows[0]['tipo_usr'] === 2){
					var user = {id_usr:result.rows[0]['id_usr'],
					tipo_usr:result.rows[0]['tipo_usr'],
					style:{
						nav_style:result.rows[0]['nav_style'],
						body_style:result.rows[0]['body_style'] 
					}}
					return done(null, user)
				}
				else {
					req.flash('user-login','No cuenta con los persmisos suficientes para acceder')
					return done(null, false)
				}
			}
			else {
				req.flash('user-login','Usuario o contraseña incorrecta')
				return done(null, false)
			}
		}
	)},
	authusertamp: (req,email,contra,done) => {
		bd.query({text:'SELECT  * FROM perfiles.authuser($1)',
		values:[req.body]},(err,result)=>{
			if(result.rowCount > 0){
				if(result.rows[0]['tipo_usr'] === 3){
					var user = {id_usr:result.rows[0]['id_usr'],
					tipo_usr:result.rows[0]['tipo_usr'],
					style:{
						nav_style:result.rows[0]['nav_style'],
						body_style:result.rows[0]['body_style'] 
					}}
					return done(null, user)
				}
				else {
					req.flash('tamp-login','No cuenta con los persmisos suficientes para acceder')
					return done(null, false)
				}
			}
			else {
				req.flash('tamp-login','Usuario o contraseña incorrecta')
				return done(null, false)
			}
		}
	)},
	crumPanelTamp:(req,res) =>{},
	crumPanelUnidades:(req,res) => {
		bd.query({
			text: 'SELECT * FROM administracion.get_a($1)',
			values: [req.user.id_usr]
		},(err,response) => {
			res.render('CRUM Panel/panel-unidades',{
				pageTitle:'Appbulance (CRUM) - Unidades Médicas',
				style:req.user.style,
				data: response.rows
			})
		})
	},
	crumPanelUnidadesAdd:(req,res) => {
		bd.query({
			text: 'INSERT INTO administracion.ambulancias(num_placa_a, num_economico_a, id_cm, estado_a)'+
				  'VALUES($1,$2,$3,$4)',
			values: [req.body['num_placa_a'],req.body['num_economico_a'],2,req.body['estado_a']]
		},(err,response) => {
			console.log(err,response);
			res.redirect('/crum/unidades')
		})
	}
}