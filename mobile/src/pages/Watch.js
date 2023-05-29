import React from 'react';
import {View, StyleSheet} from 'react-native';
import Player from '../components/shared/Player';
import {OrientationLocker, LANDSCAPE} from 'react-native-orientation-locker';

const Watch = ({route, navigation}) => {
  const {videoURL} = route.params;

  return (
    <View style={styles.container}>
      <Player url={videoURL} navigator={navigation} />
      <OrientationLocker orientation={LANDSCAPE} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Watch;
