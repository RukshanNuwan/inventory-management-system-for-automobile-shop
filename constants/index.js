import {
  FileChartLine,
  FileInput,
  FileOutput,
  ListTodo,
  Users,
} from "lucide-react";

const sidebarSalesItems = [
  {
    title: "GIN",
    url: "/gin",
    icon: FileOutput,
  },
  // {
  //   title: "Returns",
  //   url: "/return",
  //   icon: RotateCcw,
  // },
];

const sidebarInventoryItems = [
  {
    title: "GRN",
    url: "/grn",
    icon: FileInput,
  },
  {
    title: "Items",
    url: "/items",
    icon: ListTodo,
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: Users,
  },
];

const sidebarReportItems = [
  {
    title: "Stock Report",
    url: "/reports/stock",
    icon: FileChartLine,
  },
  {
    title: "Sales Report",
    url: "/reports/sales",
    icon: FileChartLine,
  },
];

export { sidebarInventoryItems, sidebarReportItems, sidebarSalesItems };
