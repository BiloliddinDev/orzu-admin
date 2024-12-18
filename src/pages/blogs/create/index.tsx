import { DB } from "@/api/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: {
      uz: "",
      ru: "",
      en: "",
    },
    description: {
      uz: "",
      ru: "",
      en: "",
    },
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const [field, lang] = name.includes("[")
      ? name.split("[").map((part) => part.replace("]", ""))
      : [name];

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [field]: lang
        ? {
            ...prevFormData[field],
            [lang]: value,
          }
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tourData = {
        title: {
          uz: formData.title.uz,
          ru: formData.title.ru,
          en: formData.title.en,
        },
        description: {
          uz: formData.description.uz,
          ru: formData.description.ru,
          en: formData.description.en,
        },
        image: formData.image,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(DB, "blog"), tourData);
      console.log("Document written with ID: ", docRef.id, tourData);

      toast.success("Blogs created sucsesfully");
      navigate("/blogs");
      setFormData({
        title: {
          uz: "",
          ru: "",
          en: "",
        },
        description: {
          uz: "",
          ru: "",
          en: "",
        },
        image: "",
      });
    } catch (error) {
      console.error("Error creating tour:", error);
      toast.error("Failed to create the tour. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">
        Create New Blogs for Orzu travel
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Title Uz</label>
          <Input
            type="text"
            name="title[uz]"
            value={formData.title.uz}
            onChange={handleChange}
            placeholder="Enter tour title"
            required
          />
          <label className="block my-2 text-sm font-medium">Title Ru</label>
          <Input
            type="text"
            name="title[ru]"
            value={formData.title.ru}
            onChange={handleChange}
            placeholder="Enter tour title"
            required
          />
          <label className="block my-2 text-sm font-medium">Title En</label>
          <Input
            type="text"
            name="title[en]"
            value={formData.title.en}
            onChange={handleChange}
            placeholder="Enter tour title"
            required
          />
        </div>
        <div>
          <label className="block my-2 text-sm font-medium">
            Description Uz
          </label>
          <Textarea
            name="description[uz]"
            value={formData.description.uz}
            onChange={handleChange}
            placeholder="Enter tour description"
            rows={4}
            required
          />
          <label className="block my-2 text-sm font-medium">
            Description Ru
          </label>
          <Textarea
            name="description[ru]"
            value={formData.description.ru}
            onChange={handleChange}
            placeholder="Enter tour description"
            rows={4}
            required
          />
          <label className="block my-2 text-sm font-medium">
            Description En
          </label>
          <Textarea
            name="description[en]"
            value={formData.description.en}
            onChange={handleChange}
            placeholder="Enter tour description"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block my-2 text-sm font-medium">Image URL</label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="flex items-center justify-end gap-2 w-[30%]">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Tour"}
          </Button>
          <Button
            type="submit"
            onClick={() => navigate(-1)}
            className="w-full bg-main-100"
          >
            Back Blogs Page
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
