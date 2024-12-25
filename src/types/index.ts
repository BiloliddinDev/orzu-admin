import { title } from "process";
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
  city: string;
  price: string;
  season: "Summer" | "Winter" | "Spring" | "Autumn";
  title: string;
}

export interface toursmain {
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  time: string;
  transport: string;
  accommodation: string;
  productId: string;
  id?: string;
}

export interface ProductType {
  id: string;
  image: "";
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  season: {
    unitLabelUz: "Yoz" | "Qish" | "Bahor" | "Kuz";
    unitLabelRu: "Лето" | "Зима" | "Весна" | "Осень";
    unitLabelEn: "Summer" | "Winter" | "Spring" | "Autumn";
  };
  duration: {
    uz: string;
    ru: string;
    en: string;
  };
  price: number;
}
export interface categorytype {
  id: any;
  title: string;
  description: string;
  titleen: string;
  titleru: string;
  titleuz: string;
}

export interface Blogstype {
  id?: string | any;
  createdAt: Date | string;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  image: string;
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
