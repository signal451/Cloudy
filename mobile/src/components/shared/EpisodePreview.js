import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const Preview = props => {
  const {navigator, thumbnail, title, file} = props;
  const episode_num = props.num + 1;

  const checkSubscription = () => {
    navigator.navigate('Watch', {
      videoURL: file,
    });
  };

  return (
    <TouchableOpacity style={styles.preview} onPress={checkSubscription}>
      <View>
        <Image
          style={styles.episodeImage}
          source={{
            uri: thumbnail,
          }}
        />
      </View>
      <View style={styles.episodeDetail}>
        <Text style={styles.episodeOrder}> {episode_num}-р анги </Text>
        <Text style={styles.episodeTitle}>
          {title !== undefined && title !== null ? title : null}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  preview: {
    marginTop: 20,
    marginLeft: 15,
    flexDirection: 'row',
  },
  episodeDetail: {
    justifyContent: 'center',
  },
  episodeImage: {
    width: 170,
    height: 90,
    borderRadius: 5,
    resizeMode: 'cover',
    backgroundColor: 'gray',
  },
  episodeOrder: {
    fontFamily: 'Lato-Bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 20,
  },
  episodeTitle: {
    fontFamily: 'Lato-Regular',
    color: 'white',
    fontSize: 13,
    paddingTop: 8,
    marginLeft: 20,
  },
});

export default Preview;
