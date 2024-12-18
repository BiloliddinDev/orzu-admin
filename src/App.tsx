import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/login";
import { ProtectedRoute } from "./auth";
import { protectedRoutes } from "./constants/routs";

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
