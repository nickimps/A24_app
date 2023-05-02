import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import useFetch from "../../hook/useFetch";
import styles from "./movies.style";
import { COLORS, SIZES } from "../../constants";
import MovieCard from "../common/cards/movie/MovieCard.jsx";

// const watchedTypes = ["All", "Watched", "Unwatched"];

const Movies = ({ data }, { isLoading }, error) => {
  const router = useRouter();

  // const [activeWatchedType, setActiveWatchedType] = useState("All");

  // const { data, isLoading, error, refetch } = useFetch(activeWatchedType);
  // move this line to home.js and then pass these in as a parameter so it isnt called many many times

  const [selectedMovie, setSelectedMovie] = useState();

  const handleCardPress = (item) => {
    router.push(`/movie-details/${item.title}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong.</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <MovieCard item={item} handleCardPress={handleCardPress} />
              )}
              keyExtractor={(item) => item.title}
              contentContainerStyle={{ rowGap: SIZES.medium }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Movies;
