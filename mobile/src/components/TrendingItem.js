import React, {useContext} from 'react';
import {StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import {ShowsContext} from '../pages/home';

const {height} = Dimensions.get('screen');

const TrendingItem = props => {
  const navigation = useContext(ShowsContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(props.navigateTo, {
          showId: props.id,
          title: props.title,
          description: props.description,
          cover: props.cover_image,
        })
      }>
      <Image
        style={styles.image}
        source={{
          uri: props.trending_image,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  image: {
    width: 400,
    height: height / 4,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default TrendingItem;
