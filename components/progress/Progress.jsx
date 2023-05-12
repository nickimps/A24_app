import { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import styles from "./progress.style";

import { COLORS, SIZES } from "../../constants";

const Progress = ({ progress, progressString, isLoadingProgress }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.ParentView(SIZES.xxLarge)}>
        <View style={styles.ChildView(progress, COLORS.green9)}>
          {isLoadingProgress ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text style={styles.ProgressText}>{`${progressString}`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Progress;
