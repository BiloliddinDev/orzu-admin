import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import image from "/image/logo.png";
import { NavLink } from "react-router-dom";
import { items } from "@/constants/navbar";
import { FaTelegramPlane } from "react-icons/fa"; // Importing the Telegram icon
import { BiSupport } from "react-icons/bi";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row items-center gap-1 my-8">
            <img width={50} height={50} src={"/image/logo.png"} alt="" />
            <span className="text-base">Orzu Travel Admin</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="px-3 py-5 text-lg" asChild>
                    <NavLink to={item.url}>
                      <item.icon fontSize={30} className="text-amber-500" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="flex items-center gap-2 p-4 mt-8 bg-gray-100 rounded-lg shadow-md">
        <BiSupport fontSize={24} className="text-amber-500" />
        <a
          href="https://t.me/Biloliddin_Dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-amber-500 hover:underline"
        >
          Contact Support
        </a>
      </div>
    </Sidebar>
  );
}
