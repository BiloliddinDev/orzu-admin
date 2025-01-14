import React, { useState } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    descriptionuz: "",
    descriptionru: "",
    descriptionen: "",
    titleuz: "",
    titleru: "",
    titleen: "",
    image: "",
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
        descriptionuz: formData.descriptionuz,
        descriptionru: formData.descriptionru,
        descriptionen: formData.descriptionen,
        titleuz: formData.titleuz,
        titleru: formData.titleru,
        titleen: formData.titleen,
        image: formData.image,
      };

      const docRef = await addDoc(collection(DB, "categories"), categoryData);
      console.log("Document written with ID: ", docRef.id);

      alert("Category created successfully!");
      setFormData({
        title: "",
        descriptionuz: "",
        descriptionru: "",
        descriptionen: "",
        titleuz: "",
        titleru: "",
        titleen: "",
        image: "",
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
          <label className="block mb-1 text-sm font-medium">Description  (Uzbek)</label>
          <Textarea
            name="descriptionuz"
            value={formData.descriptionuz}
            onChange={handleChange}
            placeholder="Enter category description"
            rows={4}
            required
          />
        </div> <div>
          <label className="block mb-1 text-sm font-medium">Description (Russian)</label>
          <Textarea
            name="descriptionru"
            value={formData.descriptionru}
            onChange={handleChange}
            placeholder="Enter category description"
            rows={4}
            required
          />
        </div> <div>
          <label className="block mb-1 text-sm font-medium">Description (English)</label>
          <Textarea
            name="descriptionen"
            value={formData.descriptionen}
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
            Images for Category
          </label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
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

export default CreateCategoryForm;
