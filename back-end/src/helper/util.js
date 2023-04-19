const getCurrentDate = () => {
  const date = new Date()
  const formattedDate = date.toLocaleDateString()
  return formattedDate
}

export { getCurrentDate }
