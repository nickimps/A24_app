import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./search.style";
import { icons, SIZES } from "../../constants";

const watchedTypes = ["All", "Watched", "Unwatched"];

const Search = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeWatchedType, setActiveWatchedType] = useState("All");

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What movie are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={watchedTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeWatchedType, item)}
              onPress={() => {
                setActiveWatchedType(item);
                // router.push(`/search/${item}`);
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
    </View>
  );
};

export default Search;