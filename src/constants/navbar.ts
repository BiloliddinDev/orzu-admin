import { Home, Search, Settings } from "lucide-react";
import { BsPencilSquare } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { MdTour } from "react-icons/md";

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
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
