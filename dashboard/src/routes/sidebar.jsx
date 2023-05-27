import { FiHome, FiTv, FiUsers, FiPieChart } from "react-icons/fi"

// I need dropdown sidebar

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
  {
    path: "/app/analytic",
    icon: <FiPieChart className="w-5 h-5" />,
    name: "Контент тойм",
  },
]

export default routes
