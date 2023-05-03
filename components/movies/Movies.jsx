import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./movies.style";
import { COLORS, SIZES } from "../../constants";
import MovieCard from "../common/cards/movie/MovieCard.jsx";

const Movies = ({ data, isLoading, error, refetchProgress }) => {
  const router = useRouter();

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
                <MovieCard
                  item={item}
                  handleCardPress={handleCardPress}
                  refetchProgress={refetchProgress}
                />
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
