import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useFormContext, useFieldArray, FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";
import { Inputs } from "./Inputs";

interface TourPlanFormProps {
  onNextStep: () => void;
  onBackStep: () => void;
  formData: any;
}

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
        name={"Description"}
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
