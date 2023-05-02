import { View, Text, Image } from "react-native";

import styles from "./moviecredits.style";
import { checkImageURL } from "../../../utils";
import { SIZES } from "../../../constants";

const MovieCredits = ({ cast, director, myRating, poster }) => {

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
    <View style={{flexDirection: "row", flex: 1}}>
      <View style={{flexDirection: "column", flex: 1}}>
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

      <View
        style={{
          width: 200,
          height: 300,
          borderRadius: SIZES.xSmall - 3,
          paddingTop: SIZES.small,
          paddingHorizontal: SIZES.xSmall - 3,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Image
          source={{
            uri: checkImageURL(poster)
              ? poster
              : "https://cdn.sanity.io/images/9ielf7cc/production/1b1c700f83e823b3f92cead2ad91ce46f2ab0b22-7500x4217.jpg?w=2400&h=1349&fit=crop",
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SIZES.xSmall - 3,
          }}
        />
      </View>
    </View>
    
  );
};

export default MovieCredits;