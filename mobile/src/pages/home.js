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
      .get(`http://10.0.2.2:3000/api/subscription/${user.client_id}`)
      .catch(function (err) {
        if (err.response) {
          console.log(err.response.status);
        } else {
          console.log('Error', err.message);
        }
      });

    setSubscription(subscription.data);
    setData({
      items: shows.data,
      isLoading: false,
    });
  }, [user.client_id, setSubscription]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView>
      <ShowsContext.Provider value={navigation}>
        <FlatList
          horizontal={false}
          // ListHeaderComponent={
          //   <HorizontalList data={data.trending} navigate={'ContentDetails'} />
          // }
          data={data.items}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <Category name={item.title} data={item.shows} />;
          }}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          refreshing={data.isLoading}
          onRefresh={fetchData}
          keyExtractor={(item, index) => index.toString()}
        />
      </ShowsContext.Provider>
    </SafeAreaView>
  );
};

export default Home;
export {ShowsContext};
