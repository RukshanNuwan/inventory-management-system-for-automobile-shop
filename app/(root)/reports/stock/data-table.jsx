"use client";

import { CustomDataTable } from "@/components/CustomDataTable";
import { getAllItemsWithoutStatus } from "@/lib/actions/item.actions";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllItemsWithoutStatus((data) => {
      if (data.length > 0) setData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <CustomDataTable
      columns={columns}
      data={data}
      column="item_name"
      placeholder="Search by Item Name"
    />
  );
};

export default DataTable;
