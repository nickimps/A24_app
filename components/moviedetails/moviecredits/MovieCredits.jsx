import { View, Text, Image, ActivityIndicator } from "react-native";

import styles from "./moviecredits.style";
import useFetchMovieAPI from "../../../hook/useFetchMovieAPI";
import { checkImageURL } from "../../../utils";
import { icons, COLORS } from "../../../constants";

const MovieCredits = ({ title, cast, director, myRating, poster }) => {
  const { imdbRating, apiLoading, apiError } = useFetchMovieAPI({
    q: title,
  });

  myRating = parseInt(myRating, 10);

  // Make formatting for cast list
  var castList = "";
  for (let i = 0; i < cast.length; i++) {
    if (i < cast.length - 1) castList = castList + cast[i] + "\n";
    else castList = castList + cast[i];
  }

  // Create rating <Text>
  const Rating = ({ rating }) => (
    <View>
      {rating > 0 ? (
        <Text style={styles.ratingNumberText}>{rating}</Text>
      ) : (
        <Text style={styles.ratingNumberText}>-</Text>
      )}
    </View>
  );

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: checkImageURL(poster)
              ? poster
              : "https://cdn.sanity.io/images/9ielf7cc/production/1b1c700f83e823b3f92cead2ad91ce46f2ab0b22-7500x4217.jpg?w=2400&h=1349&fit=crop",
          }}
          resizeMode="cover"
          style={styles.imageStyle}
        />
      </View>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.headText}>Director</Text>

          <View style={styles.contentBox}>
            <Text style={styles.contextText}>{director}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.headText}>Cast</Text>

          <View style={styles.contentBox}>
            <Text style={styles.contextText}>{castList}</Text>
          </View>
        </View>

        <View style={styles.containerRating}>
          <Text style={styles.ratingText}>My Rating: </Text>

          <View style={styles.ratingContainer(myRating)}>
            <Rating rating={myRating} />
          </View>
        </View>

        <View style={styles.imdbContainer}>
          <Image
            source={icons.imdb}
            resizeMode="center"
            style={styles.imdbImage}
          />
          {apiLoading ? (
            <ActivityIndicator size="small" color={COLORS.hunyadi_yellow} />
          ) : apiError ? (
            <Text style={styles.imdbText}>-</Text>
          ) : imdbRating === -1 ? (
            <Text style={styles.imdbText}>-</Text>
          ) : (
            <Text style={styles.imdbText}>{imdbRating}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default MovieCredits;
