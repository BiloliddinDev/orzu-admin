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
import Setting from "@/pages/setting";
import Trash from "@/pages/trash";

export const protectedRoutes = [
  { path: "/tours", element: <Tours /> },
  { path: "/categ", element: <Category /> },
  { path: "/categ/create", element: <CreateCategoryForm /> },
  { path: "/categ/edit/:id", element: <UpdateCategoryForm /> },
  { path: "/blog/create", element: <CreateBlog /> },
  { path: "/blog/edit/:id", element: <EditBlog /> },
  { path: "/blog", element: <Blogs /> },
  { path: "/trash", element: <Trash /> },
  { path: "/city", element: <City /> },
  { path: "/city/create", element: <CityCreate /> },
  { path: "/city/edit/:id", element: <EditCity /> },
  { path: "/archive", element: <Archive /> },
  { path: "/settings", element: <Setting /> },
];
