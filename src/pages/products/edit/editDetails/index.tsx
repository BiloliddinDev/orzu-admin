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

import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { DB } from "@/api/firebase";
import { toast } from "react-toastify";

export function EditTourDetails() {
  const navigate = useNavigate();
  const methods = useForm();
  const [formData, setFormData] = useState<any>({});

  const { id } = useParams();

  useEffect(() => {
    const addDetails = async (productId: any) => {
      // console.log("Form data: ", formData);

      if (!productId) {
        toast.error("Invalid form data");
        return;
      }
      try {
        const docRef = doc(DB, "tourss", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const tourData: any = {
            id: docSnap.id,
            ...docSnap.data().details,
          };
          setFormData(tourData);
          console.log("Tour data >>>", formData);
        }

        // toast.success("Document successfully written!");
        // navigate("/tours");
      } catch (error) {
        toast.error("Error writing document: ");
      } finally {
      }
    };
    addDetails(id);
  }, []);
  const onSubmit = (data: any) => {
    if (!id) {
      console.error("Product ID is missing");
      return; // Return early if `id` is missing
    }
    const combinedData = {
      ...formData,
    };
    // console.log(id);

    console.log("Combined Form Data in index hellooooo:", combinedData);

    // const addDetails = async (productId: any) => {
    //   // console.log("Form data: ", formData);

    //   if (!productId || !combinedData) {
    //     toast.error("Invalid form data");
    //     return;
    //   }
    //   try {
    //     const docRef = doc(DB, "tourss", productId);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       const tourData: any = {
    //         id: docSnap.id,
    //         ...docSnap.data(),
    //       };

    //       console.log("Tour data >>>", tourData);
    //       await updateDoc(docRef, {
    //         ...tourData,
    //         details: combinedData,
    //       });
    //     }
    //     console.log("Document reference: ", docRef);

    //     console.log("Document written with ID: ", docRef.id, combinedData);

    //     toast.success("Document successfully written!");
    //     navigate("/tours");
    //   } catch (error) {
    //     toast.error("Error writing document: ");
    //   } finally {
    //   }
    // };
    // addDetails(id);
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
        <TourPlanForm
          formData={formData}
          onNextStep={() => {}}
          onBackStep={() => {}}
        />
        <TourProgramDescriptionForm
          formData={formData}
          onNextStep={() => {}}
          onBackStep={() => {}}
        />
        <DaysProgramInputs
          formData={formData}
          name="Days"
          onNextStep={() => {}}
          onBackStep={() => {}}
        />
        <TourAboutDetailsForm formData={formData} onSubmitData={() => {}} />

        <DetailedObzor
          formData={formData}
          name="DaysWithHours"
          onNextStep={() => {}}
          onBackStep={() => {}}
        />
      </form>
    </FormProvider>
  );
}
