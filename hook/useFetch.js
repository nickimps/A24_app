import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config.js";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const ref = collection(db, "movies");
      const dataArray = [];
      await getDocs(ref).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        });
      });

      setData(dataArray);
      // console.log(dataArray[0].title);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
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
