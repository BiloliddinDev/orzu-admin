import React, { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categorytype, tourtype } from "@/types";
import TagSelect from "./multiselect";

const CreateTourForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    about: ["тур"],
    season: "Autumn",
    category: "Adventure",
    description: "",
    duration: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<categorytype[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(DB, "categories"));
      const categoriesData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);
  console.log(categories);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const formattedTitles = categories
    .map((category) => `"${category.title}"`)
    .join(" | ");

  const handleSeasonChange = (
    value: "Summer" | "Winter" | "Spring" | "Autumn"
  ) => {
    setFormData({ ...formData, season: value });
  };
  const handleCategoryChange = (value: typeof formattedTitles) => {
    setFormData({ ...formData, category: value });
  };

  const handleAboutChange = (value: string[]) => {
    setFormData({ ...formData, about: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tourData = {
        title: formData.title,
        about: formData.about,
        price: Number(formData.price),
        location: formData.location,
        category: formData.category,
        season: formData.season,
        description: formData.description,
        duration: formData.duration,
        image: formData.image,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(DB, "tours"), tourData);
      console.log("Document written with ID: ", docRef.id);

      alert("Tour created successfully!");
      setFormData({
        title: "",
        price: "",
        location: "",
        season: "Summer",
        about: [],
        category: "Adventure",
        description: "",
        duration: "",
        image: "",
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
            placeholder="Enter tour title"
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
            placeholder="Enter price in USD"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Location</label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Category</label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Season</label>
          <Select
            value={formData.season}
            onValueChange={handleSeasonChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Summer">Summer</SelectItem>
              <SelectItem value="Winter">Winter</SelectItem>
              <SelectItem value="Spring">Spring</SelectItem>
              <SelectItem value="Autumn">Autumn</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">About tour</label>
          <TagSelect
            onChange={handleAboutChange}
            initialOptions={[
              "лето",
              "россия",
              "алтай",
              "зима",
              "осень",
              "весна",
              "новый год",
            ]}
            initialTags={formData.about}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter tour description"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Duration</label>
          <Input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3 days, 2 nights"
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
          {loading ? "Creating..." : "Create Tour"}
        </Button>
      </form>
    </div>
  );
};

export default CreateTourForm;
