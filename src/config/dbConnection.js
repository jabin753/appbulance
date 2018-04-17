const { Pool, Client } = require('pg')

const client = new Client({
    user: 'appbulance',
    host: 'localhost',
    database: 'appbulance',
    password: 'appbulance2018',
    port: 5432
})
client.connect()
module.exports = client
