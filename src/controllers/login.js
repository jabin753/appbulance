var consultas = require('../model/model')
var cookie = require('cookie')
module.exports = {
  user: (req, res) => {
    res.render('user-login', { pageTitle: 'Appbulance - Login', flashMessage: req.flash('user-login') })
  },
  validate: (req, res, next) => {
    if (req.isAuthenticated()) {
      switch (req.user.tipo_usr) {
        case 1: res.redirect('/crum/inicio')
          break
        case 2: res.redirect('/usuario/inicio')
          break
        case 3: res.redirect('/tamp/inicio')
      }
    } else next()
  }
}