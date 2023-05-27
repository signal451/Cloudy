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
  Box,
  useDisclosure,
} from "@chakra-ui/react"
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import UserModal from "./modal/userModal"
import { useEffect, useRef } from "react"
import { fetchUserList } from "../reducers/user/userSlice"

function Users() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const Users = useSelector((state) => state.user.list)

  useEffect(() => {
    dispatch(fetchUserList())
    console.log(Users)
  }, [])

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
              onClick={onOpen}
            >
              Бүртгэх
            </Button>
            <UserModal isOpen={isOpen} onClose={onClose} />
          </FormControl>

          <TableContainer className="p-5">
            <Box overflowX={"scroll"}>
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
                        Системийн эрх
                      </span>
                    </Th>
                    <Th>
                      <span className="block text-grayColor font-mono text-sm text-center">
                        Утас
                      </span>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Users === undefined
                    ? null
                    : Users.map((item, index) => {
                        return (
                          <Tr
                            className="border-b-2 border-gray-500"
                            key={item._id}
                          >
                            <Td>
                              <div className="flex items-center ">
                                <Avatar
                                  className="mr-5"
                                  src={item.profile_image.location}
                                />
                                <div>
                                  <p className="font-semibold text-grayColor">
                                    {item.username}
                                  </p>
                                  <p className="text-sm text-grayColor">
                                    {item.role === "employee"
                                      ? "Ажилтан"
                                      : "Хэрэглэгч"}
                                  </p>
                                </div>
                              </div>
                            </Td>
                            <Td>
                              <span className="block text-grayColor text-center">
                                {item.email}
                              </span>
                            </Td>
                            <Td>
                              <span className="block text-grayColor text-center">
                                {item.role === "employee"
                                  ? "Ажилтан"
                                  : "Хэрэглэгч"}
                              </span>
                            </Td>
                            <Td>
                              <span className="block text-grayColor text-center">
                                {item.phone_number}
                              </span>
                            </Td>
                            <Td>
                              <div className="flex items-center space-x-4">
                                <FiEdit2 className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer" />
                                <FiTrash2 className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer " />
                              </div>
                            </Td>
                          </Tr>
                        )
                      })}
                </Tbody>
              </Table>
            </Box>
          </TableContainer>
        </div>
      </div>
    </>
  )
}

export default Users
