import { FiHome, FiTv } from "react-icons/fi"

const routes = [
  {
    path: "/app/dashboard",
    icon: <FiHome className="w-5 h-5" />,
    name: "Нүүр",
  },
  {
    path: "/app/content",
    icon: <FiTv className="w-5 h-5" />,
    name: "Видео",
  },
]

export default routes
