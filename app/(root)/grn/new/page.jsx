"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addGrn } from "@/lib/actions/grn.actions";
import { getItems, modifyStock } from "@/lib/actions/item.actions";
import { getSuppliers } from "@/lib/actions/supplier.actions";
import { receiveNoteFormSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [receivedItems, setReceivedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState();
  const [suppliers, setSuppliers] = useState();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(receiveNoteFormSchema),
    defaultValues: {
      item: "",
      quantity: "",
      cost_price: "",
      supplier: "",
      invoice_number: "",
      net_value: "",
      grn_date: "",
    },
  });

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res);
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchSuppliers();
  }, []);

  const handleRemoveItem = (e, index) => {
    setReceivedItems(
      receivedItems.filter((item, i) => {
        return i !== index;
      })
    );
  };

  const totalAmount = receivedItems.reduce(
    (sum, item) => sum + Number(item.cost_price) * Number(item.quantity),
    0
  );

  const onItemDetailsSubmit = (values) => {
    const newItem = {
      item_id: values.item.id,
      item_name: values.item.item_name,
      quantity: values.quantity,
      cost_price: values.cost_price,
      value: Number(values.quantity) * Number(values.cost_price),
    };

    setReceivedItems((prev) => [...prev, newItem]);
  };

  const onFormSubmit = async (data) => {
    setIsLoading(true);

    const finalDataObject = {
      grn_date: data.grn_date,
      supplier: data.supplier,
      invoice_number: data.invoice_number,
      net_value: totalAmount,
      receivedItems,
    };

    try {
      const responseFromGrn = await addGrn(finalDataObject);

      for (const item of receivedItems) {
        await modifyStock(item.item_id, +item.quantity);
      }

      if (responseFromGrn === "success") {
        toast.success("Success! Data saved successfully.");
        router.push("/grn");
      }
    } catch (error) {
      console.log("error -> ", error);
      toast.error("Error: Data not saved.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="p-2">
        <SidebarTrigger />
      </div>

      <main className="no-scrollbar flex w-full p-2">
        <div className="w-full h-full">
          <div className="py-4">
            <h1 className="font-bold text-3xl">New Good Receive Note</h1>
            <h4 className="text-muted-foreground">
              Create a new Good Receive Note from a supplier
            </h4>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-muted-foreground">
                    Please fill the form to create a new Good Receive Note
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onItemDetailsSubmit)}
                      className="space-y-2"
                    >
                      <div className="grid grid-cols-1">
                        <FormField
                          control={form.control}
                          name="item"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Items</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? items.find(
                                            (item) => item.id === field.value.id
                                          )?.item_name
                                        : "Select item"}
                                      <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search item..."
                                      className="h-9"
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        No item found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {items &&
                                          items.map((item) => (
                                            <CommandItem
                                              value={item.item_name}
                                              key={item.id}
                                              onSelect={() => {
                                                form.setValue("item", item);
                                              }}
                                            >
                                              {item.item_name}
                                              <Check
                                                className={cn(
                                                  "ml-auto",
                                                  item.id === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cost_price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cost Price</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button type="submit">Add</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>

                <CardFooter>
                  {receivedItems.length > 0 && (
                    <Table>
                      <TableCaption>
                        A list of added item for this order.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Cost Price</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receivedItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.item_name}
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              {Number(item.cost_price).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {(
                                Number(item.cost_price) * Number(item.quantity)
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="destructive"
                                onClick={(e) => handleRemoveItem(e, index)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={3}>Total</TableCell>
                          <TableCell className="text-right">
                            ${totalAmount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  )}
                </CardFooter>
              </Card>
            </div>

            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-muted-foreground">
                    Select Supplier & Other Details
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onFormSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="supplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Supplier</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                const selectedItem = suppliers.find(
                                  (i) => i.id === value
                                );

                                field.onChange({
                                  id: value,
                                  name: selectedItem.name || "",
                                });
                              }}
                              defaultValue={field.value?.id}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Supplier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {suppliers &&
                                  suppliers.map((supplier) => (
                                    <SelectItem
                                      key={supplier.id}
                                      value={supplier.id}
                                    >
                                      {supplier.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="invoice_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Invoice Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="grn_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(value) => {
                                    const date = new Date(value);
                                    const formattedDate =
                                      date.toLocaleDateString("en-CA");

                                    field.onChange(formattedDate);
                                  }}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  captionLayout="dropdown"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div
                        type="submit"
                        className="flex gap-2 justify-end"
                        disabled={isLoading}
                      >
                        <Button type="submit" className="bg-[#0d97ff]">
                          {isLoading && <Loader2 className="animate-spin" />}
                          Submit
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default page;
