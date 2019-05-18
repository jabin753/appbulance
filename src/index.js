import app from './config/app'
import 'dotenv/config'
import websocket from './config/socketConnections'

var server = app.listen(process.env.PORT, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('Servidor iniciado en %s:%s', host, port)
})
websocket(server)
