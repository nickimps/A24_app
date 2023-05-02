import { useState, useEffect } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config.js";

const useFetch = (param) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (param) => {
    setIsLoading(true);

    try {
      const dataArray = [];

      switch (param) {
        case "Watched":
          const q = query(
            collection(db, "movies"),
            where("isWatched", "==", true)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            dataArray.push(doc.data());
          });
          break;

        case "Unwatched":
          const q2 = query(
            collection(db, "movies"),
            where("isWatched", "==", false)
          );
          const querySnapshot2 = await getDocs(q2);
          querySnapshot2.forEach((doc) => {
            dataArray.push(doc.data());
          });
          break;

        default:
          const querySnapshot3 = await getDocs(collection(db, "movies"));
          querySnapshot3.forEach((doc) => {
            dataArray.push(doc.data());
          });
          break;
      }

      setData(dataArray);

      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log("useFetch: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(param);
  }, []);

  const refetch = (param) => {
    setIsLoading(true);
    fetchData(param);
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
