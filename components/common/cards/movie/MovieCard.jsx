import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Dialog from "react-native-dialog";

import styles from "./moviecard.style";
import { checkImageURL } from "../../../../utils";
import WatchedBtn from "./WatchedBtn";

import { icons } from "../../../../constants";

import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config.js";
import useFetchProgress from "../../../../hook/useFetchProgress";

const MovieCard = ({ item, handleCardPress, refetchProgress }) => {
  const ref = doc(db, "movies", item.title);

  const [isWatched, setIsWatched] = useState(item.isWatched);
  const [rating, setRating] = useState(item.myRating);
  const [stringRating, onStringRating] = useState("");
  const [visible, setVisible] = useState(false);

  // Update the movie watched status in the database
  const updateMovie = async () => {
    try {
      setIsWatched((isWatched) => !isWatched);

      await updateDoc(ref, {
        isWatched: !isWatched,
      });

      refetchProgress();
    } catch (error) {
      console.log("updateWatched: " + error);
    }
  };

  // Update the movie watched status in the database
  const updateRating = async () => {
    try {
      var newRating = parseInt(stringRating);
      setRating((rating) => newRating);

      await updateDoc(ref, {
        myRating: newRating,
      });

      onStringRating("");
    } catch (error) {
      console.log("updateRating: " + error);
    }
  };

  const showDialog = () => {
    if (isWatched) {
      updateRating();
      updateMovie();
    } else {
      setVisible(true);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    updateMovie();
    updateRating();

    setVisible(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleCardPress(item)}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: checkImageURL(item?.poster)
                ? item.poster
                : "https://cdn.sanity.io/images/9ielf7cc/production/1b1c700f83e823b3f92cead2ad91ce46f2ab0b22-7500x4217.jpg?w=2400&h=1349&fit=crop",
            }}
            resizeMode="center"
            style={styles.logoImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.year}>{item.year}</Text>

          {/* <View style={{ flexGrow: 1 }}>
            <Text style={styles.synopsis} numberOfLines={2}>
              {item?.synopsis}
            </Text>
          </View> */}

          <View style={styles.btnContainer}>
            {rating > 0 && (
              <View style={styles.ratingContainer(rating)}>
                <Text style={styles.myRating}>{rating}</Text>
              </View>
            )}
            <WatchedBtn
              iconUrl={
                isWatched ? icons.checked_checkbox : icons.unchecked_checkbox
              }
              dimension="100%"
              handlePress={() => {
                showDialog();
              }}
            />

            <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
              <Dialog.Title>What is your rating?</Dialog.Title>
              <Dialog.Input
                placeholder="0-100"
                keyboardType="numeric"
                onChangeText={onStringRating}
                value={stringRating}
              />
              <Dialog.Button label="Cancel" onPress={handleCancel} />
              <Dialog.Button label="Save" onPress={handleSave} />
            </Dialog.Container>
          </View>

          <View style={styles.providerContainer}>
            {item.provider[0] && (
              <Image
                source={icons.atv_plus}
                resizeMode="center"
                style={styles.providerImage}
              />
            )}
            {item.provider[1] && (
              <Image
                source={icons.plex}
                resizeMode="center"
                style={styles.providerImage}
              />
            )}
            {item.provider[2] && (
              <Image
                source={icons.netflix}
                resizeMode="center"
                style={styles.providerImage}
              />
            )}
            {item.provider[3] && (
              <Image
                source={icons.bluray}
                resizeMode="center"
                style={styles.providerImage}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
