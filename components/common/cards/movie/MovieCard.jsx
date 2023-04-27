import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Dialog from "react-native-dialog";

import styles from "./moviecard.style";
import { checkImageURL } from "../../../../utils";
import WatchedBtn from "./WatchedBtn";

import { icons } from "../../../../constants";

import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config.js";


const MovieCard = ({ item, handleCardPress }) => {
    const ref = doc(db, "movies", item.title);

    const [isWatched, setIsWatched] = useState(false);
    const [rating, setRating] = useState(0)
    const [stringRating, onStringRating] = useState('');
    const [visible, setVisible] = useState(false);


    // Default the watched statis of the card from the database
    const getMovieInformation = async () => {
        const doc = await getDoc(ref);
        setIsWatched(doc.data().isWatched);
        setRating(doc.data().myRating);
    }
    getMovieInformation();

    // Create rating <Text>
    const Rating = ({ rating }) => (
        <View>
            {rating > 0 ? <Text style={styles.myRating}>{rating}</Text> : <Text style={styles.myRating}></Text>}
        </View>
    )

    // Update the movie watched status in the database
    const updateMovie = async () => {
        try {
            setIsWatched(isWatched => !isWatched);

            await updateDoc(ref, {
                isWatched: !isWatched
            });
        } catch (error) {
            console.log("updateWatched: " + error);
        }
    };

    // Update the movie watched status in the database
    const updateRating = async () => {
        try {
            var newRating = parseInt(stringRating);
            console.log(newRating);
            setIsWatched(rating => newRating);

            await updateDoc(ref, {
                myRating: newRating
            });

            onStringRating('');
        } catch (error) {
            console.log("updateRating: " + error);
        }
    };

    const showDialog = () => {
        if (isWatched){
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
        <TouchableOpacity style={styles.container} onPress={() => handleCardPress(item)}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{
                        uri: checkImageURL(item?.poster)
                            ? item.poster
                            : "https://cdn.sanity.io/images/9ielf7cc/production/1b1c700f83e823b3f92cead2ad91ce46f2ab0b22-7500x4217.jpg?w=2400&h=1349&fit=crop",
                        }}
                        resizeMode='center'
                        style={styles.logoImage}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.year}>{item.year}</Text>

                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                        <Text style={styles.synopsis} numberOfLines={3}>{item?.synopsis}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.btnContainer}>
                <View style={styles.ratingContainer(rating)}>
                    <Rating rating={rating}/>
                </View>

                <WatchedBtn 
                        iconUrl={
                            isWatched 
                            ? icons.checked_checkbox 
                            : icons.unchecked_checkbox
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
        </TouchableOpacity>
    );
};

export default MovieCard;