import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.xSmall - 3,
    paddingTop: SIZES.small,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  containerRating: {
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.xSmall - 3,
    paddingTop: SIZES.small,
    flexDirection: "row",
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: "DMBold",
  },
  ratingText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: "DMBold",
  },
  ratingNumberText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: "DMBold",
  },
  contentBox: {
    flex: 1,
  },
  contextText: {
    fontSize: SIZES.medium,
    color: COLORS.darkgray,
    fontFamily: "DMRegular",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  ratingContainer: (rating) => ({
    width: 31,
    height: 29,
    backgroundColor:
      rating > 89
        ? COLORS.color1
        : rating > 79
        ? COLORS.color2
        : rating > 69
        ? COLORS.color3
        : rating > 49
        ? COLORS.color4
        : rating > 0
        ? COLORS.color5
        : COLORS.gray,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  }),
  imageContainer: {
    width: 200,
    height: undefined,
    resizeMode: "contain",
    borderRadius: SIZES.xSmall - 3,
    marginTop: SIZES.small,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    elevation: 4,
  },
  imageStyle: {
    borderRadius: SIZES.xSmall - 3,
    width: "100%",
    height: 300,
  },
});

export default styles;
