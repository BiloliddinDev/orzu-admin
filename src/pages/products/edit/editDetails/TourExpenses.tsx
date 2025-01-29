import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext, useFieldArray } from "react-hook-form";

export const DaysProgramInputs = ({
  onNextStep,
  onBackStep,
  name,
  formData,
}: {
  onNextStep: () => void;
  onBackStep: () => void;
  name: string;
  formData: any;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<{
    [key: string]: Array<{
      day: { uz: string; ru: string; en: string };
      dayText: { uz: string; ru: string; en: string };
      dayTitle: { uz: string; ru: string; en: string };
      images: string[];
    }>;
  }>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name, // Use the provided `name` prop
    keyName: "id",
  });

  React.useEffect(() => {
    if (formData?.Days?.length > 0) {
      formData.Days.forEach(
        (item: {
          day: { uz: string; ru: string; en: string };
          dayText: { uz: string; ru: string; en: string };
          dayTitle: { uz: string; ru: string; en: string };
          images: string[];
        }) => {
          append(item);
        }
      );
    }
  }, [formData]);

  const addDayProgram = () => {
    append({
      day: { uz: "", ru: "", en: "" },
      dayText: { uz: "", ru: "", en: "" },
      dayTitle: { uz: "", ru: "", en: "" },
      images: [""],
    });
  };

  const addImage = (index: number) => {
    const currentImages = fields[index]?.images || [];
    update(index, {
      ...fields[index],
      images: [...currentImages, ""],
    });
  };

  const removeImage = (fieldIndex: number, imageIndex: number) => {
    const currentImages = fields[fieldIndex]?.images || [];
    const updatedImages = currentImages.filter((_, i) => i !== imageIndex);
    update(fieldIndex, {
      ...fields[fieldIndex],
      images: updatedImages,
    });
  };

  const onSubmit = (data: Record<string, any>) => {
    console.log("Form Data:", data);
    onNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <h2>Add Day Program</h2>
        <CardDescription>
          Fill in the about details for the tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4  p-4 rounded-md">
            {(["day", "dayTitle", "dayText"] as const).map((key) => (
              <div key={`${name}-${index}-${key}`} className="space-y-2">
                {(["uz", "ru", "en"] as const).map((lang) => (
                  <div key={`${name}-${index}-${key}-${lang}`}>
                    <Label htmlFor={`${name}-${index}-${key}-${lang}`}>
                      {key} ({lang.toUpperCase()})
                    </Label>
                    <Input
                      defaultValue={field[key][lang]}
                      className="my-2"
                      id={`${name}-${index}-${key}-${lang}`}
                      placeholder={`Enter ${key} in ${lang.toUpperCase()}`}
                      {...register(`${name}.${index}.${key}.${lang}`, {
                        required: `${key} in ${lang.toUpperCase()} is required.`,
                      })}
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* Image Uploads */}
            <div>
              <Label>Images</Label>
              {field.images.map((_, imageIndex) => (
                <div
                  key={`${name}-${index}-images-${imageIndex}`}
                  className="flex items-center gap-2"
                >
                  <Input
                    defaultValue={field.images[imageIndex]}
                    className="my-3"
                    placeholder="Enter image URL"
                    {...register(`${name}.${index}.images.${imageIndex}`, {
                      required: "Image URL is required.",
                    })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeImage(index, imageIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="mt-5"
                type="button"
                onClick={() => addImage(index)}
              >
                Add Image
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => remove(index)}
              type="button"
            >
              Remove Day Program
            </Button>
            <Button
              className="ml-[4%]"
              type="button"
              variant="outline"
              onClick={addDayProgram}
            >
              Add Day Program
            </Button>
          </div>
        ))}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onBackStep}>
            Back
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};
