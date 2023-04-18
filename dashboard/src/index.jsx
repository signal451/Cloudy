import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import ThemedSuspense from "./components/Suspense"
import { ChakraProvider } from "@chakra-ui/react"
import { SidebarProvider } from "./components/Sidebar/Context/SidebarContext"
import App from "./App"
import { Provider } from "react-redux"
import Store from "./store/root"
import "./assets/css/tailwind.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Suspense>
    </SidebarProvider>
  </Provider>
)
