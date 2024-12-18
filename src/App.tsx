import { Route, Routes } from "react-router-dom";
import Home from "./pages/main";
import Layout from "./layout";
import Tours from "./pages/booking";
import Category from "./pages/category";
import Blogs from "./pages/blogs";
import Trash from "./pages/trash";
import Archive from "./pages/archive";
import Setting from "./pages/setting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/login";
import { ProtectedRoute } from "./auth";
import CreateBlog from "./pages/blogs/create";
import EditBlog from "./pages/blogs/edit";

const protectedRoutes = [
  { path: "/tours", element: <Tours /> },
  { path: "/categ", element: <Category /> },
  { path: "/blog/create", element: <CreateBlog /> },
  { path: "/blog/edit/:id", element: <EditBlog /> },
  { path: "/blog", element: <Blogs /> },
  { path: "/trash", element: <Trash /> },
  { path: "/archive", element: <Archive /> },
  { path: "/settings", element: <Setting /> },
];

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                {protectedRoutes.map(({ path, element }) => (
                  <Route
                    key={path}
                    path={path}
                    element={<ProtectedRoute>{element}</ProtectedRoute>}
                  />
                ))}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
