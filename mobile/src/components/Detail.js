import React, {useContext} from 'react';
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
import {AuthContext, LibraryContext} from '../../App';
import axios from 'axios';

const {height} = Dimensions.get('screen');

const Detail = route => {
  const {title, description, cover} = route.params;
  const {videos, navigator} = route;

  const [{user}] = useContext(AuthContext);
  const [{userLibrary, setUserLibrary}] = useContext(LibraryContext);

  const addToCollection = async () => {
    await axios
      .post('http://10.0.2.2:3000/api/library', {
        client_id: user.client_id,
        show_id: route.params.showId,
      })
      .then(response => {
        if (response.status === 200) {
          setUserLibrary(userLibrary.concat(route.params));
          Toast.show({
            type: 'success',
            text1: 'Миний сан хэсэгт нэмэгдсэн',
            position: 'top',
            visibilityTime: 1500,
          });
        }
      });
  };

  const watch = () => {
    if (videos.length > 0) {
      navigator.navigate('Watch', {
        videoURL: videos[0].file,
      });
    }
  };

  return (
    <View>
      <OrientationLocker orientation={PORTRAIT} />
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
        <Text style={styles.textTitle}>{title}</Text>
        <Button
          mode={'contained'}
          text={'Шууд үзэх'}
          color={'black'}
          icon={'play'}
          callback={watch}
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
