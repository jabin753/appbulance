const test = require('ava')
const DatabaseModel = require('./../src/database/db')
let DB = null
const config = {
    database: process.env.DB_NAME || 'appbulance_sequelize',
    username: process.env.DB_USER || 'appbulance',
    password: process.env.DB_PASS || '::appbulance2018::',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }

test('DB_CONNECTION',t =>{
    DB = DatabaseModel(config).then(()=>{
        t.true(1,'It should be done')
    }
    ).catch(err =>{
        console.log(err)
    })
})