import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TourExpenses } from "@/types";

interface TourExpensesFormProps {
  onSubmitData: (data: TourExpenses[]) => void;
}

const TourExpensesForm = ({ onSubmitData }: TourExpensesFormProps) => {
  const { register, handleSubmit, control } = useForm<{
    expenses: TourExpenses[];
  }>({
    defaultValues: {
      expenses: [
        {
          title: { uz: "", ru: "", en: "" },
          description: { uz: "", ru: "", en: "" },
          image: [""],
          text: { uz: "", ru: "", en: "" },
          time: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "expenses",
  });

  const onSubmit = (data: { expenses: TourExpenses[] }) => {
    onSubmitData(data.expenses);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Tour Expenses</CardTitle>
        <CardDescription>
          Fill in the details for the tour expenses.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <CardContent key={field.id} className="space-y-4">
            {["uz", "ru", "en"].map((lang) => (
              <div key={`title-${index}-${lang}`} className="space-y-2">
                <Label htmlFor={`expenses.${index}.title.${lang}`}>
                  Title ({lang.toUpperCase()})
                </Label>
                <Input
                  id={`expenses.${index}.title.${lang}`}
                  placeholder={`Enter title in ${lang.toUpperCase()}`}
                  {...register(`expenses.${index}.title.${lang}` as const)}
                />
              </div>
            ))}

            {["uz", "ru", "en"].map((lang) => (
              <div key={`description-${index}-${lang}`} className="space-y-2">
                <Label htmlFor={`expenses.${index}.description.${lang}`}>
                  Description ({lang.toUpperCase()})
                </Label>
                <Input
                  id={`expenses.${index}.description.${lang}`}
                  placeholder={`Enter description in ${lang.toUpperCase()}`}
                  {...register(
                    `expenses.${index}.description.${lang}` as const
                  )}
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label>Images</Label>
              {field.image.map((_, imgIndex) => (
                <div
                  key={`image-${index}-${imgIndex}`}
                  className="flex space-x-2"
                >
                  <Input
                    placeholder="Enter image URL"
                    {...register(
                      `expenses.${index}.image.${imgIndex}` as const
                    )}
                  />
                  <Button variant="outline" onClick={() => remove(index)}>
                    Remove Image
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  append({ ...field, image: [...field.image, ""] })
                }
              >
                Add Image URL
              </Button>
            </div>

            {["uz", "ru", "en"].map((lang) => (
              <div key={`text-${index}-${lang}`} className="space-y-2">
                <Label htmlFor={`expenses.${index}.text.${lang}`}>
                  Text ({lang.toUpperCase()})
                </Label>
                <Input
                  id={`expenses.${index}.text.${lang}`}
                  placeholder={`Enter text in ${lang.toUpperCase()}`}
                  {...register(`expenses.${index}.text.${lang}` as const)}
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor={`expenses.${index}.time`}>Time</Label>
              <Input
                id={`expenses.${index}.time`}
                placeholder="Enter time"
                {...register(`expenses.${index}.time` as const)}
              />
            </div>

            <Button variant="destructive" onClick={() => remove(index)}>
              Remove Expense
            </Button>
          </CardContent>
        ))}
        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={() =>
              append({
                title: { uz: "", ru: "", en: "" },
                description: { uz: "", ru: "", en: "" },
                image: [""],
                text: { uz: "", ru: "", en: "" },
                time: "",
              })
            }
          >
            Add New Input Set
          </Button>
          <Button size="lg" type="submit">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TourExpensesForm;
