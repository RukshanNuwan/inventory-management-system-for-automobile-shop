/* eslint-disable @typescript-eslint/no-explicit-any */

import { TableCell, TableRow } from "@/components/ui/table";

const CustomNoResultRow = ({ columns }) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

export default CustomNoResultRow;
