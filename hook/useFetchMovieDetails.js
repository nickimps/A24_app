import { useState, useEffect } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

const useFetchMovieDetails = (movieTitle) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const movie = await getDoc(doc(db, "movies", movieTitle));

      if (movie.exists()) {
        setData(movie.data());
        setIsLoading(false);
      } else {
        setData(null);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      console.log("useFetchMovieDetails: " + error);
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
