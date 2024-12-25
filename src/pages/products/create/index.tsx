import React, { useState } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Select from "react-select"; // Assuming you are using react-select for multi-select
import { title } from "process";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    titleUz: "",
    titleRu: "",
    titleEn: "",
    durationUz: "",
    durationRu: "",
    durationEn: "",
    price: 0,
    season: [],
  });
  const [loading, setLoading] = useState(false);

  const seasonOptions = [
    { value: "Yoz", label: "Yoz" },
    { value: "Qish", label: "Qish" },
    { value: "Bahor", label: "Bahor" },
    { value: "Kuz", label: "Kuz" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSeasonChange = (selectedOptions: any) => {
    setFormData({ ...formData, season: selectedOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        image: formData.image,
        duration: {
          uz: formData.durationUz,
          ru: formData.durationRu,
          en: formData.durationEn,
        },

        title: {
          uz: formData.titleUz,
          ru: formData.titleRu,
          en: formData.titleEn,
        },
        price: formData.price,
        season: formData.season.map((option: any) => option.value),
      };

      const docRef = await addDoc(collection(DB, "products"), productData);
      console.log("Document written with ID: ", docRef.id);

      alert("Product created successfully!");
      setFormData({
        image: "",
        durationUz: "",
        durationRu: "",
        durationEn: "",
        titleUz: "",
        titleRu: "",
        titleEn: "",
        price: 0,
        season: [],
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Image URL</label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Title (Uzbek)
          </label>
          <Input
            type="text"
            name="titleUz"
            value={formData.titleUz}
            onChange={handleChange}
            placeholder="Enter duration in Uzbek"
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
            value={formData.titleRu}
            onChange={handleChange}
            placeholder="Enter duration in Uzbek"
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
            value={formData.titleEn}
            onChange={handleChange}
            placeholder="Enter duration in Uzbek"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Duration (Uzbek)
          </label>
          <Input
            type="text"
            name="durationUz"
            value={formData.durationUz}
            onChange={handleChange}
            placeholder="Enter duration in Uzbek"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Duration (Russian)
          </label>
          <Input
            type="text"
            name="durationRu"
            value={formData.durationRu}
            onChange={handleChange}
            placeholder="Enter duration in Russian"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Duration (English)
          </label>
          <Input
            type="text"
            name="durationEn"
            value={formData.durationEn}
            onChange={handleChange}
            placeholder="Enter duration in English"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Price</label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Season</label>
          <Select
            isMulti
            name="season"
            options={seasonOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSeasonChange}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductForm;
