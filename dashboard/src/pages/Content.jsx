import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Button,
  Tbody,
  Td,
  FormControl,
  Input,
  useDisclosure,
  Box,
} from "@chakra-ui/react"
import PageTitle from "../components/Typography/Pagetitle"
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"
import ContentModal from "./modal/ContentModal"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchContentDetails } from "../reducers/content/contentSlice"
import moment from "moment"

function Content() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const Contents = useSelector((state) => state.content.list)

  useEffect(() => {
    dispatch(fetchContentDetails())
  }, [])

  const dateFormat = (args) => {
    const date = new Date(args)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`
    return formattedDate
  }

  return (
    <>
      <PageTitle> Контент жагсаалт </PageTitle>

      <div className="mt-5 rounded-md bg-darkCard">
        <div className="w-full p-5">
          <FormControl className="flex justify-between pl-5 pr-5">
            <Input
              width={"w-2/5"}
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
            <ContentModal isOpen={isOpen} onClose={onClose} />
          </FormControl>
        </div>

        <TableContainer className="pl-10 pr-10 pb-10">
          <Box overflowX={"scroll"}>
            <Table variant={"simple"}>
              <Thead>
                <Tr className="border-b-2  border-gray-500">
                  <Th>
                    <span className="block text-grayColor font-mono text-sm text-center">
                      Контент нэр
                    </span>
                  </Th>
                  <Th>
                    <span className="block text-grayColor font-mono text-sm text-center">
                      Нийт анги
                    </span>
                  </Th>
                  {/* <Th>
                  <span className="block text-grayColor font-mono text-sm text-center">
                    Тайлбар
                  </span>
                </Th> */}

                  <Th>
                    <span className="block text-grayColor font-mono text-sm text-center">
                      Огноо
                    </span>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {Contents.map((item, index) => {
                  return (
                    <Tr className="border-b-2 border-gray-500" key={item._id}>
                      <Td>
                        <span className="block text-grayColor text-center">
                          {item.title}
                        </span>
                      </Td>
                      <Td>
                        <span className="block text-grayColor text-center">
                          {item.totalEpisode != undefined
                            ? item.totalEpisode
                            : 0}
                        </span>
                      </Td>

                      <Td>
                        <span className="block text-grayColor text-center">
                          {dateFormat(item.created_date)}
                        </span>
                      </Td>
                      <Td>
                        <div className="flex items-center space-x-4">
                          <FiEdit2 className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer" />
                          <FiTrash2 className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer" />
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
    </>
  )
}

export default Content
