import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import useFetch from "../../hook/useFetch";
import styles from "./movies.style";
import { COLORS, SIZES } from "../../constants";
import MovieCard from "../common/cards/movie/MovieCard.jsx";

const Movies = () => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch();

    const [selectedMovie, setSelectedMovie] = useState();

    const handleCardPress = (item) => {
        setSelectedMovie(item.title);
        router.push(`/movie-details/${item.title}`);
        console.log(item.title);
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
                ) : error ? (
                <Text>Something went wrong.</Text>
                ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                    <MovieCard
                        item={item}
                        selectedMovie={item.title}
                        handleCardPress={handleCardPress}
                    />
                    )}
                    keyExtractor={(item) => item.title}
                    contentContainerStyle={{ rowGap: SIZES.medium }}
                    showsVerticalScrollIndicator={false}
                />
                )}
            </View>
        </View>
    );
};

export default Movies;