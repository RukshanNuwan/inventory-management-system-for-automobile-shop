"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { convertFirestoreTimestampToString } from "@/lib/utils";
import Image from "next/image";
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

  return (
    <section>
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <div className="flex flex-col w-full flex-1 p-10">
        <div className="p-2">
          <div className="flex-1 rounded-lg overflow-hidden">
            <Image
              src="/item.jpg"
              alt="Item"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
        </div>

        <Section
          title="Contact Information"
          items={[
            ["Part Number", selectedItem.part_number],
            ["Item Name", selectedItem.item_name],
            ["Item Code", selectedItem.item_code],
            ["Re-Order Point", selectedItem.re_order_point],
            ["Stock", selectedItem.stock],
            ["Rack Number", selectedItem.rack_number],
          ]}
        />

        <Section
          title="Other Information"
          items={[
            ["Status", selectedItem.status],
            ["Description", selectedItem.item_description],
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
