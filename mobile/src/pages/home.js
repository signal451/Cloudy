import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import Category from '../components/shared/Category';
import HorizontalList from '../components/shared/HorizontalList';
import {AuthContext} from '../../App';
import axios from 'axios';

const ShowsContext = createContext(null);

const Home = ({navigation}) => {
  const [{user, setSubscription}] = useContext(AuthContext);

  const [data, setData] = useState({
    items: [],
    trending: [],
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
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

    const subscription = await axios
      .get(`http://10.0.2.2:3000/api/subscription/${user.id}`)
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
          break;
        }
      }
    }

    setSubscription(subscription.data);
    setData({
      items: shows.data,
      trending: temp,
      isLoading: false,
    });
  }, [user.id, setSubscription]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView>
      <ShowsContext.Provider value={navigation}>
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
          onRefresh={fetchData}
          keyExtractor={item => item.id.toString()}
        />
      </ShowsContext.Provider>
    </SafeAreaView>
  );
};

export default Home;
export {ShowsContext};