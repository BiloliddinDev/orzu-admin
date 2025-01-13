import { title } from "process";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

// tours type

// step 1

export interface TourMainDetailsType {
  id: string;
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
  duration: {
    uz: string;
    ru: string;
    en: string;
  };
  price: number;
  season: "Winter" | "Spring" | "Summer" | "Autumn" | any;
}

// Step 2
export interface TourAboutDetails {
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
  countryName: {
    uz: string;
    ru: string;
    en: string;
  };
  language: {
    uz: string;
    ru: string;
    en: string;
  };
  currency: {
    uz: string;
    ru: string;
    en: string;
  };
  map: string;
}

// Step 3
export interface TourProgramDescription {
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  countPeople: {
    uz: string;
    ru: string;
    en: string;
  };
  timeEvent: {
    uz: string;
    ru: string;
    en: string;
  };
  transport: {
    uz: string;
    ru: string;
    en: string;
  };
  accommodation: {
    uz: string;
    ru: string;
    en: string;
  };
}

// Step 4
export interface TourPlan {
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  }[];
}

// Step 5

export interface TourExpenses {
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
  image: string[];
  text: {
    uz: string;
    ru: string;
    en: string;
  };
  time: string;
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
