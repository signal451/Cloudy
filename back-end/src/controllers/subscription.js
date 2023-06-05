const { prisma } = require("../config/client")
const {
  calculateMonthDifferences,
  addMonth,
  addDays,
  getCurrentDate,
} = require("../util/util")

const checkSubscriptionIsExist = async (id) => {
  const subscription = await prisma.subscriptions.findFirst({
    select: {
      id: true,
      client_id: true,
      start_date: true,
      end_date: true,
      created_at: true,
    },
    where: {
      client_id: id,
    },
    orderBy: {
      created_at: "desc",
    },
  })
  return subscription
}

const postUserSubscription = async (req, res) => {
  const { client_id, plan_id, payment } = req.body
  try {
    const subscription = await checkSubscriptionIsExist(parseInt(client_id))
    const plan = await prisma.subscription_plan.findFirst({
      where: {
        id: plan_id,
      },
    })

    if (plan == null) {
      return res.status(404).json({
        message: "subscription plan is not found",
      })
    }

    if (subscription == null) {
      const end_date = addMonth(plan.plan_details[0], "current")
      await prisma.subscriptions
        .create({
          data: {
            client_id: client_id,
            start_date: getCurrentDate(),
            end_date: end_date,
            plan_id: plan_id,
            created_at: getCurrentDate(),
          },
        })
        .then((response) => {
          return res.json({
            id: response.id,
            isSubscriptionActive: true,
          })
        })
        .catch((err) => {
          console.log("subscription avahad aldaa garlaa")
          console.error(err)
        })
    }
    // something is wrong there cuz full one day date is not correctly calculating
    const leftOverDate = addDays(
      calculateMonthDifferences(subscription.end_date)
    )

    const updatedDate = addMonth(leftOverDate, "new", plan.plan_details[0])

    await prisma.subscriptions
      .create({
        data: {
          client_id: client_id,
          start_date: getCurrentDate(),
          end_date: updatedDate,
          plan_id: plan_id,
          created_at: getCurrentDate(),
        },
      })
      .then((response) => {
        return res.json({
          id: response.id,
          isSubscriptionActive: true,
          totalDays: calculateMonthDifferences(updatedDate),
        })
      })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "Something went wrong in server" })
  }
}

const getUserSubscription = async (req, res) => {
  try {
    const { userId } = req.params
    console.log(userId)
    const subscription = await checkSubscriptionIsExist(parseInt(userId))

    if (subscription == null) {
      return res.json({
        isSubscriptionActive: false,
        totalDays: 0,
      })
    }

    const total = calculateMonthDifferences(subscription.end_date)

    if (total > 0) {
      return res.send({
        id: subscription.id,
        isSubscriptionActive: true,
        totalDays: total,
      })
    } else {
      // this means subscription is ended
      return res.send({
        id: subscription.id,
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
  getUserSubscription,
  postUserSubscription,
}
