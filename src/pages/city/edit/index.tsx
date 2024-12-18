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
  description: string;
  images: string;
  flag: string;
}

const EditCity = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        toast.error("Invalid blog ID");
        navigate("/city");
        return;
      }

      try {
        setLoading(true);
        const docRef = doc(DB, "city", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data() as BlogData);
        } else {
          toast.error("Blog not found!");
          navigate("/city");
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
      const docRef = doc(DB, "city", id);
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
            placeholder="Enter blog title in Uzbek"
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
            placeholder="Enter blog title in Russian"
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
            placeholder="Enter blog title in English"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Description</label>
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
          <label className="block mb-2 text-sm font-medium">Image URL</label>
          <Input
            type="text"
            name="image"
            value={formData.images}
            onChange={handleChange}
            placeholder="Enter image URL"
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
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Blog"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/city")}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCity;
