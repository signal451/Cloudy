const { calculateMonthDifferences, addMonth, addDays } = require("../util/util")

const getAllSubscription = async (req, res) => {
  console.log("user subscription list")
}

const postUserSubscription = async (req, res) => {
  const { client_id, plan_id, plan_detail } = req.body
  try {
    const lastSubscription = await pool.query(
      "select * from get_user_subscription($1)",
      [client_id]
    )

    if (lastSubscription.rowCount === 0) {
      const end_date = addMonth(plan_detail[0], "current")

      await await pool.query("call post_user_subscription($1, $2, $3)", [
        client_id,
        plan_id,
        end_date,
      ])

      const lastSubscription = await pool.query(
        "select * from get_user_subscription($1)",
        [client_id]
      )

      return res.json({
        id: lastSubscription.rows[0].id,
        isSubscriptionActive: true,
        totalDays: plan_detail[0] * 30,
      })
    }

    const leftOverDate = addDays(
      calculateMonthDifferences(lastSubscription.rows[0].end_date)
    )

    const updatedDate = addMonth(leftOverDate, "new", plan_detail[0])
    await pool
      .query("call post_user_subscription($1, $2, $3)", [
        client_id,
        plan_id,
        updatedDate,
      ])
      .then((response) => {
        return res.json({
          id: lastSubscription.rows[0].id + 1,
          isSubscriptionActive: true,
          totalDays: calculateMonthDifferences(updatedDate),
        })
      })
      .catch((err) => {
        console.error(err)
        return res.status(400).send("Error executing query")
      })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

const getUserSubscription = async (req, res) => {
  try {
    const lastSubscription = await pool.query(
      "select * from get_user_subscription($1)",
      [req.params.userId]
    )
    if (lastSubscription.rowCount === 0) {
      return res.json({
        isSubscriptionActive: false,
        totalDays: 0,
      })
    }

    const total = calculateMonthDifferences(lastSubscription.rows[0].end_date)

    if (total > 0) {
      return res.send({
        isSubscriptionActive: true,
        totalDays: total,
      })
    } else {
      return res.send({
        isSubscriptionActive: false,
        totalDays: 0,
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

module.exports = {
  getAllSubscription,
  getUserSubscription,
  postUserSubscription,
}
