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

const watchedTypes = ["All", "Watched", "Unwatched"];

const Movies = () => {
    const router = useRouter();

    const [activeWatchedType, setActiveWatchedType] = useState("All");

    const { data, isLoading, error, refetch } = useFetch(activeWatchedType);

    const [selectedMovie, setSelectedMovie] = useState();

    const handleCardPress = (item) => {
        router.push(`/movie-details/${item.title}`);
    };

    return (
        <View style={{ flex: 1}}>
            <View style={styles.tabsContainer}>
                <FlatList
                data={watchedTypes}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={styles.tab(activeWatchedType, item)}
                    onPress={() => {
                        setActiveWatchedType(item);
                        refetch(item);
                    }}
                    >
                    <Text style={styles.tabText(activeWatchedType, item)}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                contentContainerStyle={{ columnGap: SIZES.small }}
                horizontal
                />
            </View>
            
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
        </View>
        
    );
};

export default Movies;