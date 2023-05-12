import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  progressContainer: {
    padding: SIZES.medium,
    flexDirection: "row",
  },
  ProgressText: {
    padding: 7,
    color: COLORS.lightWhite,
    fontFamily: "DMBold",
    textAlign: "center",
  },
  ParentView: (height) => ({
    height: height,
    width: "100%",
    backgroundColor: COLORS.lightWhite,
    borderColor: COLORS.charcoal,
    borderRadius: 15,
  }),
  ChildView: (progress, bgcolor) => ({
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 15,
    textAlign: "right",
  }),
});

export default styles;
