var consultas = require('../model/model')
module.exports = {
  crum: (req,res)=>{

  },
  userPaciente: (req,res)=>{
    res.render('user-registration',{pageTitle:'appbulance - registro'})
  },
  addUserPaciente: consultas.addUserPaciente,
  tamp: (req,res)=>{

  }
}