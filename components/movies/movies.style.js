import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SIZES.xSmall - 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.xSmall - 2,
  },
});

export default styles;
