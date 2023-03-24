import React, { useState, ReactNode } from "react"
import { Route, redirect, useLocation } from "react-router-dom"
import Header from "../components/Header"

function Layout() {
  return (
    <div className="font-mono">
      <Header />
    </div>
  )
}

export default Layout
