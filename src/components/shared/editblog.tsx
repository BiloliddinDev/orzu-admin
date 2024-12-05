import { DB } from "@/api/firebase";
import { Blogstype } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface EditBlogProps {
  updateBlog: Blogstype;
  onUpdate: (updatedBlog: Blogstype) => void;
}

const Editblog: React.FC<EditBlogProps> = ({ updateBlog, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Blogstype>(updateBlog);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogDocRef = doc(DB, "blog", formData.id); // Firebase document manzilini aniqlash

      // formData dan faqat kerakli xususiyatlarni olish
      const { id, ...updateData } = formData;

      await updateDoc(blogDocRef, updateData); // Ma'lumotlarni yangilash

      onUpdate(formData); // Yangilangan blogni asosiy komponentga yuborish
      alert("Blog successfully updated!");
    } catch (error) {
      console.error("Error updating blog: ", error);
      alert("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter blog description"
            rows={4}
            required
          />
        </div>
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
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Blog"}
        </Button>
      </form>
    </div>
  );
};

export default Editblog;
