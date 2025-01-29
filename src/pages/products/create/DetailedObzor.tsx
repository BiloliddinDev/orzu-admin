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

export const DetailedObzor = ({
  onNextStep,
  onBackStep,
  name,
}: {
  onNextStep: () => void;
  onBackStep: () => void;
  name: string;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<{
    [key: string]: Array<{
      day: { uz: string; ru: string; en: string };
      dayTitle: { uz: string; ru: string; en: string };
      hours: Array<{
        time: string;
        hourTitle: { uz: string; ru: string; en: string };
      }>;
    }>;
  }>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name, // Use the provided `name` prop
    keyName: "id",
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append({
        day: { uz: "", ru: "", en: "" },
        dayTitle: { uz: "", ru: "", en: "" },
        hours: [{ time: "", hourTitle: { uz: "", ru: "", en: "" } }],
      });
    }
  }, [fields, append]);

  const addDayProgram = () => {
    append({
      day: { uz: "", ru: "", en: "" },
      dayTitle: { uz: "", ru: "", en: "" },
      hours: [{ time: "", hourTitle: { uz: "", ru: "", en: "" } }],
    });
  };

  const addImage = (index: number) => {
    const currentImages = fields[index]?.hours || [];
    update(index, {
      ...fields[index],
      hours: [
        ...currentImages,
        { time: "", hourTitle: { uz: "", ru: "", en: "" } },
      ],
    });
  };

  const removeImage = (fieldIndex: number, imageIndex: number) => {
    const currentImages = fields[fieldIndex]?.hours || [];
    const updatedImages = currentImages.filter((_, i) => i !== imageIndex);
    update(fieldIndex, {
      ...fields[fieldIndex],
      hours: updatedImages,
    });
  };

  const onSubmit = (data: Record<string, any>) => {
    console.log("Form Data:", data);
    onNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <h2>Add Day detailed Program</h2>
        <CardDescription>
          Fill in the about details for the tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4  p-4 rounded-md">
            {(["day", "dayTitle"] as const).map((key) => (
              <div key={`${name}-${index}-${key}`} className="space-y-2">
                {(["uz", "ru", "en"] as const).map((lang) => (
                  <div key={`${name}-${index}-${key}-${lang}`}>
                    <Label htmlFor={`${name}-${index}-${key}-${lang}`}>
                      {key} ({lang.toUpperCase()})
                    </Label>
                    <Input
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
              <Label>Day Hourly </Label>
              {field.hours.map((_, imageIndex) => (
                <div
                  key={`${name}.${index}-hours-${imageIndex}`}
                  className="flex items-center justify-start gap-6"
                >
                  <div>
                    <Label
                      htmlFor={`${name}.${index}.hours.${imageIndex}.time`}
                    >
                      Time
                    </Label>
                    <Input
                      className=" w-full"
                      placeholder="Enter time"
                      {...register(
                        `${name}.${index}.hours.${imageIndex}.time`,
                        {
                          required: "Time is required.",
                        }
                      )}
                    />
                  </div>
                  <div className="w-[50%] mt-10">
                    {(["hourTitle"] as const).map((key) => (
                      <div
                        key={`${name}-${index}-${key}`}
                        className="space-y-2"
                      >
                        {(["uz", "ru", "en"] as const).map((lang) => (
                          <div key={`${name}-${index}-${key}-${lang}`}>
                            <Label
                              htmlFor={`${name}.${index}.hours.${imageIndex}.${key}.${lang}`}
                            >
                              {key} ({lang.toUpperCase()})
                            </Label>
                            <Input
                              className="my-2"
                              id={`${name}-${index}.hours.${imageIndex}.${key}.${lang}`}
                              placeholder={`Enter ${key} in ${lang.toUpperCase()}`}
                              {...register(
                                `${name}.${index}.hours.${imageIndex}.${key}.${lang}`,
                                {
                                  required: `${key} in ${lang.toUpperCase()} is required.`,
                                }
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
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
                Add Hour
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
          <Button>Create</Button>
        </div>
      </CardContent>
    </Card>
  );
};
