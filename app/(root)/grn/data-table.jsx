"use client";

import { columns } from "@/app/(root)/grn/columns";
import { CustomDataTable } from "@/components/CustomDataTable";
import { getAllGrn } from "@/lib/actions/grn.actions";
import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllGrn((data) => {
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
      column="invoice_number"
      placeholder="Search by Invoice Number"
    />
  );
};

export default DataTable;
