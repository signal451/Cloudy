import React, { useState, ReactNode } from "react"
import { Route, redirect, useLocation, Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/index"
import Header from "../components/Header"

function Layout() {
  return (
    <div className="flex h-screen bg-darkBackground font-mono">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
