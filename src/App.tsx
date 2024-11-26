import { Route, Routes } from "react-router-dom";
import Home from "./pages/main";
import Layout from "./layout";
import Tours from "./pages/booking";
import Category from "./pages/category";
import Blogs from "./pages/blogs";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/categ" element={<Category />} />
        <Route path="/blog" element={<Blogs />} />
      </Routes>
    </Layout>
  );
}

export default App;
