import { lazy, useState } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const Login = lazy(() => import("./pages/Login"))
const Layout = lazy(() => import("./container/Layout"))

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
