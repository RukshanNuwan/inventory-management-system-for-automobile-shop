import { Button } from "@/components/ui/button";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";

const CustomTableFooter = ({ table }) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex-1 text-sm text-gray-500">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <>
        <Button
          variant="outline"
          size="sm"
          className="bg-zinc-100 rounded-[20px] h-[40px]"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftCircleIcon />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-zinc-100 rounded-[20px] h-[40px]"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRightCircleIcon />
        </Button>
      </>
    </div>
  );
};

export default CustomTableFooter;
