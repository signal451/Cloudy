const { pool } = require("../config/connect")

const getAllSubscriptionPlans = async (req, res) => {
  try {
    const subscription_plan = await pool.query(
      "select * from get_subscription_plan()"
    )
    return res.send(subscription_plan.rows)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Error executing query" })
  }
}

module.exports = {
  getAllSubscriptionPlans,
}
