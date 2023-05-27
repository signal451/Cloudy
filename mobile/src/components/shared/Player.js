import React from 'react';
import {View, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-media-console';

const Player = props => {
  const {url, navigator} = props;

  return (
    <View style={styles.videoPreview}>
      <VideoPlayer
        source={{
          uri: url,
        }}
        navigator={navigator}
        seekColor={'#E50914'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoPreview: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
});

export default Player;
