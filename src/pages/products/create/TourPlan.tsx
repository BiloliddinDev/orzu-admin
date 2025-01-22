import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useFormContext, useFieldArray, FieldErrors } from "react-hook-form";

interface TourPlanFormProps {
  onNextStep: () => void;
  onBackStep: () => void;
}

const TourPlanForm: React.FC<TourPlanFormProps> = ({
  onNextStep,
  onBackStep,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<{
    title: {
      uz: string;
      ru: string;
      en: string;
    };
    description: Array<{
      uz: string;
      ru: string;
      en: string;
    }>;
  }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
    keyName: "id",
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append({ uz: "", ru: "", en: "" });
    }
  }, [fields, append]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    onNextStep();
  };

  const addDescription = () => {
    append({ uz: "", ru: "", en: "" });
  };

  return (
    <Card>
      <CardHeader>
        <h2>Create Tour Plan</h2>
        <CardDescription>
          Fill in the about details for the tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {(["uz", "ru", "en"] as const).map((lang) => (
          <div key={`title-${lang}`} className="space-y-2">
            <Label htmlFor={`title-${lang}`}>
              Title ({lang.toUpperCase()})
            </Label>
            <Input
              id={`title-${lang}`}
              placeholder={`Enter title in ${lang.toUpperCase()}`}
              {...register(`title.${lang}`, {
                required: `Title in ${lang.toUpperCase()} is required.`,
              })}
            />
            {errors.title?.[lang] && (
              <span className="text-sm text-red-500">
                {(errors.title[lang] as any)?.message}
              </span>
            )}
          </div>
        ))}

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            {(["uz", "ru", "en"] as const).map((lang) => (
              <div key={`description-${index}-${lang}`} className="space-y-2">
                <Label htmlFor={`description-${index}-${lang}`}>
                  Description ({lang.toUpperCase()})
                </Label>
                <Input
                  id={`description-${index}-${lang}`}
                  placeholder={`Enter description in ${lang.toUpperCase()}`}
                  {...register(`description.${index}.${lang}`, {
                    required: `Description in ${lang.toUpperCase()} is required.`,
                  })}
                />
                {errors.description?.[index]?.[lang] && (
                  <span className="text-sm text-red-500">
                    {
                      (errors.description[index] as Record<typeof lang, any>)?.[
                        lang
                      ]?.message
                    }
                  </span>
                )}
              </div>
            ))}
            <Button onClick={() => remove(index)}>Remove</Button>
          </div>
        ))}

        <Button onClick={addDescription}>Add Description</Button>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size={"lg"} onClick={handleSubmit(onSubmit)}>
          Next
        </Button>
        <Button size={"lg"} variant={"outline"} onClick={onBackStep}>
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourPlanForm;
