import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {AuthContext} from '../../App';
import Item from '../components/shared/LibraryItem';
import {ActivityIndicator} from 'react-native-paper';

const Library = ({navigation}) => {
  const [myShows, setMyShows] = useState([
    {
      list: [],
      isLoading: true,
    },
  ]);

  const [{user}] = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setMyShows({
        isLoading: true,
      });

      try {
        const shows = await axios.get(
          `http://10.0.2.2:3000/api/library/${user.client_id}`,
        );
        setMyShows({
          list: shows.data,
          isLoading: false,
        });
      } catch (err) {
        console.error(err);
        return;
      }
    };

    fetchData();
  }, [user.client_id]);

  return (
    <View
      style={{
        flex: 1,
        marginLeft: 10,
      }}>
      {myShows.isLoading ? (
        <ActivityIndicator
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          animating={true}
          color={'#c62828'}
          size={'large'}
        />
      ) : (
        <FlatList
          data={myShows.list}
          numColumns={3}
          renderItem={({item}) => <Item {...item} navigator={navigation} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Library;
