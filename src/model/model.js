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
	authuser: (req, email, contra, done) => {
		bd.query({
			text: 'SELECT  * FROM perfiles.authuser($1)',
			values: [req.body]
		}, (err, result) => {
			if (!err) {
				if (result.rowCount > 0) {
					var user = {
						id_usr: result.rows[0]['id_usr'],
						tipo_usr: result.rows[0]['tipo_usr'],
						style: {
							nav_style: result.rows[0]['nav_style'],
							body_style: result.rows[0]['body_style']
						}
					}
					if (user.tipo_usr === 1) {
						user['id_cm'] = result.rows[0]['id']
						return done(null, user)
					} else if (user.tipo_usr === 2) {
						user['id_p'] = result.rows[0]['id']
						return done(null, user)
					} else if (user.tipo_usr === 3) {
						user['id_tmp'] = result.rows[0]['id']
						return done(null, user)
					}
					return done(null, false)
				}

			} else {
				req.flash('user-login', err.hint)
				return done(null, null)
			}
		})
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

	crumPanelUnidades: (req, res) => {
		bd.query({
			text: 'SELECT * FROM administracion.ambulancias WHERE ambulancias.id_cm = $1',
			values: [req.user.id_cm]
		}, (err, result) => {
			console.log(err,result.rows)
			res.render('CRUM Panel/panel-unidades', {
				pageTitle: 'Appbulance (CRUM) - Unidades Médicas',
				style: req.user.style,
				data: result.rows
			})
		})
	},
	crumPanelUnidades_A: (req, res) => {
		bd.query({
			text: 'INSERT INTO administracion.ambulancias(num_placa_a, num_economico_a, id_cm, estado_a)' +
				'VALUES($1,$2,$3,$4)',
			values: [req.body['num_placa_a'], req.body['num_economico_a'], req.user.id_cm, req.body['estado_a']]
		}, (err, result) => {
			console.log(err, result);
			res.redirect('/crum/unidades')
		})
	},
	crumPanelUnidades_B: (req,res) => {
		console.log(req.body)
		bd.query({
			text: 'DELETE FROM administracion.ambulancias WHERE ambulancias.num_placa_a = $1 AND ambulancias.id_cm = $2',
			values: [req.body['num_placa_a'],req.user.id_cm]
		}, (err,result) => {
			console.log(err, result);
			res.redirect('/crum/unidades')
		})
	},
	crumPanelUnidades_C: (req,res) => {
		console.log(req.body)
		bd.query({
			text: 'UPDATE administracion.ambulancias SET '+
				'num_placa_a = $2, num_economico_a=$3, estado_a=$4 WHERE id_a=$1 AND id_cm=$5',
			values: [req.body['id_a'],req.body['num_placa_a'],req.body['num_economico_a'],req.body['estado_a'],req.user.id_cm]
		}, (err,result) => {
			console.log(err, result);
				res.redirect('/crum/unidades')
		})
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

