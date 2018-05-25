var consultas = require('../model/model')
module.exports = {
  crum: (req,res)=>{
    res.render('crum-login',{pageTitle:'Appbulance (CRUM) - Login',flashMessage: req.flash('crum-login')})
  },
  user: (req,res)=>{
    res.render('user-login',{pageTitle:'Appbulance - Login',flashMessage: req.flash('user-login')})
  },
  tamp: (req,res)=>{
    res.render('tamp-login',{pageTitle:'Appbulance - Login',flashMessage: req.flash('tamp-login')})
  },
  validate: (req,res,next)=>{
    if (req.isAuthenticated()){
      switch(req.user.tipo_usr){
        case 1: res.redirect('/crum/inicio') 
        break
        case 2: res.redirect('/usuario/inicio')
        break
        case 3: res.redirect('/tamp/inicio')
      }
    } else next()
  }
}