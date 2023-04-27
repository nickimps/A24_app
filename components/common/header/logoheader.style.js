import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
  }),
  titleText: {
    fontSize: SIZES.xLarge,
    fontFamily: "DMMedium",
    color: COLORS.black,
    verticalAlign: "bottom",
  },
});

export default styles;