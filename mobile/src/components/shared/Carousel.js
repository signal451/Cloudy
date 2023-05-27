import React from 'react';
import {FlatList} from 'react-native';
import Item from './Item';

const Carousel = ({data}) => {
  return (
    <FlatList
      horizontal={true}
      data={data}
      renderItem={({item}) => <Item {...item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Carousel;
