var bd = require('../config/dbConnection')
module.exports = {
	addUserPaciente: (req,res)=>{
		const query = {
			name: 'addUserPaciente',
			text: 'SELECT adduserpacientes($1,$2,$3,$4,$5,$6,$7,$8,$9)',
			values: [
				req.body['Nombre_P'],
				req.body['A_Paterno_P'],
				req.body['A_Materno_P'],
				req.body['Tel_P'],
				req.body['Email_P'],
				req.body['Sexo_P'],
				req.body['F_Nacimiento_P'],
				req.body['Tipo_Sangre_P'],
				req.body['Contrasena_P']
			]	
		}
		bd.query(query,(err,result)=>{
			if(!err){
				res.redirect('/usuario/ingreso')}
			else console.log(query,err)
		})
	}
}