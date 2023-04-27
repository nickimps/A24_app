import { View, Text } from "react-native";

import styles from "./moviecredits.style";

const MovieCredits = ({ cast, director, myRating, provider }) => {

  myRating = parseInt(myRating, 10);

  // Make formatting for cast list
  var castList = "";
  for (let i = 0; i < cast.length; i++) {
    if (i < cast.length-1)
      castList = castList + cast[i] + "\n";
    else
      castList = castList + cast[i];
  }

  // Create rating <Text>
  const Rating = ({ rating }) => (
      <View>
          {rating > 0 ? <Text style={styles.ratingNumberText}>{rating}</Text> : <Text style={styles.ratingNumberText}>-</Text>}
      </View>
  )

  return (
    <View>
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
        <Text style={styles.ratingText}>Your Rating: </Text>

        <View style={styles.ratingContainer(myRating)}>
            <Rating rating={myRating}/>
        </View>
      </View>
    </View>
    
  );
};

export default MovieCredits;