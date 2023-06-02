const { prisma } = require("../config/client")

const getAllSubscriptionPlans = async (req, res) => {
  try {
    const plan = await prisma.subscription_plan.findMany({
      orderBy: {
        plan_price: "asc",
      },
    })
    return res.send(plan)
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Error executing query" })
  }
}

module.exports = {
  getAllSubscriptionPlans,
}
