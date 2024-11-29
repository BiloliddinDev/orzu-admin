import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

export interface authtype {
  email: string;
  password: string;
}

export const schema = yup
  .object({
    email: yup.string().required().min(5, {
      message: "Email must be at least 5 characters.",
    }),
    password: yup.string().required().min(8, {
      message: "Password must be at least 5 characters.",
    }),
  })
  .required();
