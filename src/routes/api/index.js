import admin from './admin'
import peticiones from './peticiones'
import { Router } from 'express'
var api = Router()
api.use((req, res, next) => {
  if (req.user === undefined) {
    res.status(403).json({
      status: 'Petición denegada, debes de contar con una sesión abierta'
    })
  } else next()
})
api.use('/admin', admin)
api.use('/pt', peticiones)
export default api
