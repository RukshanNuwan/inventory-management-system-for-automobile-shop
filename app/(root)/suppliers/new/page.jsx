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
import { addSupplier } from "@/lib/actions/supplier.actions";
import { supplierFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const supplierForm = useForm({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      address: "",
      contact_number: "",
      email_address: "",
      remarks: "",
    },
  });

  const onFormSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await addSupplier(data);

      if (response === "success") {
        toast.success("Success! Data saved successfully.");
        router.push("/suppliers");
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
            <h1 className="font-bold text-3xl">New Supplier</h1>
            <h4 className="text-muted-foreground">
              Create a new supplier by filling the form
            </h4>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-muted-foreground">
                    Please fill the form to create a new Supplier
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Form {...supplierForm}>
                    <form
                      onSubmit={supplierForm.handleSubmit(onFormSubmit)}
                      className="space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        <FormField
                          control={supplierForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={supplierForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        <FormField
                          control={supplierForm.control}
                          name="contact_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={supplierForm.control}
                          name="email_address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1">
                        <FormField
                          control={supplierForm.control}
                          name="remarks"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Remarks</FormLabel>
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
