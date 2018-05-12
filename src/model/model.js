var bd = require('../config/dbConnection')
module.exports = {
	addUserPaciente: (req,res)=>{
		bd.query({text:'SELECT perfiles.adduserpacientes($1)',
		values:[req.body]},(err,result)=>{
			if(!err){
				res.redirect('/usuario/ingreso')} 
		})
	}
}