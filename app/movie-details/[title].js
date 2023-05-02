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

  const { data, isLoading, error } = useFetchMovieDetails(params.title);

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
          //   refreshControl={
          //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   }
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
                  cast={data["cast"]}
                  director={data["director"]}
                  myRating={data["myRating"]}
                  provider={data["provider"]}
                />
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
                      uri: checkImageURL(data["poster"])
                        ? data["poster"]
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
