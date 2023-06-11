import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {AuthContext, LibraryContext} from '../../App';
import Item from '../components/shared/LibraryItem';
import {ActivityIndicator} from 'react-native-paper';

const Library = ({navigation}) => {
  const [loading, setLoading] = useState([
    {
      is: true,
    },
  ]);

  const [{user}] = useContext(AuthContext);
  const [{userLibrary, setUserLibrary}] = useContext(LibraryContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading({
        is: true,
      });

      try {
        const shows = await axios.get(
          `http://10.0.2.2:3000/api/library/${user.client_id}`,
        );
        setLoading({
          is: false,
        });
        setUserLibrary(shows.data);
      } catch (err) {
        console.error(err);
        return;
      }
    };

    fetchData();
  }, [user.client_id, setUserLibrary]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
      }}>
      {loading.isLoading ? (
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
          data={userLibrary}
          numColumns={3}
          renderItem={({item}) => <Item {...item} navigator={navigation} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Library;
