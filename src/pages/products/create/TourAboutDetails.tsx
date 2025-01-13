import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

type FormValues = {
  title: { uz: string; ru: string; en: string };
  description: { uz: string; ru: string; en: string };
  countryName: { uz: string; ru: string; en: string };
  language: { uz: string; ru: string; en: string };
  currency: { uz: string; ru: string; en: string };
  map: string;
};

interface TourAboutDetailsFormProps {
  onSubmitData: (data: FormValues) => void;
}

export function TourAboutDetailsForm({
  onSubmitData,
}: TourAboutDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormContext<FormValues>();

  const onSubmit = () => {
    const data = getValues();
    console.log("Collected Data:", data);
    onSubmitData(data); // Send data to the main form
  };

  const renderInputFields = (fieldKey: keyof FormValues, label: string) =>
    ["uz", "ru", "en"].map((lang) => (
      <div key={`${fieldKey}-${lang}`} className="space-y-2">
        <Label htmlFor={`${fieldKey}-${lang}`}>
          {label} ({lang.toUpperCase()})
        </Label>
        <Input
          id={`${fieldKey}-${lang}`}
          placeholder={`Enter ${label.toLowerCase()} in ${lang.toUpperCase()}`}
          {...register(`${fieldKey}.${lang}` as any, {
            required: "This field is required",
          })}
        />
        {(errors as any)[fieldKey]?.[lang] && (
          <span className="text-sm text-red-500">
            {(errors as any)[fieldKey]?.[lang]?.message}
          </span>
        )}
      </div>
    ));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Tour About Details</CardTitle>
        <CardDescription>
          Fill in the about details for the tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {renderInputFields("title", "Title")}
        {renderInputFields("description", "Description")}
        {renderInputFields("countryName", "Country Name")}
        {renderInputFields("language", "Language")}
        {renderInputFields("currency", "Currency")}
        <div className="space-y-2">
          <Label htmlFor="map">Map URL</Label>
          <Input
            id="map"
            placeholder="Enter map URL"
            {...register("map", { required: "This field is required" })}
          />
          {(errors as any).map && (
            <span className="text-sm text-red-500">
              {(errors as any).map.message}
            </span>
          )}
        </div>
      </CardContent>
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </Card>
  );
}
