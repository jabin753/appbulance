const { Pool, Client } = require('pg')

const client = new Client({
    user: 'usr_BD',
    host: 'localhost',
    database: 'MI_BD',
    password: 'jabinjabin',
    port: 5433
})
client.connect()
module.exports = client
