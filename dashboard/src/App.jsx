import { lazy } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

const Login = lazy(() => import("./pages/Login"))
const Layout = lazy(() => import("./container/Layout"))
const Content = lazy(() => import("./pages/Content"))
const ContentRegister = lazy(() => import("./pages/ContentRegister"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Users = lazy(() => import("./pages/User"))
const Page404 = lazy(() => import("./pages/Page404"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/app" element={<Navigate to="/app/dashboard" />} />
        <Route exact path="/app" element={<Layout />}>
          <Route exact path="/app/dashboard" element={<Dashboard />} />
          <Route exact path="/app/content" element={<Content />} />
          <Route exact path="/app/users" element={<Users />} />
          <Route path="/app/*" element={<Page404 />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Navigate to="/login " />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
