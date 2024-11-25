export interface tourtype {
  id: any;
  createdAt: Date;
  description: string;
  duration: string;
  image: string;
  location: string;
  price: number;
  season: "Summer" | "Winter" | "Spring" | "Autumn";
  title: string;
}
<<<<<<< HEAD
export interface categorytype {
  id: any;
  description: string;
=======

export interface Blogstype {
  id?: any;
  createdAt: Date | string;
  description: string;
  image: string;
  season: string;
>>>>>>> 95e93b3e07aef95dfbd13fcc75108221bdecf14f
  title: string;
}
