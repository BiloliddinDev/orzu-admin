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
import { DialogCloseButton } from "@/components/shared/producmodal";

const TourMainDetails = ({ modal }: any) => {
  const [tours, setTours] = useState<TourMainDetailsType[]>();
  const handleDelete = async (id: string) => {
    try {
      const tourRef = doc(DB, "tourss", id);
      await deleteDoc(tourRef);
      setTours(tours?.filter((blog) => blog.id !== id));
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
  }, [modal]);
  console.log(tours);

  return (
    <div className="flex w-full items-center justify-start  md:flex-row   flex-wrap p-5">
      {/* <button
        onClick={handleDeleteAll}
        className="mx-auto my-10 fixed -top-7 left-[30%] z-50 bg-red-700 p-6"
      >
        delete all
      </button> */}
      {tours?.map((element) => (
        <div className="p-3 w-full md:w-[50%] xl:w-[33%]"> <div
          key={element.id}
          className="   p-2 transition-shadow duration-300 border shadow-md hover:shadow-lg"
        >
          <img
            src={element.image}
            alt={element.title.uz}
            className="object-cover w-full h-60 mb-4 rounded-md cursor-pointer"
          />
          <CardHeader className="p-0 m-0">
            <CardTitle className="text-xl lg:h-[55px] mb-2 p-0 font-bold text-center line-clamp-1 md:line-clamp-4">
              {element.title.ru}
            </CardTitle>
            <CardTitle className="text-lg max-w-[100%] font-normal mx-3   my-2 p-0  text-center">
              <div className="flex mt-2 border-b border-black pb-2 w-full justify-between">
                <p>Стоимость</p>
                <p>{element?.price}$</p>
              </div>
              <div className="flex mt-2 border-b border-black pb-2 w-full justify-between">
                <p>Длительность</p>
                <p>{element?.duration.ru}</p>
              </div>
              <div className="flex mt-2 items-center border-b border-black pb-2 w-full justify-between">
                <p>Период:</p>

                <div>{element.season.ru}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-3  gap-1  mt-4 ">
              {!element.details && (
                <Link to={`create/${element.id}`}>
                  <Button className="w-full bg-main-200 text-white rounded-md p-2">
                    Add Details
                  </Button>
                </Link>
              )}
              {element.details && (
                <Link to={`detailsedit/${element.id}`}>
                  <Button className="bg-main-200 text-white rounded-md p-2 w-full">
                    Edit Details
                  </Button>
                </Link>
              )}
              <Link to={`edit/${element.id}`}>
                <Button className="bg-green-400 text-white rounded-md p-2 w-full">
                  Edit
                </Button>
              </Link>

              <DialogCloseButton title={"Delete"}>
                <h2 className="text-red-400">
                  Do you want to delete {element.title.ru} tour
                </h2>
                <Button
                  className="my-3  bg-red-600 p-3 w-full"
                  onClick={() => handleDelete(element.id)}
                >
                  Delete
                </Button>
              </DialogCloseButton>
            </div>
          </CardContent>
        </div></div>
      ))}
    </div>
  );
};

export default TourMainDetails;
