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
