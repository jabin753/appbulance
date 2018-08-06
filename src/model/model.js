var bd = require('../config/dbConnection')
module.exports = {
	addUserCrum: (req, res) => {
		bd.query({
			text: 'SELECT * FROM perfiles.addusercrum($1)',
			values: [req.body]
		}, (err, result) => {
			if (!err) {
				req.redirect('/crum/ingreso')
			} else {
				req.flash('crum-registration', 'Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	addUserTamp: (req, res) => {
		bd.query({
			text: 'SELECT * FROM perfiles.addusertamp($1)',
			values: [req.body]
		}, (err, result) => {
			if (!err) {
				res.redirect('/tamp/ingreso')
			} else {
				req.flash('tamp-registration', 'Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	addUserPaciente: (req, res) => {
		bd.query({
			text: 'SELECT * FROM perfiles.adduserpacientes($1)',
			values: [req.body]
		}, (err, result) => {
			console.log(err)
			if (!err) {
				res.redirect('/usuario/ingreso')
			} else {
				req.flash('user-registration', 'Error al registrar el usuario, inténtelo de nuevo')
				res.redirect('/usuario/registro')
			}
		})
	},
	authuser: async (req, email, contra, done) => {
		try{
			const res = await bd.query('SELECT  * FROM perfiles.authuser($1)',[req.body])
			var user = {
				id_usr: res.rows[0]['id_usr'],
				tipo_usr: res.rows[0]['tipo_usr'],
				style: {
					nav_style: res.rows[0]['nav_style'],
					body_style: res.rows[0]['body_style']
				}
			}
			switch(user.tipo_usr){
				case 1:
					user['id_cm'] = res.rows[0]['id']
					return done(null, user)
				case 2:
					user['id_p'] = res.rows[0]['id']
					return done(null, user)
				case 3:
					user['id_tmp'] = res.rows[0]['id']
					return done(null, user)
				default:
				return done(null, false)
			}
		}catch(err){
			console.log(err)
			req.flash('user-login', err.hint)
			return done(null, false)
		}
	},
	crumPanelPeticiones: (req,res)=>{
		bd.query({
			text: 'SELECT * FROM peticiones.peticiones WHERE peticiones.id_cm = $1',
			values: [req.user.id_cm]
		}, (err,result) => {
			console.log(err,result.rows)
			res.render('CRUM Panel/panel-peticiones',
			{pageTitle:'Appbulance (CRUM) - Peticiones',
			style:req.user.style,
			data:result.rows})
		})
		
	},
	crumPanelPeticiones_A: (req,res)=>{
		bd.query({
			text: 'INSERT ...',
			values: [req.body['id_pt'],req.user.id_cm]
		}, (err,result) => {
			
		})
	},
	crumPanelPeticiones_B: (req,res)=>{
		bd.query({
			text: 'DELETE ...',
			values: [req.body['id_pt'],req.user.id_cm]
		}, (err,result) => {
			
		})
	},
	crumPanelPeticiones_C: (req,res)=>{
		bd.query({
			text: 'UPDATE ...',
			values: [req.body['id_pt'],req.user.id_cm]
		}, (err,result) => {
			
		})
	},
	crumPanelTamps: (req,res)=>{
		bd.query({
			text: 'SELECT * FROM perfiles.tamps WHERE tamps.id_cm = $1',
			values: [req.user.id_cm]
		}, (err,result) => {
			console.log(err,result.rows)
			res.render('CRUM Panel/panel-tamps',{
				pageTitle:'Appbulance (CRUM) - tamps',
				style:req.user.style,
				data:result.rows})
			})
	},
	crumPanelTamps_A: (req,res)=>{
		bd.query({
			text: 'INSERT ...',
			values: [req.body['id_tmp'],req.user.id_cm]
		}, (err,result) => {		
			})
	},
	crumPanelTamps_B: (req,res)=>{
		bd.query({
			text: 'DELETE ...',
			values: [req.body['id_tmp'],req.user.id_cm]
		}, (err,result) => {
				
		})
	},
	crumPanelTamps_C: (req,res)=>{
		bd.query({
			text: 'UPDATE ...',
			values: [req.body['id_tmp'],req.user.id_cm]
		}, (err,result) => {
				
			})
	},	
	crumPanelUnidades: async(req, res) => {
		try{
			res.render('CRUM Panel/panel-unidades', {
				pageTitle: 'Appbulance (CRUM) - Unidades Médicas',
				style: req.user.style,
			})
		}
		catch(err){
			console.log(err)
		}		
	},
	crumPanelUnidades_A: async(req, res) => {
		try{
			const result = await bd.query(
				'INSERT INTO administracion.ambulancias(num_placa_a, num_economico_a, id_cm, estado_a)' +
				'VALUES($1,$2,$3,$4)',
				[req.body['num_placa_a'], req.body['num_economico_a'], req.user.id_cm, req.body['estado_a']]	
			)
			res.redirect('/crum/unidades')
		}
		catch(err){
			console.log(err)
		}
	},
	crumPanelUnidades_B: async(req,res) => {
		try{
			const result = await bd.query(
				'DELETE FROM administracion.ambulancias '+
				'WHERE ambulancias.num_placa_a = $1 AND ambulancias.id_cm = $2',
				[req.body['num_placa_a'],req.user.id_cm]	
			)
			res.redirect('/crum/unidades')
		}
		catch(err){
			console.log(err)
		}
	},
	crumPanelUnidades_C: async(req,res) => {
		try{
			const result = await bd.query(
				'UPDATE administracion.ambulancias SET '+
				'num_placa_a = $2, num_economico_a=$3, estado_a=$4 '+
				'WHERE id_a=$1 AND id_cm=$5',
				[req.body['id_a'],req.body['num_placa_a'],req.body['num_economico_a'],req.body['estado_a'],req.user.id_cm]	
			)
			res.redirect('/crum/unidades')
		}
		catch(err){
			console.log(err)
		}
	},	
	crumPanelUsuarios: (req, res) => {
		bd.query({
			text: 'SELECT * FROM perfiles.pacientes WHERE id_cm = $1',
			values: [req.user.id_cm]
		}, (err, result) => {
			console.log(err,result.rows)
			res.render('CRUM Panel/panel-usuarios', {
				pageTitle: 'Appbulance (CRUM) - Unidades Médicas',
				style: req.user.style,
				data: result.rows
			})
		})
	},
	crumPanelUsuarios_A: (req, res) => {
		bd.query({
			text: 'INSERT ...',
			values: [req.body['id_usr'],req.user.id_cm]
		}, (err, result) => {
			console.log(err, result);
			res.redirect('/crum/usuarios')
		})
	},
	crumPanelUsuarios_B: (req,res) => {
		bd.query({
			text: 'DELETE FROM ...',
			values: [req.body['id_usr'],req.user.id_cm]
		}, (err,result) => {
			
		})
	},
	crumPanelUsuarios_C: (req,res) => {
		bd.query({
			text: 'UPDATE ...',
			values: [req.body['id_usr'],req.user.id_cm]
		}, (err,result) => {
			
		})
	}
}
	
	