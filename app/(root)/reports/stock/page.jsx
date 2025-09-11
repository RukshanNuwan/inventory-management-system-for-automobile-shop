"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useRef } from "react";
import DataTable from "./data-table";

const page = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    console.log("Under Development");
  };

  // const handlePrint = useReactToPrint({
  // content: () => printRef.current,
  // documentTitle: "Stock Report",

  // });

  return (
    <section>
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <main className="no-scrollbar flex w-full p-2">
        <div className="w-full h-full">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="font-bold text-3xl">Stock Details</h1>
              <p className="text-sm text-muted-foreground">
                View stock details for your inventory.
              </p>
            </div>

            <Button onClick={handlePrint}>Print Report</Button>
          </div>
        </div>
      </main>

      <div ref={printRef} className="p-2 w-full">
        <Card>
          <CardContent>
            <DataTable />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default page;
