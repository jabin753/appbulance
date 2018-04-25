var bd = require('../config/dbConnection')
module.exports = {
	showDate: (req,res,data)=>{
		const query = {
			name: 'Date',
			text: 'SELECT NOW()'
		}
		bd.query(query,(err,result)=>{
			res.render('time',{pageTitle:data.pageTitle,time: result.rows});
		})
	}
}