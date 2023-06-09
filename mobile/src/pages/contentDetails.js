import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Detail from '../components/Detail';
import Preview from '../components/shared/EpisodePreview';
import axios from 'axios';

const Content = ({route, navigation}) => {
  const {show_id} = route.params;
  const [data, setData] = useState({
    list: [],
    totalSeason: [],
    isLoading: true,
  });

  const fetchEpisodes = useCallback(async () => {
    setData({
      isLoading: true,
    });

    const seasons = await axios
      .get(`http://10.0.2.2:3000/api/season/${show_id}`)
      .catch(function (err) {
        if (err.response) {
          console.log(err.response.status);
        } else {
          console.log('Error', err.message);
        }
      });

    if (seasons.data.length > 0) {
      const episodes = await axios
        .get(
          `http://10.0.2.2:3000/api/season/${show_id}/${seasons.data[0].num}`,
        )
        .catch(function (err) {
          if (err.response) {
            console.log(err.response.status);
          } else {
            console.log('Error', err.message);
          }
        });

      setData({
        list: episodes.data,
        season: seasons.data,
        isLoading: false,
      });
    } else {
      setData({
        list: [],
        season: [],
        isLoading: false,
      });
    }
  }, [show_id]);

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

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
          color={'#c62828'}
          size={'large'}
        />
      ) : (
        <FlatList
          horizontal={false}
          data={data.list}
          ListHeaderComponent={
            <Detail {...route} navigator={navigation} videos={data.list} />
          }
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
