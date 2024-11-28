import { Home, Search, Settings } from "lucide-react";
import { BsPencilSquare } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { MdTour } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

export const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: BsPencilSquare,
  },
  {
    title: "Category",
    url: "/categ",
    icon: BiCategoryAlt,
  },
  {
    title: "Tours",
    url: "/tours",
    icon: MdTour,
  },
  {
    title: "Trash",
    url: "/trash",
    icon: IoTrashOutline,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
