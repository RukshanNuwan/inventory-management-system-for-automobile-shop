import { db } from "@/config/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const getAllItems = (callback) => {
  try {
    const q = query(
      collection(db, "items"),
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
    console.error("Error fetching items:", error);
    return () => {};
  }
};

const getItems = async () => {
  const q = query(collection(db, "items"), where("status", "==", "active"));

  const list = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });

  return list;
};

const getAllItemsWithoutStatus = async (callback) => {
  const q = query(collection(db, "items"));

  const list = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });
  callback(list);
};

const addItem = async (values) => {
  try {
    await addDoc(collection(db, "items"), {
      ...values,
      status: "active",
      stock: 0,
      added_at: serverTimestamp(),
    });

    return "success";
  } catch (error) {
    console.log("Error: Adding Item", error);

    return null;
  }
};

const updateItem = async (data, id) => {
  try {
    const docRef = doc(db, "items", id);
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

const modifyStock = async (itemId, qty) => {
  try {
    const itemRef = doc(db, "items", itemId);
    await updateDoc(itemRef, {
      stock: increment(qty),
    });
    return true;
  } catch (error) {
    console.error("Error updating stock: ", error);
    return null;
  }
};

export {
  addItem,
  getAllItems,
  getAllItemsWithoutStatus,
  getItems,
  modifyStock,
  updateItem,
};
