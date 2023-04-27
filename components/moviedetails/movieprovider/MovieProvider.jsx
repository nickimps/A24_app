import { View, Text } from "react-native";

import styles from "./movieprovider.style";

const MovieProvider = ({ provider }) => {
  return (
    <View style={styles.containerProvider}>
      <Text style={styles.providerText(provider[0])}>Apple TV+</Text>
      <Text style={styles.providerText(provider[1])}>Plex</Text>
      <Text style={styles.providerText(provider[2])}>Netflix</Text>
      <Text style={styles.providerText(provider[3])}>Blu-Ray</Text>
    </View>
  );
};

export default MovieProvider;