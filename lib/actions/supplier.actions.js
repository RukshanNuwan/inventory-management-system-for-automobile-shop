import { db } from "@/config/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const getAllSuppliers = (callback) => {
  try {
    const q = query(
      collection(db, "suppliers"),
      where("status", "==", "active"),
      orderBy("added_at", "desc")
    );

    return onSnapshot(q, (querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(list);
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return () => {};
  }
};

const getSuppliers = async () => {
  const q = query(collection(db, "suppliers"), where("status", "==", "active"));

  const list = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });

  return list;
};

const addSupplier = async (values) => {
  try {
    await addDoc(collection(db, "suppliers"), {
      ...values,
      status: "active",
      added_at: serverTimestamp(),
    });

    return "success";
  } catch (error) {
    console.log("Error: Adding Supplier", error);

    return null;
  }
};

const updateSupplier = async (data, id) => {
  try {
    const docRef = doc(db, "suppliers", id);
    await updateDoc(docRef, {
      ...data,
      updated_at: serverTimestamp(),
    });

    return "success";
  } catch (error) {
    console.log("Error updating supplier data:", error);
    return null;
  }
};

export { addSupplier, getAllSuppliers, getSuppliers, updateSupplier };
