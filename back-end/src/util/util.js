const moment = require("moment")

const getCurrentDate = () => {
  const currentDate = moment().toISOString()
  return currentDate
}

const calculateMonthDifferences = (date) => {
  const currentDate = moment().toISOString()
  const endDate = moment(date).toISOString()
  return moment(endDate).diff(currentDate, "d")
}

const addMonth = (date, type, date2) => {
  if (type === "current") {
    const currentDate = moment().toISOString()
    return moment(currentDate).add(date, "M").toISOString()
  }
  const test = moment(date).add(date2, "M").toISOString()
  return test
}

const addDays = (date) => {
  const currentDate = moment().toISOString()
  return moment(currentDate).add(date, "days").toISOString()
}

module.exports = {
  getCurrentDate,
  calculateMonthDifferences,
  addMonth,
  addDays,
}
