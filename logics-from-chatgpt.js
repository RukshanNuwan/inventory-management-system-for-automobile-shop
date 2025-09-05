const { ChevronsUpDown, Command, Check } = require("lucide-react");
const { Button } = require("./components/ui/button");
const { FormField, FormItem, FormLabel, FormControl, FormMessage } = require("./components/ui/form");
const { Popover, PopoverTrigger, PopoverContent } = require("./components/ui/popover");
const { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } = require("./components/ui/command");

<FormField
  control={form.control}
  name="item"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Item</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value?.id
                ? items.find((item) => item.id === field.value.id)?.item_name
                : "Select Item"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search item..." className="h-9" />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {items &&
                  items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={(value) => {
                        const selectedItem = items.find((i) => i.id === value);
                        field.onChange({
                          id: value,
                          name: selectedItem?.item_name || "",
                        });
                      }}
                    >
                      {item.item_name}
                      <Check
                        className={cn(
                          "ml-auto",
                          item.id === field.value?.id
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
/>;
