import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import { SidebarProvider } from "./components/Sidebar/Context/SidebarContext"
import App from "./App"
import "./assets/css/tailwind.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <Suspense fallback={<div> Loading ... </div>}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Suspense>
  </SidebarProvider>
)
