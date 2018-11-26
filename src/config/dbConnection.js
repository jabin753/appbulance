const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING
    || 'postgresql://appbulance:::appbulance2018::@localhost:5432/appbulance'
})

module.exports = {

  query: async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log(`Consulta ${text} ejecutada en ${duration} ms`)
    return res
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query.bind(client)

      // monkey patch the query method to keep track of the last query executed
      client.query = () => {
        client.lastQuery = arguments
        client.query.apply(client, arguments)
      }

      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000)

      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)

        // clear our timeout
        clearTimeout(timeout)

        // set the query method back to its old un-monkey-patched version
        client.query = query
      }
      callback(err, client, done)
    })
  },
  prueba: () => {
    pool.query('SELECT NOW()', (err, result) => {
      if (!err) {
        if (result.rowCount > 0) console.log('Conexión satisfactoria: ', result.rows[0]['now'])
      } else { console.error('Error en la conexión con la base de datos:, ', process.env.PG_CONNECTION_STRING, err) }
    })
  }
}
