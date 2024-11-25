import React, { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { categorytype } from "@/types";

const UpdateCategoryForm = ({ category }: { category: categorytype }) => {
  const [editingdata, setEditingdata] = useState<categorytype>(category);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditingdata((prevTour) => ({
      ...prevTour,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = {
        title: editingdata.title,
        description: editingdata.description,
      };

      const docRef = doc(DB, "categories", category.id);
      await updateDoc(docRef, categoryData);

      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update the category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Update Category</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <Input
            type="text"
            name="title"
            value={editingdata.title}
            onChange={handleChange}
            placeholder="Enter category title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={editingdata.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows={4}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update category"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
