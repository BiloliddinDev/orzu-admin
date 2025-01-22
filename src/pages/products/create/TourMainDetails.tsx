import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { DB, RealtimeDB } from "@/api/firebase";
import { TourMainDetailsType } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const TourMainDetails = () => {
  const [tours, setTours] = useState<TourMainDetailsType[]>();

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

  return (
    <div className="grid grid-cols-1 gap-4 p-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
      {tours?.map((element) => (
        <Link
          to={`/tours/create/${element.id}`}
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
          </CardContent>
        </Link>
      ))}
    </div>
  );
};

export default TourMainDetails;
