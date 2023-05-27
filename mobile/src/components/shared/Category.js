import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Carousel from './Carousel';

const Category = ({name, data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {name} </Text>
      <Carousel data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Lato-Bold',
    color: 'white',
    fontSize: 18,
  },
});

export default Category;
