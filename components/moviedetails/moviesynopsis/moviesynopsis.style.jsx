import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.xSmall-3,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: "DMBold",
  },
  contentBox: {
    flex: 1,
  },
  contextText: {
    fontSize: SIZES.medium,
    color: COLORS.charcoal,
    fontFamily: "DMRegular",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    textAlign: "justify",
  },
});

export default styles;