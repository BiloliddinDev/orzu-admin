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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

type FormValues = {
  title: { uz: string; ru: string; en: string };
  about: { uz: string; ru: string; en: string };
  countryName: { uz: string; ru: string; en: string };
  language: { uz: string; ru: string; en: string };
  currency: { uz: string; ru: string; en: string };
  map: string;
};

interface TourAboutDetailsFormProps {
  onSubmitData: (data: FormValues) => void;
  formData: any;
}

export function TourAboutDetailsForm({
  onSubmitData,
  formData,
}: TourAboutDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<FormValues>();

  const onSubmit = () => {
    const data = getValues();

    onSubmitData(data);
  };
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((key) => {
        const fieldKey = key as keyof FormValues;
        if (formData[fieldKey]) {
          Object.keys(formData[fieldKey]!).forEach((lang) => {
            const fieldPath = `${fieldKey}.${lang}` as keyof FormValues;
            setValue(`${fieldPath}`, formData[fieldKey]?.[lang] || "");
          });
        }
      });
    }
  }, [formData, setValue]);

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
  const renderInputFields2 = (fieldKey: keyof FormValues, label: string) =>
    ["uz", "ru", "en"].map((lang) => (
      <div key={`${fieldKey}-${lang}`} className="space-y-2">
        <Label htmlFor={`${fieldKey}-${lang}`}>
          {label} ({lang.toUpperCase()})
        </Label>
        <Textarea
          rows={5}
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
        {renderInputFields2("about", "About")}
        {renderInputFields("countryName", "Country Name")}
        {renderInputFields("language", "Language")}
        {renderInputFields("currency", "Currency")}
        <div className="space-y-2">
          <Label htmlFor="map">Map URL</Label>
          <Input
            defaultValue={formData?.map}
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
      {/* <Button onClick={handleSubmit(onSubmit)}>Submit</Button> */}
    </Card>
  );
}
