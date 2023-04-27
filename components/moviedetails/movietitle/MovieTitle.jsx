import { View, Text } from "react-native";

import styles from "./movietitle.style";

const MovieTitle = ({ movieTitle, movieYear }) => {
  return (
    <View style={styles.container}>
        <View style={styles.contentBox}>
            <Text style={styles.contextText}>{movieYear}</Text>
        </View>
        <Text style={styles.headText}>{movieTitle}</Text>
    </View>
  );
};

export default MovieTitle;