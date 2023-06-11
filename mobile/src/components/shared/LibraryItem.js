import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';

const Item = props => {
  const navigation = props.navigator;
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ContentDetails', {
            showId: props.show_id,
            title: props.title,
            description: props.description,
            cover: props.cover_image,
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
