var bd = require('../config/dbConnection')
module.exports = {
	addUser: (req,res)=>{
		const query = {
			name: 'addUser',
			text: 'INSERT INTO public.pacientes(\
				"Nombre_P",\
				"A_Paterno_P",\
				"A_Materno_P",\
				"Tel_P",\
				"Email_P",\
				"Sexo_P",\
				"F_Nacimiento_P",\
				"Tipo_Sangre_P",\
				"Contrasena_P")\
				VALUES($1,$2,$3,$4,$5,$6,$7,$8,md5($9))',
			values: [req.body['Nombre_P'],
				req.body['A_Paterno_P'],
				req.body['A_Materno_P'],
				req.body['Tel_P'],
				req.body['Email_P'],
				req.body['Sexo_P'],
				req.body['F_Nacimiento_P'],
				req.body['Tipo_Sangre_P'],
				req.body['Contrasena_P']]
		}
		bd.query(query,(err,result)=>{
			if(!err){
				res.redirect('/usuario/ingreso')}
			else console.log(query,err)
		})
	}
}