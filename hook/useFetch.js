import { useState, useEffect } from "react";

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase-config.js";

const useFetch = (watchedType, sortType) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (watchedType, sortType) => {
    setIsLoading(true);

    var filter = "title";
    var direction = "asc";
    if (sortType === "Rating") {
      filter = "myRating";
      direction = "desc";
    }

    try {
      const dataArray = [];

      switch (watchedType) {
        case "Watched":
          const q = query(
            collection(db, "movies"),
            where("isWatched", "==", true),
            orderBy(filter, direction)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            dataArray.push(doc.data());
          });
          break;

        case "Unwatched":
          const q2 = query(
            collection(db, "movies"),
            where("isWatched", "==", false),
            orderBy(filter, direction)
          );
          const querySnapshot2 = await getDocs(q2);
          querySnapshot2.forEach((doc) => {
            dataArray.push(doc.data());
          });
          break;

        default:
          const querySnapshot3 = await getDocs(
            query(collection(db, "movies"), orderBy(filter, direction))
          );
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
    fetchData(watchedType, sortType);
  }, []);

  const refetch = (watchedType, sortType) => {
    setIsLoading(true);
    fetchData(watchedType, sortType);
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
