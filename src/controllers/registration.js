var consultas = require('../model/model')
module.exports = {
  userCrum: (req,res)=>{
    res.render('crum-registration',{pageTitle:'appbulance - registro'})
  },
  userPaciente: (req,res)=>{
    res.render('user-registration',{pageTitle:'appbulance - registro'})
  },
  addUserPaciente: consultas.addUserPaciente,
  addUserCrum: consultas.addUserCrum,
  tamp: (req,res)=>{

  }
}