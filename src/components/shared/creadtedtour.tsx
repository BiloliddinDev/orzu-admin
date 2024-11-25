import React, { useState } from "react";
import { DB } from "@/api/firebase";
import { collection, addDoc } from "firebase/firestore";
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
import { tourtype } from "@/types";

const CreateTourForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    season: "",
    description: "",
    duration: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSeasonChange = (value: tourtype) => {
    setFormData({ ...formData, season: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tourData = {
        title: formData.title,
        price: Number(formData.price),
        location: formData.location,
        season: formData.season,
        description: formData.description,
        duration: formData.duration,
        image: formData.imageUrl,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(DB, "tours"), tourData);
      console.log("Document written with ID: ", docRef.id);

      alert("Tour created successfully!");
      setFormData({
        title: "",
        price: "",
        location: "",
        season: "",
        description: "",
        duration: "",
        imageUrl: "",
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
            name="imageUrl"
            value={formData.imageUrl}
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
