"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { addItem } from "@/lib/actions/item.actions";
import { itemFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const itemForm = useForm({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      part_number: "",
      item_name: "",
      item_code: "",
      re_order_point: "",
      rack_number: "",
      item_description: "",
    },
  });

  const onFormSubmit = async (data) => {
    setIsLoading(true);

    const finalObject = {
      ...data,
      item_name: data.part_number + " " + data.item_name,
    };

    try {
      const response = await addItem(finalObject);

      if (response === "success") {
        toast.success("Success! Data saved successfully.");
        router.push("/items");
      }
    } catch (error) {
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
            <h1 className="font-bold text-3xl">New Item</h1>
            <h4 className="text-muted-foreground">
              Create a new item by filling the form
            </h4>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-muted-foreground">
                    Please fill the form to create a new Item
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Form {...itemForm}>
                    <form
                      onSubmit={itemForm.handleSubmit(onFormSubmit)}
                      className="space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        <FormField
                          control={itemForm.control}
                          name="part_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Part Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={itemForm.control}
                          name="item_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-1">
                        <FormField
                          control={itemForm.control}
                          name="item_code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={itemForm.control}
                          name="re_order_point"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Re-Order Point</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={itemForm.control}
                          name="rack_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rack Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1">
                        <FormField
                          control={itemForm.control}
                          name="item_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea className="resize-none" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button type="submit" disabled={isLoading}>
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
