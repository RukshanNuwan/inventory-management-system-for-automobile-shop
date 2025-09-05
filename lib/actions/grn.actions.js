import { db } from "@/config/firebase.config";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const getAllGrn = (callback) => {
  try {
    const q = query(collection(db, "grn"), orderBy("added_at", "desc"));

    return onSnapshot(q, (querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(list);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return () => {};
  }
};

const addGrn = async (values) => {
  try {
    await addDoc(collection(db, "grn"), {
      ...values,
      status: "active",
      added_at: serverTimestamp(),
    });

    return "success";
  } catch (error) {
    console.log("Error: Adding Data", error);

    return null;
  }
};

export { addGrn, getAllGrn };
