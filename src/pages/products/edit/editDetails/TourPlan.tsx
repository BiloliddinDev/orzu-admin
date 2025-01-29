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
import { toast } from "react-toastify";

interface TourPlanFormProps {
  onNextStep: () => void;
  onBackStep: () => void;
  formData: any;
}
export const Inputs = ({
  onNextStep,
  onBackStep,
  name,
  formData,
}: {
  onNextStep: () => void;
  onBackStep: () => void;
  name: string;
  formData: Array<{
    uz: string;
    ru: string;
    en: string;
  }>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<{
    [key: string]: Array<{
      uz: string;
      ru: string;
      en: string;
    }>;
  }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name, // Use the provided `name` prop
    keyName: "id",
  });

  React.useEffect(() => {
    console.log(fields.length);
    if (formData?.length > 0) {
      formData.forEach((item: { uz: string; ru: string; en: string }) => {
        append(item);
      });
    }
    // else if (fields.length === 0 && formData.length === 0) {
    //   append({ uz: "", ru: "", en: "" });
    // }
  }, [formData]);

  const addDescription = () => {
    toast.success(`Added new  ${name} form`);
    append({ uz: "", ru: "", en: "" });
  };
  return (
    <CardContent className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          {(["uz", "ru", "en"] as const).map((lang) => (
            <div key={`${name}-${index}-${lang}`} className="space-y-2">
              <Label htmlFor={`${name}-${index}-${lang}`}>
                {name} ({lang.toUpperCase()})
              </Label>
              <Input
                defaultValue={field[lang]}
                id={`${name}-${index}-${lang}`}
                placeholder={`Enter ${name} in ${lang.toUpperCase()}`}
                {...register(`${name}.${index}.${lang}`, {
                  required: `${name} in ${lang.toUpperCase()} is required.`,
                })}
              />
              {errors.name?.[index]?.[lang] && (
                <span className="text-sm text-red-500">
                  {
                    (errors.name[index] as Record<typeof lang, any>)?.[lang]
                      ?.message
                  }
                </span>
              )}
            </div>
          ))}
          <div className="flex gap-[5%]">
            {fields.length > 1 && (
              <Button onClick={() => remove(index)}>Remove</Button>
            )}
          </div>
        </div>
      ))}
      <Button onClick={addDescription}>Add {name}</Button>
    </CardContent>
  );
};
const TourPlanForm: React.FC<TourPlanFormProps> = ({
  onNextStep,
  onBackStep,
  formData,
}) => {
  console.log("Form data in TourPlanForm: ", formData);

  return (
    <Card>
      <CardHeader>
        <h2>Create In Tour data Plan</h2>
        <CardDescription>
          Fill in the about details for the tour.
        </CardDescription>
      </CardHeader>
      <Inputs
        name={"description"}
        formData={formData.Description}
        onBackStep={onBackStep}
        onNextStep={onNextStep}
      />
      <CardFooter className="gap-2">
        {/* <Button size={"lg"} onClick={handleSubmit(onSubmit)}>
          Next
        </Button> */}
        <Button size={"lg"} variant={"outline"} onClick={onBackStep}>
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourPlanForm;
