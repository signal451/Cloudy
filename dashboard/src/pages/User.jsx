import PageTitle from "../components/Typography/Pagetitle"

import {
  FormControl,
  Input,
  Button,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
} from "@chakra-ui/react"
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"
import TempImg from "../assets/img/profile.jpg"
import { NavLink } from "react-router-dom"

function Users() {
  return (
    <>
      <PageTitle> Хэрэглэгчийн жагсаалт </PageTitle>
      <div className="mt-5 rounded-md bg-darkCard">
        <div className="w-full p-5">
          <FormControl className="flex justify-between pl-5 pr-5">
            <Input
              width={"w-full"}
              boxShadow={"none"}
              borderStyle={"none"}
              background={"rgb(36, 38, 45)"}
              focusBorderColor={"transparent"}
              placeholder={"Хайлт"}
              color={"whiteAlpha.700"}
              type="email"
            />
            <Button
              leftIcon={<FiPlus />}
              width={"10%"}
              marginLeft={5}
              className="text-gray-100 hover:bg-purple-800 active:bg-purple-600"
              _hover={{}}
              backgroundColor={"purple.600"}
              _active={{}}
            >
              Бүртгэх
            </Button>
          </FormControl>

          <TableContainer className="p-5">
            <Table variant={"simple"}>
              <Thead>
                <Tr className="border-b-2  border-gray-500">
                  <Th>
                    <span className="block text-grayColor font-mono text-sm">
                      Хэрэглэгч
                    </span>
                  </Th>
                  <Th>
                    <span className="block text-grayColor font-mono text-sm text-center">
                      Имейл
                    </span>
                  </Th>
                  <Th>
                    <span className="block text-grayColor font-mono text-sm text-center">
                      Эрх
                    </span>
                  </Th>
                  <Th>
                    <span className="block text-grayColor font-mono text-sm text-center">
                      Дуусах огноо
                    </span>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr className="border-b-2 border-gray-500">
                  <Td>
                    <div className="flex items-center ">
                      <Avatar className="mr-5" src={TempImg} />
                      <div>
                        <p className="font-semibold text-grayColor">
                          Gankhuyg Enkhtugs
                        </p>
                        <p className="text-sm text-grayColor">Админ</p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="block text-grayColor text-center">
                      enkhtugs@gmail.com
                    </span>
                  </Td>
                  <Td>
                    <span className="block text-grayColor text-center">
                      Энгийн
                    </span>
                  </Td>
                  <Td>
                    <span className="block text-grayColor text-center">
                      2023-05-25
                    </span>
                  </Td>
                  <Td>
                    <div className="flex items-center space-x-4">
                      <FiEdit2 className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer" />
                      <FiTrash2 className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer " />
                    </div>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}

export default Users
