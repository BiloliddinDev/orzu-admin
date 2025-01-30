import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { DB } from "@/api/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { categorytype, TourMainDetailsType } from "@/types";
import { useNavigate, useParams } from "react-router-dom";

const editMainTour = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Partial<TourMainDetailsType> | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        toast.error("Invalid Tour ID");
        navigate("/tours");
        return;
      }

      try {
        setLoading(true);
        const docRef = doc(DB, "tourss", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as TourMainDetailsType;
          setFormData(data);
          console.log(data);
        } else {
          toast.error("Tour not found!");
          navigate("/tours");
        }
      } catch (error) {
        console.error("Error fetching tour:", error);
        toast.error("Failed to load the tour data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const [categories, setCategories] = useState<categorytype[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const querySnapshot = await getDocs(collection(DB, "categories"));
      const categorydata: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categorydata);
    };

    fetchCategory();
  }, [isDialogOpen]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof TourMainDetailsType, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;

      return { ...prev, [field]: value };
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    // console.log("Form data: ", formData);

    if (!id || !formData) {
      toast.error("Invalid form data");
      return;
    }
    try {
      const docRef = doc(DB, "tourss", id);
      await updateDoc(docRef, formData);

      console.log("Document written with ID: ", docRef.id, formData);

      toast.success("Document successfully written!");
      navigate("/tours");
      setFormData(formData);
    } catch (error) {
      toast.error("Error writing document: ");
    } finally {
      setLoading(false);
    }
  };

  const renderLanguageFields = (
    fieldKey: keyof TourMainDetailsType,
    label: string
  ) => {
    if (!formData) return null;
    {
    }
    if (formData) {
      return Object.keys(formData[fieldKey] as Record<string, string>).map(
        (lang) => (
          <div key={`${fieldKey}-${lang}`} className="space-y-2">
            <Label htmlFor={`${fieldKey}-${lang}`}>
              {label} ({lang.toUpperCase()})
            </Label>
            {fieldKey === "description" ? (
              <textarea
                id={`${fieldKey}-${lang}`}
                placeholder={`Enter ${label.toLowerCase()} in ${lang.toUpperCase()}`}
                value={(formData[fieldKey] as Record<string, string>)[lang]}
                onChange={(e) =>
                  handleChange(fieldKey, {
                    ...(formData[fieldKey] as Record<string, string>),
                    [lang]: e.target.value,
                  })
                }
                className="w-full p-3 overflow-auto text-lg border rounded-md resize-y"
                rows={4} // Boshlang'ich balandlik
              ></textarea>
            ) : (
              <Input
                id={`${fieldKey}-${lang}`}
                placeholder={`Enter ${label.toLowerCase()} in ${lang.toUpperCase()}`}
                value={(formData[fieldKey] as Record<string, string>)[lang]}
                onChange={(e) =>
                  handleChange(fieldKey, {
                    ...(formData[fieldKey] as Record<string, string>),
                    [lang]: e.target.value,
                  })
                }
                className="w-full p-3 text-lg"
              />
            )}
            {errors[`${fieldKey}.${lang}`] && (
              <span className="text-sm text-red-500">
                {errors[`${fieldKey}.${lang}`]}
              </span>
            )}
          </div>
        )
      );
    }
  };
  if (!formData) {
    return <div className="text-2xl">Loading...</div>;
  }
  return (
    <div className="max-w-[75vw] mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {renderLanguageFields("title", "Title")}
        {renderLanguageFields("description", "Description")}
        {renderLanguageFields("duration", "Duration")}
        {renderLanguageFields("season", "Season")}
        {renderLanguageFields("month", "Month")}
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="w-full p-3 text-lg"
          />
          {errors.image && (
            <span className="text-sm text-red-500">{errors.image}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter price"
            value={formData.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
            className="w-full p-3 text-lg"
          />
          {errors.price && (
            <span className="text-sm text-red-500">{errors.price}</span>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Category</label>
          <select
            className="w-full p-1 shadow text-lg border "
            name="category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.titleen}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Is Best </Label>
          <Input
            id="isBest"
            type="checkbox"
            checked={formData.isBest}
            // defaultValue={formData.isBest}
            onChange={(e) => handleChange("isBest", e.target.checked)}
            className=" m-0 p-0 text-lg border-0 outline-none"
          />
          {errors.isBest && (
            <span className="text-sm text-red-500">{errors.price}</span>
          )}
        </div>
      </div>
      <Button onClick={handleSubmit} className="w-full my-3 bg-main-200 p-2">
        Uptade Tour
      </Button>
    </div>
  );
};
export default editMainTour;
