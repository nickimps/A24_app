import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  containerProvider: {
    borderRadius: SIZES.medium,
    paddingTop: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  providerText: (value) => ({
    fontSize: SIZES.medium,
    color: value ? COLORS.forest_green : COLORS.cherry_red,
    fontFamily: "DMRegular",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingEnd: SIZES.medium,
  }),
});

export default styles;