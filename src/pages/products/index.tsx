import { DB } from "@/api/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(DB, "products"));
      const productsData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const productRef = doc(DB, "products", id);
      await deleteDoc(productRef);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-3 border-b-2">
        <Button
          className="mb-3"
          onClick={() => navigate("/tours/create")}
          title="Add Product"
        >
          Create Product
        </Button>
        <div className="relative w-[350px]">
          <Search className="absolute top-[5px] left-2" />
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-[35px]"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {products.map((product: ProductType) => (
          <Link
            to={`/tours/detel/${product.id}`}
            key={product.id}
            className="w-[300px] flex flex-col items-center border p-2"
          >
            <img src={product.image} alt={product.image} />
            <h2>{product.title.uz}</h2>
            <p>{product.duration.uz}</p>
            <div className="flex mt-2 space-x-2">
              <Button
                onClick={() => handleDelete(product.id)}
                className="w-full bg-main-300"
              >
                <MdDelete />
              </Button>
              <Button
                // onClick={() => navigate(`/products/edit/${product.id}`)}
                title="Edit"
              >
                Edit data
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
