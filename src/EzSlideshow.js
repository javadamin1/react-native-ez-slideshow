import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import SliderItem from "./SliderItem";
import Pagination from "./Pagination";

const { width } = Dimensions.get("screen");

const EzSlideshow = ({
  images = [],
  autoPlay = false,
  duration = 3000,
  style = {},
  imageStyle = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, duration);

      return () => clearInterval(interval);
    }
  }, [autoPlay, duration, images.length]);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true });
  }, [currentIndex]);

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <SliderItem
            item={item}
            parendStyles={styles}
            paginationIndex={currentIndex}
          />
        )}
        //onScroll={onScrollHandler}
      />
      <Pagination items={images} paginationIndex={currentIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  card: {
    width: width,
    height: 250,
    padding: 20,
  },
});

export default EzSlideshow;
