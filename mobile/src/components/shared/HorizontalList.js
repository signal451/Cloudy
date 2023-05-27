import React from 'react';
import {FlatList, View} from 'react-native';
import TrendingItem from '../TrendingItem';

const HorizontalList = ({data, navigate}) => {
  return (
    <View>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({item}) => (
          <TrendingItem {...item} navigateTo={navigate} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default HorizontalList;
