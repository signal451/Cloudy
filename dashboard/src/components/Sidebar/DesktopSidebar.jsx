import React from "react"
import SidebarContent from "./SidebarContent"

function DesktopSideBar(props) {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-60 overflow-y-auto bg-darkCard lg:block">
      <SidebarContent />
    </aside>
  )
}

export default DesktopSideBar
