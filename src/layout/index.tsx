import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full mt-2">
        <SidebarTrigger className="mb-2 border " />
        <div className="ml-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
