import { clsx } from "clsx";
import { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

// import qs from "query-string";
// import { z } from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// CONVERT FIRESTORE TIMESTAMP TO STRING
export const convertFirestoreTimestampToString = (timestamp) => {
  if (!timestamp) return "";
  const date = new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

// GET MONTH BEFORE DATE
export const getMonthBeforeDate = () => {
  const now = Timestamp.now();
  return new Timestamp(
    now.seconds - 60 * 60 * 24 * 30, // 1 month
    now.nanoseconds
  );
};

// GET WEEK BEFORE DATE
export const getWeekBeforeDate = () => {
  const now = Timestamp.now();
  return new Timestamp(
    now.seconds - 60 * 60 * 24 * 7, // 1 week
    now.nanoseconds
  );
};

// FORMAT QUANTITY
export function formatQuantity(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "kilogram",
    // minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

// CALCULATE TIME DIFFERENCE
export const calculateTimeDifference = (startTime, endTime) => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};

export const handleExportToExcel = (tableId, date, fileName) => {
  const table = document.getElementById(tableId);
  const workbook = XLSX.utils.table_to_book(table, {
    sheet: `${date}`,
  });
  XLSX.writeFile(workbook, `${date} ${fileName}.xlsx`);
};
