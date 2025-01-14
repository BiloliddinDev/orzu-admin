import CreateTourForm from "@/components/shared/creadtedtour";
import { DialogCloseButton } from "@/components/shared/producmodal";
import React, { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { tourtype } from "@/types";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { Pen } from "lucide-react";
import EditTourForm from "@/components/shared/updatetour";
import { GrLocation } from "react-icons/gr";
import { MdAttachMoney } from "react-icons/md";
import { RiTreeLine } from "react-icons/ri";
import { GiDuration } from "react-icons/gi";
import { SiTourbox } from "react-icons/si";

const Tours = () => {
  const [tours, setTours] = useState<tourtype[]>([]);


  useEffect(() => {
    const fetchTours = async () => {
      const querySnapshot = await getDocs(collection(DB, "tours"));
      const toursData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTours(toursData);
    };

    fetchTours();
  }, []);
  console.log(tours);


  const handleDelete = async (id: string) => {
    try {
      const tourRef = doc(DB, "tours", id);
      await deleteDoc(tourRef);
      setTours(tours.filter((tour) => tour.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="mb-4 text-2xl font-bold">Tours</h1>
          <DialogCloseButton title="Add Tour">
            <CreateTourForm />
            <Button type="button">Close</Button>
          </DialogCloseButton>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {tours?.map((tour) => (
            <div key={tour.id} className="border shadow  rounded-xl">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-[200px] rounded-t-xl mb-2"
              />
              <div className="p-4">
                {" "}
                <h2 className="text-lg font-semibold">{tour.title}</h2>
                <div className="flex flex-row justify-between">
                  <div>
                    <GrLocation className="inline" /> {tour.location}
                  </div>
                  <div>
                    <MdAttachMoney className="inline" />
                    {tour.price}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    <RiTreeLine className="inline" /> {tour.season}
                  </div>
                  <p>{tour.duration}</p>
                </div>
                <div>
                  <SiTourbox className="inline" /> {tour.category}
                </div>
                {/* <p>
                  {tour.about.map((i: string) => (
                    <span key={i}>{i}, </span>
                  ))}
                </p> */}
                <div className="flex mt-2 space-x-2">
                  <Button
                    onClick={() => handleDelete(tour.id)}
                    className="w-full bg-main-300"
                  >
                    <MdDelete />
                  </Button>
                  <DialogCloseButton title="Edit">
                    <EditTourForm tour={tour} />
                  </DialogCloseButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;
