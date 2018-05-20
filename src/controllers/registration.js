var consultas = require('../model/model')
module.exports = {
  userCrum: (req,res)=>{
    res.render('crum-registration',{pageTitle:'Appbulance (CRUM) - Registro',flashMessage: req.flash('crum-registration')})
  },
  userPaciente: (req,res)=>{
    res.render('user-registration',{pageTitle:'Appbulance - Registro',flashMessage: req.flash('user-registration')})
  },
  userTamp: (req,res)=>{
    res.render('tamp-registration',{pageTitle:'Appbulance - Registro',flashMessage: req.flash('tamp-registration')})
  },
  addUserCrum: consultas.addUserCrum,
  addUserPaciente: consultas.addUserPaciente,
  addUserTamp: consultas.addUserTamp
}