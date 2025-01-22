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
import TourExpensesForm from "./TourExpenses";
import TourMainDetails from "./TourMainDetails";
import TourPlanForm from "./TourPlan";
import { TourProgramDescriptionForm } from "./TourProgramDescription";



export function CreateTours() {
  const methods = useForm();
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isExpensesDialogOpen, setIsExpensesDialogOpen] = useState(false);
  const [tourDetails, setTourDetails] = useState({});
  const [tourExpenses, setTourExpenses] = useState([]);

  const onSubmit = (data: any) => {
    const combinedData = {
      ...data,
      tourDetails,
      tourExpenses,
    };
    console.log("Combined Form Data:", combinedData);
  };

  React.useEffect(() => {
    methods.reset({
      ism: "John",
      familiya: "Doe",
      email: "john@example.com",
      telefon: "+998901234567"
    })
  }, [methods.reset])

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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* <Card className="p-6 rounded-lg shadow-lg">
          <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mb-4">
                Open Tour About Details Form
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tour About Details</DialogTitle>
              </DialogHeader>
              <TourAboutDetailsForm onSubmitData={handleTourDetailsSubmit} />
            </DialogContent>
          </Dialog>

          <Dialog
            open={isExpensesDialogOpen}
            onOpenChange={setIsExpensesDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="mb-4">
                Open Tour Expenses Form
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tour Expenses</DialogTitle>
              </DialogHeader>
              <TourExpensesForm onSubmitData={handleTourExpensesSubmit} />
            </DialogContent>
          </Dialog>

          <Button type="submit" className="mt-4">
            Submit Main Form
          </Button>
        </Card> */}
        <TourAboutDetailsForm onSubmitData={() => { }} />
        <TourExpensesForm onSubmitData={() => { }} />
        {/* <TourMainDetails /> */}
        <TourPlanForm onNextStep={() => { }} onBackStep={() => { }} />
        <TourProgramDescriptionForm onNextStep={() => { }} onBackStep={() => { }} />
      </form>
    </FormProvider>
  );
}

// import React from "react";

// const CreateTours = () => {
//   return <div></div>;
// };

// export default CreateTours;
