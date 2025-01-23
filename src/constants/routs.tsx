import CreateTourForm from "@/components/shared/creadtedtour";
import EditTourForm from "@/components/shared/updatetour";
import Archive from "@/pages/archive";
import Blogs from "@/pages/blogs";
import CreateBlog from "@/pages/blogs/create";
import EditBlog from "@/pages/blogs/edit";
import Tours from "@/pages/booking";
import Category from "@/pages/category";
import CreateCategoryForm from "@/pages/category/create";
import UpdateCategoryForm from "@/pages/category/edit";
import City from "@/pages/city";
import CityCreate from "@/pages/city/create";
import EditCity from "@/pages/city/edit";
import Products from "@/pages/products";
import { CreateTours } from "@/pages/products/create";
// import ToursCreate from "@/pages/products/create";
// import { ToursDetel } from "@/pages/products/detel";
import Setting from "@/pages/setting";
import Trash from "@/pages/trash";
import Showcase from "@/pages/showcase";
import Createshowcase from "@/pages/showcase/create";
import Editshowcase from "@/pages/showcase/edit";

export const protectedRoutes = [
  { path: "/showcase", element: <Showcase /> },
  { path: "/tours", element: <Products /> },
  { path: "/toursCard", element: <Tours /> },
  { path: "/toursCard/create", element: <CreateTourForm /> },
  // { path: "/tours/create", element: <CreateTourForm /> },
  { path: "/tours/create/:id", element: <CreateTours /> },
  { path: "/categ", element: <Category /> },
  { path: "/categ/create", element: <CreateCategoryForm /> },
  // { path: "/tours/detel/:id", element: <ToursDetel /> },
  { path: "/categ/edit/:id", element: <UpdateCategoryForm /> },
  { path: "/blog/create", element: <CreateBlog /> },
  { path: "/blog/edit/:id", element: <EditBlog /> },
  { path: "/showcase/create", element: <Createshowcase /> },
  { path: "/showcase/edit/:id", element: <Editshowcase /> },
  { path: "/blog", element: <Blogs /> },
  { path: "/trash", element: <Trash /> },
  { path: "/city", element: <City /> },
  { path: "/city/create", element: <CityCreate /> },
  { path: "/city/edit/:id", element: <EditCity /> },
  { path: "/archive", element: <Archive /> },
  { path: "/settings", element: <Setting /> },
];
