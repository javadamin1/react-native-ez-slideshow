import React from "react";
import { Dimensions, Image, Text, View, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

const Pagination = ({ items, paginationIndex, scrollX }) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <View
            style={[
              styles.dot,
              { backgroundColor: paginationIndex == index ? "#222" : "#aaa" },
            ]}
          ></View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    flexDirection: "row",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  dot: {
    backgroundColor: "#aaa",
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
