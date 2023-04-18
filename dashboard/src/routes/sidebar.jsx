import { FiHome, FiTv, FiUsers } from "react-icons/fi"

const routes = [
  {
    path: "/app/dashboard",
    icon: <FiHome className="w-5 h-5" />,
    name: "Нүүр",
  },
  {
    path: "/app/users",
    icon: <FiUsers className="w-5 h-5" />,
    name: "Хэрэглэгч",
  },
  {
    path: "/app/content",
    icon: <FiTv className="w-5 h-5" />,
    name: "Контент",
  },
]

export default routes
