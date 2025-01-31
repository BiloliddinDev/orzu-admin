import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Corrected Input import
import { Label } from "@/components/ui/label"; // Corrected Label import
import { useFormContext } from "react-hook-form";
import { Inputs } from "./Inputs"; // Corrected Inputs import
import { useEffect } from "react";

type TourProgramDescription = {
  age: { uz: string; ru: string; en: string };
  flight: { uz: string; ru: string; en: string };
  timeEvent: { uz: string; ru: string; en: string };
  countPeople: { uz: string; ru: string; en: string };
  transport: { uz: string; ru: string; en: string };
  accommodation: { uz: string; ru: string; en: string };
};

export function TourProgramDescriptionForm({
  formData,
  onNextStep,
  onBackStep,
}: {
  onNextStep: () => void;
  onBackStep: () => void;
  formData: any;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useFormContext<TourProgramDescription>();
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((key) => {
        const fieldKey = key as keyof TourProgramDescription;
        if (formData[fieldKey]) {
          Object.keys(formData[fieldKey]!).forEach((lang) => {
            const fieldPath =
              `${fieldKey}.${lang}` as keyof TourProgramDescription;
            setValue(`${fieldPath}`, formData[fieldKey]?.[lang] || "");
          });
        }
      });
    }
  }, [setValue]);
  const onSubmit = (data: TourProgramDescription) => {
    console.log("Tour Program Description Data:", data);
    onNextStep();
  };

  const renderLanguageFields = (
    fieldKey: keyof TourProgramDescription,
    label: string
  ) =>
    (["uz", "ru", "en"] as const).map((lang) => {
      const fieldPath = `${fieldKey}.${lang}` as const;

      return (
        <div key={fieldPath} className="space-y-4">
          <Label htmlFor={fieldPath}>
            {label} ({lang.toUpperCase()})
          </Label>
          <Input
            id={fieldPath}
            placeholder={`Enter ${label.toLowerCase()} in ${lang.toUpperCase()}`}
            {...register(fieldPath, {
              required: `${label} in ${lang.toUpperCase()} is required.`,
            })}
          />
        </div>
      );
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Tour Program Description</CardTitle>
        <CardDescription>
          Fill in the program description details for the tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderLanguageFields("timeEvent", "Time Event")}
        {renderLanguageFields("countPeople", "Count People")}
        {renderLanguageFields("age", "Age")}
        {renderLanguageFields("flight", "Flight")}
        {renderLanguageFields("transport", "Transport")}
        {renderLanguageFields("accommodation", "Accommodation")}
        <Inputs
          formData={formData.Includes}
          name="Includes"
          onBackStep={onBackStep}
          onNextStep={onNextStep}
        />
        <Inputs
          formData={formData.Excludes}
          name="Excludes"
          onBackStep={onBackStep}
          onNextStep={onNextStep}
        />
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
}
