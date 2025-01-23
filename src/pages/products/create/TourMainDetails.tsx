import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { DB, RealtimeDB } from "@/api/firebase";
import { TourMainDetailsType } from "@/types";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";

const TourMainDetails = () => {
  const [tours, setTours] = useState<TourMainDetailsType[]>();
  const handleDelete = async (id: string) => {
    try {
      const tourRef = doc(DB, "tourss", id);
      await deleteDoc(tourRef);
      setTours(tours?.filter((blog) => blog.id == ""));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const handleDeleteAll = async () => {
    try {
      const querySnapshot = await getDocs(collection(DB, "tourss"));
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
      setTours([]);
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };
  useEffect(() => {
    const fetchTours = async () => {
      const querySnapshot = await getDocs(collection(DB, "tourss"));
      const toursData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTours(toursData);
    };

    fetchTours();
  }, []);
  console.log(tours);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
      <button
        onClick={handleDeleteAll}
        className="mx-auto my-10 fixed -top-7 left-[30%] z-50 bg-red-700 p-6"
      >
        delete all
      </button>
      {tours?.map((element) => (
        <Link
          to={`create/${element.id}`}
          key={element.id}
          className="flex flex-col items-center p-2 transition-shadow duration-300 border shadow-md hover:shadow-lg"
        >
          <img
            src={element.image}
            alt={element.title.uz}
            className="object-cover w-full h-48 mb-4 rounded-md cursor-pointer"
          />
          <CardHeader>
            <CardTitle className="text-lg font-bold text-center">
              {element?.title.uz}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">{element.duration.uz}</p>
            <p className="text-lg font-semibold text-gray-800">
              ${element.price}
            </p>
            <p>
              {element.season.map((elem: string) => (
                <div>{elem}</div>
              ))}
            </p>
            <p>{element.description.uz}</p>
            <Button
              className="my-5 bg-red-600 p-5"
              onClick={() => handleDelete(element.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Link>
      ))}
    </div>
  );
};

export default TourMainDetails;
