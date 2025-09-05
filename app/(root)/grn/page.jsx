import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import DataTable from "./data-table";

const page = () => {
  return (
    <section>
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <main className="no-scrollbar flex w-full p-2">
        <div className="w-full h-full">
          <div className="py-4">
            <h1 className="font-bold text-3xl">Good Receive Note</h1>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-end">
              <Link href="/grn/new">
                <Button className="w-full rounded-[20px] h-[40px]">
                  <CirclePlusIcon className="w-6 h-6" />
                  Add New GRN
                </Button>
              </Link>
            </div>

            <div className="flex-2">
              <DataTable />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default page;
