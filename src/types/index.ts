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

export interface Blogstype {
  id?: any;
  createdAt: Date | string;
  description: string;
  image: string;
  season: string;
  title: string;
}
