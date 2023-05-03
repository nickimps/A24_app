import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: SIZES.xSmall,
    backgroundColor: COLORS.lightgray,
    borderRadius: SIZES.small,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  logoContainer: {
    width: 80,
    height: 120,
    backgroundColor: COLORS.lightgray,
    borderRadius: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.small - 3,
  },
  year: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.gray3,
  },
  infoContainer: {
    height: 120,
    flex: 1,
    marginTop: 0,
    paddingStart: SIZES.xSmall,
  },
  btnContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    paddingTop: SIZES.xSmall - 2,
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
        : COLORS.lightgray,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  }),
  myRating: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  synopsis: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: COLORS.charcoal,
    marginTop: SIZES.small / 1.5,
  },
  director: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  cast: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
