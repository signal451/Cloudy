import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const PlayButton = props => {
  return (
    <Button
      icon="play"
      mode="contained"
      textColor="black"
      style={styles.button}
      onPress={() => console.log('button is click')}>
      Шууд үзэх
    </Button>
  );
};
// this stylesheet objects are reduntant
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default PlayButton;
