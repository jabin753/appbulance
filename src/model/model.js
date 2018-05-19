var bd = require('../config/dbConnection')
module.exports = {
	addUserCrum: (req,res)=>{
		bd.query({text:'SELECT * FROM perfiles.addusercrum($1)',
		values:[req.body]},(err,result)=>{
			if(!err){
				req.redirect('/crum/ingreso')
			} else{
				req.flash('error','Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	addUserPaciente: (req,res)=>{
		bd.query({text:'SELECT * FROM perfiles.adduserpacientes($1)',
		values:[req.body]},(err,result)=>{
			if(!err){
				res.redirect('/usuario/ingreso')
			} 
			else{
				req.flash('error','Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	addUserTamp: (req,res)=>{
		bd.query({text:'SELECT * FROM perfiles.addusertamp($1)',
		values:[req.body]},(err,result)=>{
			if(!err){
				req.flash('tamp-registration-succesful','Usuario registrado')
				res.redirect('/tamp/ingreso')
			} 
			else {
				
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
	)}
}