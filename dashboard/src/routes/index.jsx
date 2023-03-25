import { lazy } from "react"

const Dashboard = lazy(() => import("../pages/Dashboard"))

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
]

export default routes
