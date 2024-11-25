import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="mt-2 ml-1">
        <SidebarTrigger className="border mb-2" />
        {children}
      </main>
    </SidebarProvider>
  );
}
