"use client";

import { columns } from "@/app/(root)/items/columns";
import { CustomDataTable } from "@/components/CustomDataTable";
import { getAllItems } from "@/lib/actions/item.actions";
import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllItems((data) => {
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
      column="part_number"
      placeholder="Search by Part Number"
    />
  );
};

export default DataTable;
