"use strict";
const setupDatabase = require("./../src/database/db");
setupDatabase({
  database: process.env.DB_NAME || "appbulance",
  username: process.env.DB_USER || "appbulance",
  password: process.env.DB_PASS || "::appbulance2018::",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres"
})
  .then(db => {
    const { User } = db;
    console.log(User.findAll({where:{emailUsr:'foo'}}))
  })
  .catch(err => console.error(err));
