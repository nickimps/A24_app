import { Image, View, Text } from "react-native";

import styles from "./logoheader.style";

const LogoHeader = ({ iconUrl, dimension }) => {
  return (
    <View style={{flexDirection: "row"}}>
        <View style={styles.container}>
            <Image
                source={iconUrl}
                resizeMode='cover'
                style={styles.btnImg(dimension)}
            />
        </View>
        <Text style={styles.titleText}> Checklist</Text>
    </View>
    
  );
};

export default LogoHeader;