import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
// import { TourAboutDetailsForm } from "./TourAboutDetails";
// import TourExpensesForm from "./TourExpenses";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TourAboutDetailsForm } from "./TourAboutDetails";
import { DaysProgramInputs } from "./TourExpenses";

import TourPlanForm from "./TourPlan";

import { TourProgramDescriptionForm } from "./TourProgramDescription";

export function CreateTours() {
  const methods = useForm();
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isExpensesDialogOpen, setIsExpensesDialogOpen] = useState(false);
  // const [tourDetails, setTourDetails] = useState({});

  const onSubmit = (data: any) => {
    const combinedData = {
      ...data,
    };
    console.log("Combined Form Data:", combinedData);
  };

  React.useEffect(() => {
    methods.reset({});
  }, [methods.reset]);

  // const handleTourDetailsSubmit = (data: any) => {
  //   setTourDetails(data);
  //   setIsAboutDialogOpen(false); // Dialogni yopish
  // };

  // const handleTourExpensesSubmit = (data: any) => {
  //   setTourExpenses(data);
  //   setIsExpensesDialogOpen(false); // Dialogni yopish
  // };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-10"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {/* <TourMainData /> */}

        <TourPlanForm onNextStep={() => {}} onBackStep={() => {}} />
        <TourProgramDescriptionForm
          onNextStep={() => {}}
          onBackStep={() => {}}
        />
        <DaysProgramInputs
          name="Days"
          onNextStep={() => {}}
          onBackStep={() => {}}
        />
        <TourAboutDetailsForm onSubmitData={() => {}} />
        {/* <Button onClick={onSubmit}>Yuborish</Button> */}
      </form>
    </FormProvider>
  );
}

// import React from "react";

// const CreateTours = () => {
//   return <div></div>;
// };

// export default CreateTours;
