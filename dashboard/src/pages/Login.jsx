import React, { useState } from "react"
import { Input, FormControl, FormLabel, Button } from "@chakra-ui/react"

import punk from "../assets/img/login.png"

function App() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-darkBackground font-sans">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl bg-darkCard">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={punk}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-200 text-center">
                Нэвтрэх
              </h1>
              <form>
                <FormControl>
                  <FormLabel color={"whiteAlpha.700"}>Email</FormLabel>
                  <Input
                    boxShadow={"none"}
                    borderStyle={"none"}
                    background={"rgb(36, 38, 45)"}
                    focusBorderColor={"transparent"}
                    color={"whiteAlpha.700"}
                    type="email"
                  />
                  <FormLabel color={"whiteAlpha.700"} paddingTop={"1.5rem"}>
                    Password
                  </FormLabel>
                  <Input
                    boxShadow={"none"}
                    borderStyle={"none"}
                    background={"rgb(36, 38, 45)"}
                    focusBorderColor={"transparent"}
                    color={"whiteAlpha.700"}
                    type="password"
                  />

                  <Button width={"100%"} marginTop={10}>
                    Нэвтрэх
                  </Button>
                </FormControl>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
