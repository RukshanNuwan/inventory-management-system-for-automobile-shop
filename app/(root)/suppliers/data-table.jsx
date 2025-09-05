"use client";

import { columns } from "@/app/(root)/suppliers/columns";
import { CustomDataTable } from "@/components/CustomDataTable";
import { getAllSuppliers } from "@/lib/actions/supplier.actions";
import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllSuppliers((data) => {
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
      column="name"
      placeholder="Search by name"
    />
  );
};

export default DataTable;
