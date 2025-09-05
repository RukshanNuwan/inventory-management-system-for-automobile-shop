"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertFirestoreTimestampToString } from "@/lib/utils";
import React from "react";
import { useSelector } from "react-redux";

const Section = ({ title, items }) => {
  return (
    <>
      <h2 className="text-[22px] font-bold px-4 pb-2 pt-4">{title}</h2>
      <div className="p-2 grid grid-cols-[20%_1fr] gap-x-6">
        {items.map(([label, value], i) => (
          <div
            key={i}
            className="col-span-2 grid grid-cols-subgrid border-t border-[#dbe0e6] py-5"
          >
            <p className="text-sm text-[#60758a]">{label}</p>
            <p className="text-sm text-[#111418]">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const page = () => {
  const selectedItem = useSelector((state) => state.data.selectedItem);

  console.log("Selected Item:", selectedItem);

  return (
    <section>
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <div className="flex flex-col w-full flex-1 p-10">
        <h2 className="text-[22px] font-bold px-4 pb-2 pt-4">Issued Item(s)</h2>

        <Table className="rounded-xl border shadow-sm">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedItem.issuedItems.map((item, index) => (
              <TableRow
                key={item.item_id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{item.item_name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {Number(item.price).toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {Number(item.value).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <TableRow className="bg-gray-100 font-bold">
              <TableCell colSpan={4} className="text-right">
                Total
              </TableCell>
              <TableCell className="text-right">
                {selectedItem.issuedItems
                  .reduce((sum, i) => sum + Number(i.value), 0)
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>

        <Section
          title="Other Information"
          items={[
            ["Date", new Date(selectedItem.issued_date).toLocaleDateString()],
            ["Customer", selectedItem.customer],
            ["Status", selectedItem.status],
            [
              "Added At",
              convertFirestoreTimestampToString(selectedItem.added_at),
            ],
          ]}
        />
      </div>
    </section>
  );
};

export default page;
