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

const Tours = () => {
  const [tours, setTours] = useState<tourtype[]>([]);

  const handleDelete = async (id: string) => {
    try {
      const tourRef = doc(DB, "tours", id);
      await deleteDoc(tourRef);
      setTours(tours.filter((tour) => tour.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

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

  return (
    <div>
      <DialogCloseButton title="Add Tour">
        <CreateTourForm />
      </DialogCloseButton>
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Tours</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tours.map((tour: tourtype) => (
            <div key={tour.id} className="p-4 border rounded-lg shadow">
              <img
                width={200}
                src={tour.image}
                alt={tour.title}
                className="w-[300px] mt-2"
              />
              <h2 className="text-lg font-semibold">{tour.title}</h2>
              <p>Price: ${tour.price}</p>
              <p>Location: {tour.location}</p>
              <p>Season: {tour.season}</p>
              <p>Duration: {tour.duration}</p>
              <div className="flex mt-2 space-x-2">
                <Button
                  onClick={() => handleDelete(tour.id)}
                  className="w-full bg-red-600"
                >
                  <MdDelete />
                </Button>
                <DialogCloseButton title="Edit">
                  <EditTourForm tour={tour} />
                </DialogCloseButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;
