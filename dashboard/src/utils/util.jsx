const dateFormat = (args) => {
  const date = new Date(args)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`
  return formattedDate
}

export { dateFormat }
