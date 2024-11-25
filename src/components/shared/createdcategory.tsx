import React, { useState } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = {
        title: formData.title,
        description: formData.description,
      };

      const docRef = await addDoc(collection(DB, "categories"), categoryData);
      console.log("Document written with ID: ", docRef.id);

      alert("Category created successfully!");
      setFormData({
        title: "",
        description: "",
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

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create category"}
        </Button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
