export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL
}

export const requestOptions = (method, body) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  })
  return Object.assign({}, { headers }, { method, body })
}
