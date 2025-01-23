import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { DB } from "@/api/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import TourMainDetails from "./create/TourMainDetails";
import { TourMainDetailsType } from "@/types";

const Products = () => {
  const initialFormData: TourMainDetailsType = {
    title: { uz: "", ru: "", en: "" },
    description: { uz: "", ru: "", en: "" },
    image: "",
    duration: { uz: "", ru: "", en: "" },
    price: 0,
    season: [],
  };

  const [formData, setFormData] =
    useState<TourMainDetailsType>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (field: keyof TourMainDetailsType, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.uz)
      newErrors["title.uz"] = "Title in Uzbek is required.";
    if (!formData.title.ru)
      newErrors["title.ru"] = "Title in Russian is required.";
    if (!formData.title.en)
      newErrors["title.en"] = "Title in English is required.";
    if (!formData.description.uz)
      newErrors["description.uz"] = "Description in Uzbek is required.";
    if (!formData.description.ru)
      newErrors["description.ru"] = "Description in Russian is required.";
    if (!formData.description.en)
      newErrors["description.en"] = "Description in English is required.";
    if (!formData.image) newErrors.image = "Image URL is required.";
    if (!formData.duration.uz)
      newErrors["duration.uz"] = "Duration in Uzbek is required.";
    if (!formData.duration.ru)
      newErrors["duration.ru"] = "Duration in Russian is required.";
    if (!formData.duration.en)
      newErrors["duration.en"] = "Duration in English is required.";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0.";
    if (formData.season.length === 0)
      newErrors.season = "At least one season must be selected.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const docRef = await addDoc(collection(DB, "tourss"), formData);
        console.log("Document written with ID: ", docRef.id, formData);

        toast.success("Document successfully written!");
        setFormData(initialFormData);
        setIsDialogOpen(false); // Modalni yopish
      } catch (error) {
        toast.error("Error writing document: ");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const seasonOptions = [
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
  ];

  const renderLanguageFields = (
    fieldKey: keyof TourMainDetailsType,
    label: string
  ) =>
    Object.keys(formData[fieldKey] as Record<string, string>).map((lang) => (
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
    ));

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create New Tour</Button>
        </DialogTrigger>
        <DialogContent className="p-8 max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>Create Tour Main Details</CardTitle>
              <CardDescription>
                Fill in the main details for the tour.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                {renderLanguageFields("title", "Title")}
                {renderLanguageFields("description", "Description")}
                {renderLanguageFields("duration", "Duration")}
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
                    onChange={(e) =>
                      handleChange("price", parseFloat(e.target.value))
                    }
                    className="w-full p-3 text-lg"
                  />
                  {errors.price && (
                    <span className="text-sm text-red-500">{errors.price}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Select
                    id="season"
                    isMulti
                    options={seasonOptions}
                    value={seasonOptions.filter((option) =>
                      formData.season.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      handleChange(
                        "season",
                        selectedOptions.map((option) => option.value)
                      )
                    }
                    className="w-full"
                  />
                  {errors.season && (
                    <span className="text-sm text-red-500">
                      {errors.season}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size={"lg"} onClick={handleSubmit}>
                Next
              </Button>
              <DialogClose asChild>
                <Button size={"lg"} type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between pb-2 mx-3 border-b-2"></div>
      <div>
        <TourMainDetails />
      </div>
    </div>
  );
};

export default Products;
