import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";

import { TourAboutDetailsForm } from "./TourAboutDetails";
import { DaysProgramInputs } from "./TourExpenses";

import TourPlanForm from "./TourPlan";
import { DetailedObzor } from "./DetailedObzor";

import { TourProgramDescriptionForm } from "./TourProgramDescription";
import { getDatabase, ref, set, update } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "http";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { DB } from "@/api/firebase";
import { toast } from "react-toastify";

export function CreateTours() {
  const navigate = useNavigate();
  const methods = useForm();
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isExpensesDialogOpen, setIsExpensesDialogOpen] = useState(false);
  const { id } = useParams();

  const onSubmit = (data: any) => {
    if (!id) {
      console.error("Product ID is missing");
      return; // Return early if `id` is missing
    }
    const combinedData = {
      ...data,
    };
    // console.log(id);

    console.log("Combined Form Data in index hellooooo:", combinedData);

    const addDetails = async (productId: any) => {
      // console.log("Form data: ", formData);

      if (!productId || !combinedData) {
        toast.error("Invalid form data");
        return;
      }
      try {
        const docRef = doc(DB, "tourss", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const tourData: any = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          console.log("Tour data >>>", tourData);
          await updateDoc(docRef, {
            ...tourData,
            details: combinedData,
          });
        }
        console.log("Document reference: ", docRef);

        console.log("Document written with ID: ", docRef.id, combinedData);

        toast.success("Document successfully written!");
        navigate("/tours");
      } catch (error) {
        toast.error("Error writing document: ");
      } finally {
      }
    };
    addDetails(id);
  };

  React.useEffect(() => {
    methods.reset({});
  }, [methods.reset]);

  // Example usage: Fetch product with ID "1"

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

        <DetailedObzor
          name="DaysWithHours"
          onNextStep={() => {}}
          onBackStep={() => {}}
        />
      </form>
    </FormProvider>
  );
}
