"use client";

import { db } from "@/config/firebase.config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function useRealtimeSearch(collectionName, searchField, searchTerm) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const q = query(
      collection(db, collectionName),
      where(searchField, ">=", searchTerm),
      where(searchField, "<=", searchTerm + "\uf8ff"),
      orderBy(searchField)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setResults(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [collectionName, searchField, searchTerm]);

  return results;
}
