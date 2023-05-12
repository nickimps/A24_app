import { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES, FONT } from "../constants";
import { ScreenHeaderBtn, Progress, LogoHeader, Movies } from "../components";
import useFetch from "../hook/useFetch";
import useFetchProgress from "../hook/useFetchProgress";

const watchedTypes = ["All Movies", "Watched", "Unwatched"];
const sortTypes = ["A-Z", "Rating"];

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeWatchedType, setActiveWatchedType] = useState("All Movies");
  const [activeSortType, setActiveSortType] = useState("A-Z");

  const { data, isLoading, error, refetch } = useFetch(
    activeWatchedType,
    activeSortType
  );
  const { progress, progressString, isLoadingProgress, refetchProgress } =
    useFetchProgress();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header with logo and settings button */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.green1 },
          headerShadowVisible: false,
          headerLeft: () => (
            <LogoHeader iconUrl={images.a24_logo} dimension="100%" />
          ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={icons.settings} dimension="70%" />
          // ),
          headerTitle: "",
        }}
      />

      {/* Progress bar */}
      <Progress
        progress={progress}
        progressString={progressString}
        isLoadingProgress={isLoadingProgress}
      />

      {/* Tabs and Movie List */}
      <View style={styles.tabsMovieContainer}>
        <View style={styles.tabsContainer}>
          <FlatList
            data={watchedTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeWatchedType, item)}
                onPress={() => {
                  setActiveWatchedType(item);
                  refetch(item, activeSortType);
                }}
              >
                <Text style={styles.tabText(activeWatchedType, item)}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        </View>

        <View style={{ marginVertical: 5 }} />

        <View style={styles.tabsContainer}>
          <FlatList
            data={sortTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeSortType, item)}
                onPress={() => {
                  setActiveSortType(item);
                  refetch(activeWatchedType, item);
                }}
              >
                <Text style={styles.tabText(activeSortType, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <Movies
            data={data}
            isLoading={isLoading}
            error={error}
            refetchProgress={refetchProgress}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.green1,
  },
  tabsMovieContainer: {
    flex: 1,
  },
  tabsContainer: {
    width: "100%",
    marginHorizontal: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    backgroundColor: activeJobType === item ? COLORS.green5 : COLORS.green2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: activeJobType === item ? FONT.bold : FONT.medium,
    color: activeJobType === item ? COLORS.lightWhite : COLORS.green4,
  }),
  ParentView: (height) => ({
    height: height,
    width: "100%",
    backgroundColor: COLORS.lightWhite,
    borderColor: COLORS.charcoal,
    borderRadius: 10,
  }),
  ChildView: (progress, bgcolor) => ({
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 9,
    textAlign: "right",
  }),
  progressContainer: {
    padding: SIZES.medium,
    paddingHorizontal: SIZES.xxLarge,
    elevation: 3,
  },
  ProgressText: {
    padding: 6,
    color: "black",
    fontFamily: "DMBold",
    textAlign: "center",
  },
});

export default Home;
