const express = require("express")

const getShowTotalSeason = async (req, res) => {
  pool
    .query("select * from get_show_total_season($1)", [req.params.showId])
    .then((response) => {
      const data = response.rows
      return res.send(data)
    })
    .catch((err) => {
      console.error(err)
      return res.status(400).send("Error executing query")
    })
}

module.exports = {
  getShowTotalSeason,
}
