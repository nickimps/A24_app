import { useState, useEffect } from "react";

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const dataArray = [];
      const ref_collection = collection(db, "movies");

      await getDocs(ref_collection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        });
      });

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
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useFetch;
