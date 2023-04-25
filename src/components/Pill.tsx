import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PillColourEnum, PillType } from "../types/types";

const pillColour = {
  primary: {
    backgroundColor: "#efe1bc",
    borderColor: "#eacf83",
  },
  secondary: {
    backgroundColor: "#bcc6ef",
    borderColor: "#8791b8",
  },
  tertiary: {
    backgroundColor: "#dedede",
    borderColor: "#8d8d8d",
  },
};

const Pill = ({ colour = PillColourEnum["PRIMARY"], title }: PillType) => {
  return (
    <View style={[styles.pill, pillColour[colour]]}>
      <Text style={styles.pillText}>{title}</Text>
    </View>
  );
};

export default Pill;

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    backgroundColor: "#bcc6ef",
    borderColor: "#8791b8",
    paddingHorizontal: 4,
    paddingVertical: 3,
    color: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    textDecorationColor: "none",
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: 16,
  },
  pillText: {
    paddingHorizontal: 4,
  },
});
