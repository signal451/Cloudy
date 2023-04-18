import React from "react"
import { FiAlertCircle } from "react-icons/fi"

function Page404() {
  return (
    <div className="flex flex-col items-center">
      <FiAlertCircle
        className="w-12 h-12 mt-8 text-purple-200"
        aria-hidden="true"
      />
      <h1 className="text-7xl font-semibold text-gray-200">404</h1>
      <p className="text-gray-300">Хуудас олдсонгүй </p>
    </div>
  )
}

export default Page404
