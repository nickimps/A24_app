import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";
import {
  MovieCredits,
  MovieSynopsis,
  MovieTitle,
  MovieProvider,
  ScreenHeaderBtn,
} from "../../components";
import useFetchMovieDetails from "../../hook/useFetchMovieDetails";

import { checkImageURL } from "../../utils";

const MovieDetails = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { data, isLoading, error, refetchMovieDetails } = useFetchMovieDetails(
    params.title
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchMovieDetails();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="80%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data === null ? (
            <Text>Cannot find movie</Text>
          ) : (
            <View style={{ paddingHorizontal: SIZES.medium }}>
              <MovieTitle movieTitle={data["title"]} movieYear={data["year"]} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MovieCredits
                  title={data["title"]}
                  cast={data["cast"]}
                  director={data["director"]}
                  myRating={data["myRating"]}
                  poster={data["poster"]}
                />
              </View>

              <MovieProvider provider={data["provider"]} />

              <MovieSynopsis info={data["synopsis"]} />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default MovieDetails;
