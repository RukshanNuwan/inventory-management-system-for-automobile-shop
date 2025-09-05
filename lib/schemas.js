import z from "zod";

const issueNoteFormSchema = z.object({
  item: z.any().optional(),
  stock: z.string().optional(),
  quantity: z.string().optional(),
  price: z.string().optional(),
  customer: z.string().optional(),
  issued_date: z.any().optional(),
});

const supplierFormSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contact_number: z.string().optional(),
  email_address: z.string().optional(),
  remarks: z.string().optional(),
});

const itemFormSchema = z.object({
  item_name: z.string().optional(),
  part_number: z.string().optional(),
  re_order_point: z.string().optional(),
  rack_number: z.string().optional(),
  item_code: z.string().optional(),
  item_description: z.string().optional(),
});

const receiveNoteFormSchema = z.object({
  item: z.any().optional(),
  quantity: z.string().optional(),
  cost_price: z.string().optional(),
  supplier: z.any().optional(),
  invoice_number: z.string().optional(),
  net_value: z.string().optional(),
  grn_date: z.string().optional(),
});

export {
  issueNoteFormSchema,
  itemFormSchema,
  receiveNoteFormSchema,
  supplierFormSchema,
};
