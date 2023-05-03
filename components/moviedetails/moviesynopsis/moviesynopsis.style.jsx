import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.xSmall - 3,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: "DMBold",
  },
  contentBox: {
    flex: 1,
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.xxLarge + 10,
    backgroundColor: COLORS.lightgray,
    borderRadius: SIZES.small,
    padding: SIZES.xSmall,
    paddingHorizontal: SIZES.small,
    elevation: 3,
  },
  contextText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontFamily: "DMRegular",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    textAlign: "justify",
  },
});

export default styles;
