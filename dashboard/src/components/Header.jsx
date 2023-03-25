import React, { useContext, useState } from "react"
import {
  Avatar,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { ReactComponent as MenuIcon } from "../icons/menu.svg"
import { FiUser, FiLogOut } from "react-icons/fi"
import TempImg from "../assets/img/profile.jpg"
import { SidebarContext } from "../components/Sidebar/Context/SidebarContext"

function Header() {
  const { toggleSidebar } = useContext(SidebarContext)

  return (
    <header className="bg-darkCard z-40 py-2 shadow-bottom">
      <div className="container flex items-center lg:justify-end justify-between h-full px-6 mx-auto text-gray-300">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-7 h-7" aria-hidden="true" />
        </button>
        <ul className="flex items-end flex-shrink-0 space-x-6">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={TempImg} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color={"gray.200"}>
                    Gankhuyg Enkhtugs
                  </Text>
                  <Text fontSize="xs" color={"gray.100"}>
                    Админ
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList bg={"rgb(36, 38, 45)"} borderColor={"rgb(36, 38, 45)"}>
              <MenuItem
                bg={"rgb(36, 38, 45)"}
                icon={<FiUser />}
                color="gray.200"
                command=""
              >
                <Text fontSize="sm" color={"gray.200"} command="">
                  Миний мэдээлэл
                </Text>
              </MenuItem>
              <MenuItem
                bg={"rgb(36, 38, 45)"}
                icon={<FiLogOut />}
                color="gray.200"
                command=""
              >
                <Text fontSize="sm" color={"gray.200"}>
                  Гарах
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </ul>
      </div>
    </header>
  )
}

export default Header
