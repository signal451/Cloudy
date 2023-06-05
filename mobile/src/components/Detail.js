import React, {useState} from 'react';
import ReadMore from '@fawazahmed/react-native-read-more';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import Button from './shared/Button';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const {height} = Dimensions.get('screen');

const Detail = route => {
  const {title, description, cover} = route.params;

  const addToCollection = () => {
    Toast.show({
      type: 'success',
      text1: 'Миний сан хэсэгт нэмэгдсэн',
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

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
        <Button
          mode={'contained'}
          text={'Шууд үзэх'}
          color={'black'}
          icon={'play'}
          style={styles.playButton}
        />

        <ReadMore
          numberOfLines={3}
          style={styles.textRegular}
          seeMoreStyle={styles.more}
          seeLessStyle={styles.more}>
          {description}
        </ReadMore>
        <TouchableOpacity style={styles.addColection} onPress={addToCollection}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="check" size={30} color="white" />
            <Text style={styles.textAddCollection}> Миний сан </Text>
          </View>
        </TouchableOpacity>
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
  playButton: {
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  textTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    color: 'white',
  },
  addColection: {
    width: 100,
    marginTop: 10,
  },
  textAddCollection: {
    color: 'white',
    fontSize: 13,
  },
});

export default Detail;
