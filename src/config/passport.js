import passport from 'passport'
import LocalStrategy from 'passport-local/lib/strategy'
var model = require('./../model/model')

passport.serializeUser((user, done) => {
  return done(null, user)
})
passport.deserializeUser((user, done) => {
  return done(null, user)
})

// Autenticación local para los usuarios
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'contra',
  passReqToCallback: true
},
model.authuser
))
export default passport
