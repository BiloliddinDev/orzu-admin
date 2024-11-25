import { useState } from "react";
import { tourtype } from "@/types";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "@/api/firebase";

interface EditTourFormProps {
  tour: tourtype;
}

const EditTourForm: React.FC<EditTourFormProps> = ({ tour }) => {
  const [updatedTour, setUpdatedTour]: any = useState(tour);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedTour((prevTour: any) => ({
      ...prevTour,
      [name]: value,
    }));
  };

  const handleSeasonChange = (value: string) => {
    setUpdatedTour((prevTour: any) => ({
      ...prevTour,
      season: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tourDocRef = doc(DB, "tours", updatedTour.id);
      await updateDoc(tourDocRef, updatedTour);
      alert("Tour successfully updated!");
    } catch (error) {
      console.error("Error updating tour: ", error);
      alert("Failed to update tour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2>Edit Tour</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <Input
            type="text"
            name="title"
            value={updatedTour.title}
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
            value={updatedTour.price}
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
            value={updatedTour.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Season</label>
          <Select
            value={updatedTour.season}
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
            value={updatedTour.description}
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
            value={updatedTour.duration}
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
            value={updatedTour.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Tour"}
        </Button>
      </form>
    </div>
  );
};

export default EditTourForm;
