import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Auth } from "@/api/firebase";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import image from "/public/image/logo.png";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { authtype, schema } from "@/types";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: authtype) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        Auth,
        email,
        password
      );
      navigate("/tours");
      console.log("User signed in:", userCredential.user);
      toast.success("Welcome to Orzu Travel Admin panel !");
      localStorage.setItem("token", userCredential.user.refreshToken);
    } catch (error: any) {
      console.error("Error signing in:");
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <img src={image} width={100} height={100} alt="" />
      <h1 className="mt-2 text-3xl font-bold text-orange-500">Orzu Admin</h1>
      <form className="space-y-4 w-96" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input id="email" {...field} />}
        />

        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input id="password" {...field} />}
        />

        <Button className="w-full">Add user</Button>
      </form>
    </div>
  );
};

export default Login;
