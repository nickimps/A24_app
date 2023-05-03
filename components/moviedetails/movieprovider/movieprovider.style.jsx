import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  containerProvider: {
    borderRadius: SIZES.small,
    marginTop: SIZES.large,
    marginBottom: SIZES.small,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
    backgroundColor: COLORS.lightgray,
    elevation: 3,
  },
  providerText: (value) => ({
    fontSize: SIZES.medium,
    color: value ? COLORS.forest_green : COLORS.cherry_red,
    fontFamily: "DMMedium",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: SIZES.xSmall,
  }),
});

export default styles;
