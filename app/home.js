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
import {
  ScreenHeaderBtn,
  Progress,
  LogoHeader,
  Search,
  Movies,
} from "../components";
import useFetch from "../hook/useFetch";
import useFetchProgress from "../hook/useFetchProgress";

const watchedTypes = ["All", "Watched", "Unwatched"];

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeWatchedType, setActiveWatchedType] = useState("All");

  const { data, isLoading, error, refetch } = useFetch(activeWatchedType);
  const { progress, isLoadingProgress, errorProgress, refetchProgress } =
    useFetchProgress();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header with logo and settings button */}
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerLeft: () => (
            <LogoHeader iconUrl={images.a24_logo} dimension="100%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.settings} dimension="70%" />
          ),
          headerTitle: "",
        }}
      />

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.ParentView(SIZES.xxLarge)}>
          <View style={styles.ChildView(progress, COLORS.pastel_green)}>
            {isLoadingProgress ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <Text style={styles.ProgressText}>{`${progress}%`}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Main Content Portion */}
      <View style={{ paddingHorizontal: SIZES.medium }}>
        {/* Search Bar */}
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick={() => {
            if (searchTerm) {
              router.push(`/search/${searchTerm}`);
            }
          }}
        />
      </View>

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
                  refetch(item);
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
    backgroundColor: COLORS.white,
  },
  tabsMovieContainer: {
    flex: 1,
    paddingHorizontal: SIZES.medium,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.black : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.black : COLORS.gray2,
  }),
  ParentView: (height) => ({
    height: height,
    width: "100%",
    backgroundColor: COLORS.lightWhite,
    borderColor: COLORS.charcoal,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
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
    paddingHorizontal: SIZES.xxLarge + 10,
    elevation: 10,
  },
  ProgressText: {
    padding: 6,
    color: "black",
    fontFamily: "DMBold",
    textAlign: "center",
  },
});

export default Home;
