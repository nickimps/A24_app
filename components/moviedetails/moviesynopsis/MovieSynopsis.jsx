import { View, Text } from "react-native";

import styles from "./moviesynopsis.style";

const MovieSynopsis = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}></Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  );
};

export default MovieSynopsis;