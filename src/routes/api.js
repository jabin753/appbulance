const bd = require('../config/dbConnection');
module.exports = app => {

    //AMBULANCIAS
    app.get('/api/a',async (req, res) => {
        try{
            const { rows } =  await bd.query('SELECT * FROM get_a()')
            res.json(rows)
        }
        catch(err){
			res.json({state: "error", content: err})
		}
        
    })
    app.get('/api/a/:id_a',async (req, res) => {
        try{
            const { id_a } = req.params
            const { rows } = await bd.query('SELECT * FROM get_a($1)',[id_a])
            res.json(rows)
        }
        catch(err){
			res.json({state: "error", content: err})
		}
    })
    app.post('/api/a',async (req, res) => {
        try{
            var {num_placa_a, num_economico_a, estado_a, posicion_actual_a} = req.body
            if(typeof num_placa_a === 'undefined') {num_placa_a = '';}
            if(typeof num_economico_a === 'undefined') {num_economico_a = '';}
            if(typeof estado_a === 'undefined'){estado_a = '';}
            if(typeof posicion_actual_a === 'undefined') {posicion_actual_a = '';}
            await bd.query('SELECT * FROM post_a($1,$2,$3,point($4,$5))', [num_placa_a, num_economico_a, estado_a,posicion_actual_a.x,posicion_actual_a.y])
            res.json({state: "datos guardados"})
        }
        catch(err){
			res.json({state: "error", content: err})
		}
    })
    app.put('/api/a/:id_a',async (req, res) => {
        try{
            const { id_a } = req.params
            var {num_placa_a, num_economico_a, estado_a, posicion_actual_a} = req.body
            if(typeof num_placa_a === 'undefined') {num_placa_a = '';}
            if(typeof num_economico_a === 'undefined') {num_economico_a = '';}
            if(typeof estado_a === 'undefined'){estado_a = '';}
            if(typeof posicion_actual_a === 'undefined') {posicion_actual_a = '';}
            await bd.query('SELECT * FROM put_a($1,$2,$3,$4,point($5,$6))', [id_a,num_placa_a, num_economico_a, estado_a, posicion_actual_a.x, posicion_actual_a.y])
            res.json({state: "datos actualizados"})
        }
        catch(err){
            console.log(err);
			res.json({state: "error", content: err})
		}
    })
    app.delete('/api/a/:id_a',async (req, res) => {
        try{
            const { id_a } = req.params
            await bd.query('SELECT * FROM delete_a($1)',[id_a])
            res.json({state: "datos eliminados"})
        }
        catch(err){
			res.json({state: "error", content: err})
		}
    })
    
    //PETICIONES
    app.get('/api/pt',async (req, res) => {
        try{
            const { rows } =  await bd.query('SELECT * FROM get_pt()')
            res.json(rows)
        }
        catch(err){
			res.json({state: "error", content: err})
		}
        
    })
    app.get('/api/pt/:id_pt',async (req, res) => {
        try{
            const { id_pt } = req.params
            const { rows } = await bd.query('SELECT * FROM get_pt($1)',[id_pt])
            res.json(rows)
        }
        catch(err){
			res.json({state: "error", content: err})
		}
    })
    app.post('/api/pt',async (req, res) => {
        try{
            var {ubicacion_pt_x,ubicacion_pt_y, direccion_pt, id_p, id_cm} = req.body
            if(typeof ubicacion_pt === 'undefined') {ubicacion_pt = '';}
            if(typeof direccion_pt === 'undefined') {direccion_pt = '';}
            if(typeof id_p === 'undefined'){id_p = '';}
            if(typeof id_cm === 'undefined') {id_cm = '';}
            const { rows } = await bd.query('SELECT * FROM post_pt(point($1,$2),$3,$4,$5)', [ubicacion_pt_x, ubicacion_pt_y,direccion_pt,id_p,id_cm])
            res.json(rows)
        }
        catch(err){
			res.json({state: "error", content: err})
		}
    })
    app.put('/api/pt/:id_pt',async (req, res) => {
        try{
            const { id_pt } = req.params
            var {ubicacion_pt, direccion_pt, id_p, id_cm} = req.body
            if(typeof ubicacion_pt === 'undefined') {ubicacion_pt = '';}
            if(typeof direccion_pt === 'undefined') {direccion_pt = '';}
            if(typeof id_p === 'undefined'){id_p = '';}
            if(typeof id_cm === 'undefined') {id_cm = '';}
            await bd.query('SELECT put_pt($1,point($2,$3),$4,$5,$6)', [id_pt,ubicacion_pt.x,ubicacion_pt.y,direccion_pt,id_p,id_cm])
            res.json({state: "datos actualizados"})
        }
        catch(err){
            console.log(err);
			res.json({state: "error", content: err})
		}
    })
    app.delete('/api/pt/:id_pt',async (req, res) => {
        try{
            const { id_pt } = req.params
            await bd.query('SELECT delete_pt($1)',[id_pt])
            res.json({state: "datos eliminados"})
        }
        catch(err){
			res.json({state: "error", content: err})
		}
    })   
}