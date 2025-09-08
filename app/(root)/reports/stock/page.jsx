import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useRef, useState } from "react";

const page = () => {
  const [searchText, setSearchText] = useState("");

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({})

  return (
    <section>
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <main className="no-scrollbar flex w-full p-2">
        <div className="w-full h-full">
          <div className="py-4">
            <h1 className="font-bold text-3xl">Stock Details</h1>
            <p className="text-sm text-muted-foreground">
              View stock details for your inventory.
            </p>
          </div>
        </div>
      </main>

      <div className="p-2 w-full">
        {/* All items and their stock levels */}
        DATA_TABLE
      </div>
    </section>
  );
};

export default page;
