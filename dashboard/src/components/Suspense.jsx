import React from "react"
import { Spinner } from "@chakra-ui/react"
// I will add loading animation to it..

function Suspense() {
  return (
    <div className="w-full h-screen bg-darkBackground">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner size="xl" color="gray.100" />
      </div>
    </div>
  )
}

export default Suspense
