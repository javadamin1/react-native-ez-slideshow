import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const {width} = Dimensions.get('screen');

const Pagination = ({ items, scrollX }) => {
  return (
    <View style={styles.container}>
      {
        items.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: 'clamp'
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp'
        });

          return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { width: dotWidth, opacity, transform: [{ scaleX: -1 }] }
            ]}
          />
        );
      })}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:-20,
    flexDirection:'row',
    height:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:  'transparent',
  },
  dot: {
   backgroundColor:'#aaa',
    height:8,
    marginHorizontal: 4,
    borderRadius:8,
  },
});

export default Pagination;
