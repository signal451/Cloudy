import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';

const Item = props => {
  const navigation = props.navigator;
  console.log('show id: ' + props.show_id);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ContentDetails', {
            show_id: props.show_id,
            title: props.title,
            description: props.description,
            cover_image: props.cover_image,
            dest: 'Collection',
          })
        }>
        <Image
          style={styles.image}
          source={{
            uri: props.featured_image,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 10,
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
});

export default Item;
