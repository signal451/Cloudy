import React from 'react';
import {StyleSheet, Dimensions, View, Text, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const Slider = () => {
  const width = Dimensions.get('window').width;

  const data = [
    {
      image:
        'https://api.playmo.mn/storage/images/media/cover/md/RqyXKNhIYHFtnWKXzrmluLSwTQjl8rj7Rg1lVBj6.jpg',
    },
    {
      image:
        'https://api.playmo.mn/storage/images/media/cover/md/0mFFAjziTe6PdzcDyqfSzEDwDMbf0YzyrxWX3hyl.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={width / 2}
        windowSize={2}
        mode="left-align"
        autoPlay={true}
        data={data}
        loop={true}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetY: [-10, 10],
        }}
        renderItem={({item}) => (
          <View style={styles.slider}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 5,
    marginRight: 10,
    borderRadius: 15,
  },
  image: {
    height: 200,
    borderRadius: 15,
  },
});

export default Slider;
