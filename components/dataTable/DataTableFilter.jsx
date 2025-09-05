import { Input } from "@/components/ui/input";

const DataTableFilter = ({ placeholder, table, column }) => {
  return (
    <Input
      placeholder={placeholder}
      className="max-w-xs input-class"
      value={table.getColumn(column)?.getFilterValue() ?? ""}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
    />
  );
};

export default DataTableFilter;
