"use client";

import { columns } from "@/app/(root)/gin/columns";
import { CustomDataTable } from "@/components/CustomDataTable";
import { getAllGin } from "@/lib/actions/gin.actions";
import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllGin((data) => {
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
      column="customer"
      placeholder="Search by Customer"
    />
  );
};

export default DataTable;
