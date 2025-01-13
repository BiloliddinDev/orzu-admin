import { Button } from "@/components/ui/button";
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
import { TourProgramDescription } from "@/types";
import { useState } from "react";

type Language = "uz" | "ru" | "en";

export function TourProgramDescriptionForm({
  onNextStep,
  onBackStep,
}: {
  onNextStep: () => void;
  onBackStep: () => void;
}) {
  const [formData, setFormData] = useState<TourProgramDescription>({
    title: { uz: "", ru: "", en: "" },
    countPeople: { uz: "", ru: "", en: "" },
    timeEvent: { uz: "", ru: "", en: "" },
    transport: { uz: "", ru: "", en: "" },
    accommodation: { uz: "", ru: "", en: "" },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof TourProgramDescription, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const languages: Language[] = ["uz", "ru", "en"];

    languages.forEach((lang) => {
      if (!formData.title[lang]) {
        newErrors[
          `title.${lang}`
        ] = `Title in ${lang.toUpperCase()} is required.`;
      }
      if (!formData.countPeople[lang]) {
        newErrors[
          `countPeople.${lang}`
        ] = `Count of people in ${lang.toUpperCase()} is required.`;
      }
      if (!formData.timeEvent[lang]) {
        newErrors[
          `timeEvent.${lang}`
        ] = `Time event in ${lang.toUpperCase()} is required.`;
      }
      if (!formData.transport[lang]) {
        newErrors[
          `transport.${lang}`
        ] = `Transport in ${lang.toUpperCase()} is required.`;
      }
      if (!formData.accommodation[lang]) {
        newErrors[
          `accommodation.${lang}`
        ] = `Accommodation in ${lang.toUpperCase()} is required.`;
      }
    });

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
      onNextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  const renderLanguageFields = (
    fieldKey: keyof TourProgramDescription,
    label: string
  ) =>
    (Object.keys(formData[fieldKey]) as Language[]).map((lang) => (
      <div key={`${fieldKey}-${lang}`} className="space-y-2">
        <Label htmlFor={`${fieldKey}-${lang}`}>
          {label} ({lang.toUpperCase()})
        </Label>
        <Input
          id={`${fieldKey}-${lang}`}
          placeholder={`Enter ${label.toLowerCase()} in ${lang.toUpperCase()}`}
          value={(formData[fieldKey] as Record<Language, string>)[lang]}
          onChange={(e) =>
            handleChange(fieldKey, {
              ...(formData[fieldKey] as Record<Language, string>),
              [lang]: e.target.value,
            })
          }
        />
        {errors[`${fieldKey}.${lang}`] && (
          <span className="text-sm text-red-500">
            {errors[`${fieldKey}.${lang}`]}
          </span>
        )}
      </div>
    ));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Tour Program Description</CardTitle>
        <CardDescription>
          Fill in the program description details for the tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderLanguageFields("title", "Title")}
        {renderLanguageFields("countPeople", "Count People")}
        {renderLanguageFields("timeEvent", "Time Event")}
        {renderLanguageFields("transport", "Transport")}
        {renderLanguageFields("accommodation", "Accommodation")}
      </CardContent>
      <CardFooter className="gap-2">
        <Button size={"lg"} onClick={handleSubmit}>
          Next
        </Button>
        <Button size={"lg"} variant={"outline"} onClick={onBackStep}>
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}
