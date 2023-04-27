import { useState, useEffect } from "react";

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config.js";

const useFetchMovieDetails = (movieTitle) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const ref = doc(db, "movies", movieTitle);
      const movie = await getDoc(ref);

      if (movie.exists()) {
        setData(movie.data());
        setIsLoading(false);
      } else {
        setData(null);
        setIsLoading(false);
      }
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

export default useFetchMovieDetails;
