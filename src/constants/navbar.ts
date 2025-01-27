import { Home, Search, Settings } from "lucide-react";
import { BsPencilSquare } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { MdTour } from "react-icons/md";
import { FaBoxArchive, FaCity } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { SiShowtime } from "react-icons/si";

export const items = [
  { title: "MainPage", url: "/showcase", icon: SiShowtime },
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
    title: "Archive",
    url: "/archive",
    icon: FaBoxArchive,
  },
  {
    title: "Cauntry",
    url: "/city",
    icon: FaCity,
  },
  {
    title: "ToursCard",
    url: "/toursCard",
    icon: MdTour,
  },
  {
    title: "Trash",
    url: "/trash",
    icon: FaTrash,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
