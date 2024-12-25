import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToursDataMain from "./main";
import ToursDetelAbout from "./about";
import ToursDetelDays from "./days";

export function ToursDetel() {
  return (
    <Tabs defaultValue="home" className="w-full">
      <TabsList className="flex justify-around p-2 bg-gray-100">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>

      <TabsContent value="home">
        <ToursDataMain />
      </TabsContent>

      <TabsContent value="about">
        <ToursDetelAbout />
      </TabsContent>

      <TabsContent value="services">
        <ToursDetelDays />
      </TabsContent>

      <TabsContent value="contact"></TabsContent>
    </Tabs>
  );
}
