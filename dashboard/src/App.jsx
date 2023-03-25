import { lazy } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Content from "./pages/Content"

const Login = lazy(() => import("./pages/Login"))
const Layout = lazy(() => import("./container/Layout"))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Navigate to="/app/dashboard" />} />
        <Route path="/app" element={<Layout />}>
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/content" element={<Content />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login " />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
