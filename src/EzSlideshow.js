import React, {useState, useEffect, useRef}               from 'react';
import {View, FlatList, StyleSheet, Dimensions, Animated} from 'react-native';
import SliderItem                                         from './SliderItem';
import Pagination                                         from "./Pagination";

const {width} = Dimensions.get('screen');

const EzSlideshow = ({
    images = [],
    autoPlay = false,
    duration = 3000,
    style = {},
    imageStyle = {}
}) => {

    if (Object.keys(images).length === 0) {
        return null;
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef                     = useRef(null);
    const scrollX                         = useRef(new Animated.Value(0)).current;

    // AutoPlay
    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            }, duration);

            return () => clearInterval(interval);
        }
    }, [autoPlay, duration, images.length]);


    const [isListReady, setIsListReady] = useState(false);

    useEffect(() => {
        if (isListReady && flatListRef.current && images.length > 0) {
            flatListRef.current.scrollToIndex({index: currentIndex, animated: true});
        }
    }, [currentIndex, images, isListReady]);


    return (
        <View style={[styles.container, style]}>
            <FlatList
                ref={flatListRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    <SliderItem item={item} parentStyles={styles} paginationIndex={currentIndex} imageStyle={imageStyle}/>
                )}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                onLayout={() => setIsListReady(true)}  // لیست آماده شد
                scrollEventThrottle={16}
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index
                })}
                inverted={true}
            />
            <Pagination items={images} scrollX={scrollX}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
    },
    card     : {
        width  : width,
        height : 250,
        padding: 20,
    }
});

export default EzSlideshow;
