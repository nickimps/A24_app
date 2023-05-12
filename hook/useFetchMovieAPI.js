import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMovieAPI = (query) => {
  const [imdbRating, setImdbRating] = useState(0);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setError] = useState(null);

  const optionsForRating = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/auto-complete",
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": "adecc7a429msh9fcb5a2b78cbf0fp1ec2c5jsn324e2478c3ef",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setApiLoading(true);

    try {
      const response = await axios.request(optionsForRating);

      if (response.status === 200) {
        var imdbTitle = "";
        for (let i = 0; i < 8; i++) {
          console.log(
            "'" +
              response.data.d[i].l.toLowerCase() +
              "'" +
              " " +
              "'" +
              query.q.toLowerCase() +
              "'"
          );
          if (response.data.d[i].l.toLowerCase() === query.q.toLowerCase()) {
            imdbTitle = response.data.d[i].id;
            break;
          }
        }

        console.log(imdbTitle);

        const options = {
          method: "GET",
          url: "https://online-movie-database.p.rapidapi.com/title/get-ratings",
          params: {
            tconst: imdbTitle,
          },
          headers: {
            "X-RapidAPI-Key":
              "adecc7a429msh9fcb5a2b78cbf0fp1ec2c5jsn324e2478c3ef",
            "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
          },
        };

        const response2 = await axios.request(options);

        console.log("rating: " + response2.data.rating);

        setImdbRating(response2.data.rating);
        setApiLoading(false);
      } else {
        setImdbRating(-1);
        setApiLoading(false);
      }
    } catch (apiError) {
      setError(apiError);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { imdbRating, apiLoading, apiError };
};

export default useFetchMovieAPI;
