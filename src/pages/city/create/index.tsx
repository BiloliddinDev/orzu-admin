import React, { useState } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CityCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    flag: "",
    description: "",
    images: "",
    titleuz: "",
    titleru: "",
    titleen: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = {
        title: formData.title,
        description: formData.description,
        titleuz: formData.titleuz,
        titleru: formData.titleru,
        titleen: formData.titleen,
        images: formData.images,
        flag: formData.flag,
      };

      const docRef = await addDoc(collection(DB, "city"), categoryData);
      console.log("Document written with ID: ", docRef.id);

      alert("Category created successfully!");
      setFormData({
        title: "",
        description: "",
        titleuz: "",
        titleru: "",
        titleen: "",
        flag: "",
        images: "",
      });
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create the category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Create New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter category title"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Images for City
          </label>
          <Input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Enter category title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Title (Uzbek)
          </label>
          <Input
            type="text"
            name="titleuz"
            value={formData.titleuz}
            onChange={handleChange}
            placeholder="Enter category title in Uzbek"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Title (Russian)
          </label>
          <Input
            type="text"
            name="titleru"
            value={formData.titleru}
            onChange={handleChange}
            placeholder="Enter category title in Russian"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Title (English)
          </label>
          <Input
            type="text"
            name="titleen"
            value={formData.titleen}
            onChange={handleChange}
            placeholder="Enter category title in English"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Image for Flags
          </label>
          <Input
            type="text"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            placeholder="Enter category title in English"
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </div>
  );
};

export default CityCreate;
