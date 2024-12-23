import React, { useState, useEffect } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProductType, toursmain } from "@/types";

const ToursDataMain = () => {
  const [formData, setFormData] = useState<toursmain>({
    title: {
      uz: "",
      ru: "",
      en: "",
    },
    time: "",
    transport: "",
    accommodation: "",
    productId: "",
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); // State to hold products

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(DB, "products"));
      const productsList: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("title")) {
      const lang = name.split("title")[1].toLowerCase();
      setFormData({
        ...formData,
        title: { ...formData.title, [lang]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(DB, "toursmamain"), formData);
      console.log("Document written with ID: ", docRef.id);

      alert("Tour created successfully!");
      setFormData({
        title: {
          uz: "",
          ru: "",
          en: "",
        },
        time: "",
        transport: "",
        accommodation: "",
        productId: "",
      });
    } catch (error) {
      console.error("Error creating tour:", error);
      alert("Failed to create the tour. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Create New Tour</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Title (Uzbek)
          </label>
          <Input
            type="text"
            name="titleUz"
            value={formData.title.uz}
            onChange={handleChange}
            placeholder="Enter title in Uzbek"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Title (Russian)
          </label>
          <Input
            type="text"
            name="titleRu"
            value={formData.title.ru}
            onChange={handleChange}
            placeholder="Enter title in Russian"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Title (English)
          </label>
          <Input
            type="text"
            name="titleEn"
            value={formData.title.en}
            onChange={handleChange}
            placeholder="Enter title in English"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Time</label>
          <Input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Enter time"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Transport</label>
          <Textarea
            name="transport"
            value={formData.transport}
            onChange={handleChange}
            placeholder="Enter transport details"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Accommodation
          </label>
          <Textarea
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
            placeholder="Enter accommodation details"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product: ProductType) => (
              <option key={product.id} value={product.id}>
                {product.title.uz}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Tour"}
        </Button>
      </form>
    </div>
  );
};

export default ToursDataMain;
