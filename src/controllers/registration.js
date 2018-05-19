var consultas = require('../model/model')
module.exports = {
  userCrum: (req,res)=>{
    res.render('crum-registration',{pageTitle:'Appbulance (CRUM) - Registro'})
  },
  userPaciente: (req,res)=>{
    res.render('user-registration',{pageTitle:'Appbulance - Registro'})
  },
  userTamp: (req,res)=>{
    res.render('tamp-registration',{pageTitle:'Appbulance - Registro'})
  },
  addUserCrum: consultas.addUserCrum,
  addUserPaciente: consultas.addUserPaciente,
  addUserTamp: consultas.addUserTamp
}