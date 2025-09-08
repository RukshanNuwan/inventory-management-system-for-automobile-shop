"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table"; // <- your Shadcn DataTable wrapper
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

// Example stock data
const stockData = [
  { id: 1, item: "Coconut Oil", quantity: 120, unit: "Liters" },
  { id: 2, item: "Coconut Milk Powder", quantity: 75, unit: "Kg" },
  { id: 3, item: "Desiccated Coconut", quantity: 200, unit: "Kg" },
  { id: 4, item: "Activated Carbon", quantity: 45, unit: "Kg" },
];

// Define table columns
const columns = [
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("item")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("unit")}</div>
    ),
  },
];

const Page = () => {
  const [search, setSearch] = useState("");
  const printRef = useRef < HTMLDivElement > null;

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Stock Report",
  });

  // Filter data by search term
  const filteredData = useMemo(() => {
    return stockData.filter((s) =>
      s.item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <section>
      {/* Sidebar */}
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <main className="no-scrollbar flex w-full p-2">
        <div className="w-full h-full">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="font-bold text-3xl">Stock Report</h1>
              <p className="text-sm text-muted-foreground">
                Search, view, and print stock details.
              </p>
            </div>
            <Button onClick={handlePrint}>Print PDF</Button>
          </div>
        </div>
      </main>

      {/* Filters */}
      <div className="p-2 flex items-center gap-2">
        <Input
          placeholder="Search item by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
      </div>

      {/* Stock Data Table */}
      <div ref={printRef} className="p-2 w-full">
        <Card>
          <CardContent className="p-4">
            <DataTable columns={columns} data={filteredData} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Page;
