import React, {createContext, useEffect, useState} from 'react';
import {StatusBar, SafeAreaView, FlatList} from 'react-native';
import Category from '../components/shared/Category';
import axios from 'axios';
import HorizontalList from '../components/shared/HorizontalList';

const ShowsContext = createContext(null);

const Home = ({navigation}) => {
  const [data, setData] = useState({
    items: [],
    trending: [],
    isLoading: true,
  });

  const fetchShows = async () => {
    setData({
      isLoading: true,
    });

    const shows = await axios
      .get('http://10.0.2.2:3000/api/shows/')
      .catch(function (err) {
        if (err.response) {
          console.log(err.response.status);
        } else {
          console.log('Error', err.message);
        }
      });

    let temp = [];

    if (shows.data) {
      for (const items of shows.data) {
        if (items.category === 'Онцлох') {
          temp = items.contents;
        }
      }
    }

    setData({
      items: shows.data,
      trending: temp,
      isLoading: false,
    });
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <SafeAreaView>
      <ShowsContext.Provider value={navigation}>
        <StatusBar backgroundColor={'#07080F'} />
        <FlatList
          horizontal={false}
          ListHeaderComponent={
            <HorizontalList data={data.trending} navigate={'ContentDetails'} />
          }
          data={data.items}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            if (item.category !== 'Онцлох') {
              return <Category name={item.category} data={item.contents} />;
            }
          }}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          refreshing={data.isLoading}
          onRefresh={fetchShows}
          keyExtractor={item => item.id.toString()}
        />
      </ShowsContext.Provider>
    </SafeAreaView>
  );
};

export default Home;
export {ShowsContext};
