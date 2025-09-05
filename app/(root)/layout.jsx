import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const loggedUser = await currentUser();

  if (!loggedUser) redirect("/sign-in");

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex size-full flex-col">{children}</div>
    </SidebarProvider>
  );
};

export default layout;
