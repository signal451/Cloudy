import React from 'react';
import ReadMore from '@fawazahmed/react-native-read-more';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import PlayButton from './shared/PlayButton';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';

const {width, height} = Dimensions.get('screen');

const Detail = route => {
  const {title, description, cover} = route.params;

  return (
    <View>
      <OrientationLocker
        orientation={PORTRAIT}
        onDeviceChange={orientation =>
          console.log('onDeviceChange', orientation)
        }
      />
      <View style={styles.cover}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={{
            uri: cover,
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}> {title} </Text>
        <PlayButton />
        <ReadMore
          numberOfLines={3}
          style={styles.textRegular}
          seeMoreStyle={styles.more}
          seeLessStyle={styles.more}>
          {description}
        </ReadMore>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: height / 4,
    borderRadius: 10,
    backgroundColor: 'gray',
    resizeMode: 'cover',
  },
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  more: {
    color: '#808080',
  },
  textRegular: {
    fontFamily: 'Lato-Regular ',
    color: 'white',
    lineHeight: 23,
    marginTop: 10,
    paddingLeft: 5,
    fontSize: 15,
  },
  textTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    color: 'white',
  },
});

export default Detail;
