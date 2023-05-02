import { useState, useEffect } from "react";

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

const useFetchProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const ref = collection(db, "movies");

      var numberOfMovies = 0;
      var numberOfWatchedMovies = 0;

      await getDocs(ref).then((querySnapshot) => {
        querySnapshot.forEach((movie) => {
          if (movie.data().isWatched) {
            numberOfWatchedMovies += 1;
          }
          numberOfMovies += 1;
        });
      });

      console.log((numberOfWatchedMovies / numberOfMovies) * 100);

      setProgress(Math.round((numberOfWatchedMovies / numberOfMovies) * 100));

      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log("useFetchProgress: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { progress, isLoading, error };
};

export default useFetchProgress;
