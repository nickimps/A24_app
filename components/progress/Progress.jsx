import { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator
} from "react-native";

import styles from "./progress.style";

import useFetchProgress from "../../hook/useFetchProgress";
import { COLORS } from "../../constants";


const Progress = ({bgcolor, height}) => {
  
  const { progress, isLoading, error } = useFetchProgress();

  return (
    <View style={styles.ParentView(height)}>
      <View style={styles.ChildView(progress, bgcolor)}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
          ) : (
          <Text style={styles.ProgressText}>{`${progress}%`}</Text>
          )}
      </View>
    </View>
    
  );
};

export default Progress;
