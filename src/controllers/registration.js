var consultas = require('../model/model')
module.exports = {
  userCrum: (req,res)=>{
    res.render('crum-registration',{pageTitle:'Appbulance (CRUM) - Registro'})
  },
  userPaciente: (req,res)=>{
    res.render('user-registration',{pageTitle:'Appbulance - Registro'})
  },
  addUserPaciente: consultas.addUserPaciente,
  addUserCrum: (req,res,next)=>{

  },
  tamp: (req,res)=>{

  }
}