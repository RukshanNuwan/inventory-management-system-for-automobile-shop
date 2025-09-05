import { db } from "@/config/firebase.config";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

const removeItem = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      status: "inactive",
      removed_at: serverTimestamp(),
    });

    return "success";
  } catch (error) {
    toast.error("Error: Data not removed.");
    console.log(error);
  }
};

export { removeItem };
