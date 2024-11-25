import { Route, Routes } from "react-router-dom";
import Home from "./pages/main";
import Layout from "./layout";
import Tours from "./pages/booking";
<<<<<<< HEAD
import Category from "./pages/category";
=======
import Blogs from "./pages/blogs";
>>>>>>> 95e93b3e07aef95dfbd13fcc75108221bdecf14f

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
<<<<<<< HEAD
        <Route path="/categ" element={<Category />} />
=======
        <Route path="/blog" element={<Blogs />} />
>>>>>>> 95e93b3e07aef95dfbd13fcc75108221bdecf14f
      </Routes>
    </Layout>
  );
}

export default App;
