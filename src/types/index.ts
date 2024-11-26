export interface tourtype {
  id: any;
  createdAt: Date;
  description: string;
  category: string;
  duration: string;
  image: string;
  about: string[];
  location: string;
  price: string;
  season: "Summer" | "Winter" | "Spring" | "Autumn";
  title: string;
}
export interface categorytype {
  id: any;
  title: string;
  description: string;
}

export interface Blogstype {
  id?: any;
  createdAt: Date | string;
  description: string;
  image: string;
  title: string;
  season: string;
}
