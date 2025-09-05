import { SidebarTrigger } from "@/components/ui/sidebar";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <section>
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <main className="no-scrollbar flex w-full p-2">
        <div className="w-full h-full">Home Page</div>
      </main>
    </section>
  );
}
