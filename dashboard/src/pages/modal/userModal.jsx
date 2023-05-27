import {
  Button,
  FormControl,
  Input,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
  useToast,
  Select,
} from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserDetails } from "../../reducers/user/userSlice"

const UserModal = (props) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const isLoading = useSelector((state) => state.user.loading)

  const [fieldData, setFieldData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    profile_image: null,
    role: "",
  })

  const handleField = (e) => {
    setFieldData({
      ...fieldData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImage = (e) => {
    setFieldData({
      ...fieldData,
      profile_image: e.target.files[0],
    })
  }

  const submitHandler = () => {
    const form = new FormData()
    form.append("username", fieldData.username)
    form.append("email", fieldData.email)
    form.append("phone_number", fieldData.phone)
    form.append("password", fieldData.password)
    form.append("role", fieldData.role)
    form.append("profile_image", fieldData.profile_image)

    dispatch(updateUserDetails(form))

    if (isLoading != true) {
      toast({
        title: "Хэрэглэгч амжилттай бүртгэгдсэн ",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }

    setFieldData({
      image: null,
    })

    return props.onClose()
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      motionPreset="slideInBottom"
      size={"xl"}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className="font-mono" backgroundColor={"rgb(26, 28, 35)"}>
        <ModalHeader pt={8} color={"whiteAlpha.900"}>
          Хэрэглэгч бүртгэх
        </ModalHeader>
        <ModalCloseButton color={"whiteAlpha.900"} />
        <ModalBody pb={8}>
          <FormControl>
            <FormLabel color={"whiteAlpha.700"}> Хэрэглэгчийн нэр</FormLabel>
            <Input
              boxShadow={"none"}
              borderStyle={"none"}
              background={"rgb(36, 38, 45)"}
              focusBorderColor={"transparent"}
              color={"whiteAlpha.700"}
              name="username"
              type="text"
              onChange={handleField}
            />
          </FormControl>
          <FormControl marginTop={5}>
            <FormLabel color={"whiteAlpha.700"}> Имейл</FormLabel>
            <Input
              boxShadow={"none"}
              borderStyle={"none"}
              background={"rgb(36, 38, 45)"}
              focusBorderColor={"transparent"}
              color={"whiteAlpha.700"}
              name="email"
              type="text"
              onChange={handleField}
            />
          </FormControl>
          <FormControl marginTop={5}>
            <FormLabel color={"whiteAlpha.700"}> Утас </FormLabel>
            <Input
              boxShadow={"none"}
              borderStyle={"none"}
              background={"rgb(36, 38, 45)"}
              focusBorderColor={"transparent"}
              color={"whiteAlpha.700"}
              name="phone"
              type="text"
              onChange={handleField}
            />
          </FormControl>
          <FormControl marginTop={5}>
            <FormLabel color={"whiteAlpha.700"}> Нууц үг</FormLabel>
            <Input
              boxShadow={"none"}
              borderStyle={"none"}
              background={"rgb(36, 38, 45)"}
              focusBorderColor={"transparent"}
              color={"whiteAlpha.700"}
              name="password"
              type="password"
              onChange={handleField}
            />
          </FormControl>
          <div className="flex">
            <div className="w-full rounded-lg bg-darkCard">
              <div className="mt-5">
                <FormLabel color={"whiteAlpha.700"} marginBottom={4}>
                  {" "}
                  Зураг
                </FormLabel>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-25 border-4 border-purple-200 border-dashed hover:border-purple-400">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={"currentColor"}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-5 text-sm text-gray-400 group-hover:text-gray-600">
                        {fieldData.profile_image == null
                          ? "Upload"
                          : fieldData.profile_image.name}
                      </p>
                    </div>
                    <input
                      type="file"
                      name="image"
                      className="opacity-0"
                      onChange={handleImage}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <FormControl marginTop={5}>
            <FormLabel color={"whiteAlpha.700"}> Эрх</FormLabel>
            <Select
              placeholder={"Системийн эрх олгох"}
              color={"whiteAlpha.700"}
              onChange={handleField}
              name="role"
            >
              <option value={"employee"}>Ажилтан</option>
              <option value={"user"}>Хэрэглэгч</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            marginRight={5}
            className="hover:bg-purple-800"
            color={"whiteAlpha.900"}
            _hover={{}}
            _active={{}}
            onClick={submitHandler}
            backgroundColor={"purple.600"}
          >
            Save
          </Button>
          <Button
            className="hover:border-gray-500"
            variant={"outline"}
            color={"whiteAlpha.900"}
            onClick={props.onClose}
            _hover={{}}
            _active={{}}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UserModal
