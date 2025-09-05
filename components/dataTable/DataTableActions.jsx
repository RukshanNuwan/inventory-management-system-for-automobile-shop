import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeItem } from "@/lib/actions/general.actions";
import { setSelectedItem } from "@/store/slices/dataSlice";
import { useUser } from "@clerk/nextjs";
import { EyeIcon, Loader2, MoreHorizontal, PenIcon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const DataTableActions = ({
  original,
  collectionName,
  isEditShowing = true,
}) => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleViewDataClick = (data) => {
    dispatch(setSelectedItem(data));
    router.push(`${pathname}/${data.id}`);
  };

  const handleEditDataClick = (data) => {
    dispatch(setSelectedItem(data));
    router.push(`${pathname}/edit`);
  };

  const handleRemove = async (id) => {
    setIsLoading(true);

    try {
      const response = await removeItem(collectionName, id);

      if (response === "success") {
        toast.success("Success! Data removed successfully.");
      }
    } catch (error) {
      toast.error("Error: Data not removed.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="flex flex-col gap-2">
          <DropdownMenuItem onClick={() => handleViewDataClick(original)}>
            <EyeIcon className="text-black" />
            <span>Details</span>
          </DropdownMenuItem>

          {isEditShowing && (
            <DropdownMenuItem onClick={() => handleEditDataClick(original)}>
              <PenIcon className="text-black" />
              <span>Edit</span>
            </DropdownMenuItem>
          )}

          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <div className="flex items-center gap-1 px-2 py-1 text-red-500">
                <XIcon className="size-5" />
                <span className="text-[14px]">Remove</span>
              </div>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-zinc-100">
              <AlertDialogHeader>
                <AlertDialogTitle>Do you want to proceed?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-500">
                  This action will delete the selected data. Please confirm to
                  proceed or cancel to review your changes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-0 shadow-none bg-transparent">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isLoading}
                  className="rounded-[20px]"
                  onClick={() => handleRemove(original.id)}
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableActions;
