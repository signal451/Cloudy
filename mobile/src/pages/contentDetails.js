import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import Detail from '../components/Detail';
import Preview from '../components/shared/Preview';
import axios from 'axios';

// add data loading fetch loading indicator
const Content = ({route, navigation}) => {
  const {showId} = route.params;
  const [data, setData] = useState({
    list: [],
    season: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      setData({
        isLoading: true,
      });

      // i need to handle this section
      const seasonList = await axios
        .get(`http://10.0.2.2:3000/api/season/${showId}`)
        .catch(function (err) {
          if (err.response) {
            console.log(err.response.status);
          } else {
            console.log('Error', err.message);
          }
        });

      // unhandled promise rejection here ... when data is not found seasonList is empty so it can't read data[0]
      const episodelist = await axios
        .get(
          `http://10.0.2.2:3000/api/shows/${seasonList.data[0].season_num}/${showId}`,
        )
        .catch(function (err) {
          if (err.response) {
            console.log(err.response.status);
          } else {
            console.log('Error', err.message);
          }
        });

      setData({
        list: episodelist.data,
        season: seasonList.data,
        isLoading: false,
      });
    };

    fetchDetails();
  }, [showId]);

  return (
    <View style={styles.container}>
      {data.isLoading ? (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          animating={true}
          color={MD2Colors.red800}
          size={'large'}
        />
      ) : (
        <FlatList
          horizontal={false}
          data={data.list}
          ListHeaderComponent={<Detail {...route} />}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Preview
                navigator={navigation}
                thumbnail={item.thumbnail}
                title={item.ep_title}
                file={item.file}
                num={index}
              />
            );
          }}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          keyExtractor={(item, index) => 'key' + index}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    color: 'white',
  },
});

export default Content;
