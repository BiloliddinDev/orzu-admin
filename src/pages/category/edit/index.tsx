import React, { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface BlogData {
  titleuz: string;
  titleru: string;
  titleen: string;
  descriptionuz: string;
  descriptionru: string;
  descriptionen: string;
  image: string;
}

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        toast.error("Invalid blog ID");
        navigate("/categ");
        return;
      }

      try {
        setLoading(true);
        const docRef = doc(DB, "categories", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data() as BlogData);
        } else {
          toast.error("Blog not found!");
          navigate("/categ");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load the blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !formData) {
      toast.error("Invalid form data");
      return;
    }

    try {
      setLoading(true);
      const docRef = doc(DB, "categories", id);
      await updateDoc(docRef, { ...formData, updatedAt: new Date() });
      toast.success("Category updated successfully!");
      navigate("/categ");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update the blog.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Title (Uz)</label>
          <Input
            type="text"
            name="titleuz"
            value={formData.titleuz}
            onChange={handleChange}
            placeholder="Enter Category title in Uzbek"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Title (Ru)</label>
          <Input
            type="text"
            name="titleru"
            value={formData.titleru}
            onChange={handleChange}
            placeholder="Enter Category title in Russian"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Title (En)</label>
          <Input
            type="text"
            name="titleen"
            value={formData.titleen}
            onChange={handleChange}
            placeholder="Enter Category title in English"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Description  (Uzbek)</label>
          <Textarea
            name="descriptionuz"
            value={formData.descriptionuz}
            onChange={handleChange}
            placeholder="Enter Category description in Uzbek"
            rows={4}
            required
          />
        </div><div>
          <label className="block mb-2 text-sm font-medium">Description (Russian)</label>
          <Textarea
            name="descriptionru"
            value={formData.descriptionru}
            onChange={handleChange}
            placeholder="Enter Category description in russian"
            rows={4}
            required
          />
        </div><div>
          <label className="block mb-2 text-sm font-medium">Description  (English)</label>
          <Textarea
            name="descriptionen"
            value={formData.descriptionen}
            onChange={handleChange}
            placeholder="Enter Category description in english"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Image URL</label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/categ")}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
