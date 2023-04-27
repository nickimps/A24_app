import { useState } from "react";
import {
  View,
  Text,
  Span
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./progress.style";
import { icons, SIZES } from "../../constants";


const Progress = ({bgcolor, progress, height}) => {
  const router = useRouter();

  return (
    <View style={styles.ParentView(height)}>
      <View style={styles.ChildView(progress, bgcolor)}>
        <Text style={styles.ProgressText}>{`${progress}%`}</Text>
      </View>
    </View>
    
  );
};

export default Progress;
