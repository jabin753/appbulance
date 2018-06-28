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
            console.log('=>',num_placa_a,num_economico_a,estado_a,posicion_actual_a)
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
}