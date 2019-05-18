import { Router } from 'express'
import bd from './../../config/dbConnection'
var router = Router()
// Main middleware for /api/pt/
router.route('/')
  .post(async (req, res) => {
    try {
      var { ubicacion_pt_x, ubicacion_pt_y, direccion_pt } = req.body
      var { id_p } = req.user
      if (typeof ubicacion_pt === 'undefined') { ubicacion_pt = '' }
      if (typeof direccion_pt === 'undefined') { direccion_pt = '' }
      const { rows } = await bd.query('SELECT * FROM post_pt(point($1,$2),$3,$4)', [ubicacion_pt_x, ubicacion_pt_y, direccion_pt, id_p])
      res.json(rows)
    } catch (err) {
      console.log(err)
      res.json({ state: 'error', content: err })
    }
  })

export default router
