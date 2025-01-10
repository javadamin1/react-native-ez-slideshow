import React from "react";
import { Dimensions, Image, Text, View, StyleSheet } from "react-native";

const SliderItem = ({ item, parendStyles, paginationIndex }) => {
  let uri = typeof item.url === "string" ? { uri: item.url } : item.url;
  return (
    <View style={[parendStyles.card]}>
      <View style={styles.itemContainer}>
        <Image source={uri} style={[styles.image]} />
        <View style={styles.background}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    color: "white",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
    textAlign: "center",
  },
});
