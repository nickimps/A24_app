import { Image, TouchableOpacity } from "react-native";

import styles from "./watchedbtn.style";

const WatchedBtn = ({ iconUrl, dimension, handlePress }) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image
            source={iconUrl}
            resizeMode='cover'
            style={styles.btnImg(dimension)}
            />
        </TouchableOpacity>
    );
};

export default WatchedBtn;