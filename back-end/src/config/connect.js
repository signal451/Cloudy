const { Pool } = require("pg")

const config = {
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DATABASE,
  port: process.env.POSTGRE_PORT,
}

const pool = new Pool(config)

pool.connect((err) => {
  if (err) {
    console.error("connection error", err.stack)
  } else {
    console.log(
      `Application is connected to ${process.env.POSTGRE_DATABASE} database`
    )
  }
})

module.exports = { pool }
