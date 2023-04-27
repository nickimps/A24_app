import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  ScreenHeaderBtn,
  Progress,
  LogoHeader,
  Search,
  Movies,
} from "../components";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Get the progress of movies watched
  //   var progress_num = (27 / 136) * 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
      <View style={{ padding: SIZES.medium }}>
        <Progress bgcolor={COLORS.pastel_green} height={30} />
      </View>

      {/* Main Content Portion */}
      <View
        style={{
          paddingLeft: SIZES.medium,
          paddingRight: SIZES.medium,
        }}
      >
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
      <View
        style={{
          flex: 1,
          paddingLeft: SIZES.medium,
          paddingRight: SIZES.medium,
        }}
      >
        {/* Show Movies */}
        <Movies />
      </View>
    </SafeAreaView>
  );
};

export default Home;
