import React from "react"
// sidebar Internal rout
import routes from "../../routes/sidebar"
import { NavLink, Route } from "react-router-dom"

function SidebarContent() {
  return (
    <div className="text-gray-400">
      <ul className="mt-20">
        {routes.map((route) => (
          <li className="relative px-6 py-4" key={route.name}>
            <NavLink
              to={route.path}
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
            >
              {route.icon}
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarContent
