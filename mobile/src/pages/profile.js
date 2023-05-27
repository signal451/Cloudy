import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {AuthContext} from '../../App';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('@access');
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  const [{user, setUser, subscription, setSubscription}] =
    useContext(AuthContext);

  useEffect(() => {
    console.log('profile data fetch');
    // send request
    const fetchSubscription = async () => {
      const userSubscription = await axios
        .get(`http://10.0.2.2:3000/api/subscription/${user.id}`)
        .catch(function (err) {
          if (err.response) {
            console.log(err.response.status);
          } else {
            console.log('Error', err.message);
          }
        });

      setSubscription(userSubscription.data);
      setLoading(false);
    };

    fetchSubscription();
  }, [user.id, setSubscription]);

  return (
    <View style={styles.container}>
      {loading ? (
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
        <>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <Image
              source={{
                uri: user.image,
              }}
              style={styles.profile}
            />
          </View>
          <Text style={styles.regular}> {user.username} </Text>
          <View style={[styles.field, {marginTop: 35}]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('GetSubscription')}>
              <View style={styles.content}>
                <View style={styles.description}>
                  <View style={{paddingRight: 15, paddingLeft: 15}}>
                    <Icon
                      name="calendar-blank-outline"
                      size={24}
                      color="white"
                    />
                  </View>
                  <Text style={styles.days}>{subscription.totalDays}</Text>
                  <Text style={styles.small}>үлдсэн хоног</Text>
                </View>
                <View style={{paddingRight: 15}}>
                  <Icon name="chevron-right" size={24} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.field, {marginTop: 15}]}>
            <View style={[styles.content, {paddingTop: 5, paddingBottom: 5}]}>
              <View style={styles.description}>
                <View style={{paddingRight: 15, paddingLeft: 15}}>
                  <Icon name="qrcode" size={24} color="white" />
                </View>
                <Text style={styles.payment}>Төлбөрийн жагсаалт</Text>
              </View>
              <View style={{paddingRight: 15}}>
                <Icon name="chevron-right" size={24} color="white" />
              </View>
            </View>
          </View>
          <View style={[styles.field, {marginTop: 15}]}>
            <TouchableOpacity
              style={[styles.content, {paddingTop: 5, paddingBottom: 5}]}
              onPress={Logout}>
              <View style={styles.description}>
                <View style={{paddingRight: 15, paddingLeft: 15}}>
                  <FeatherIcon name="log-out" size={24} color="white" />
                </View>
                <Text style={styles.payment}>Системээс гарах</Text>
              </View>
              <View style={{paddingRight: 15}}>
                <Icon name="chevron-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: 'center',
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  regular: {
    fontFamily: 'Lato-Bold',
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
  field: {
    width: '95%',
    marginRight: 10,
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  days: {
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    color: 'white',
  },
  small: {
    width: 50,
    fontSize: 12,
    paddingLeft: 8,
    textAlign: 'left',
    color: 'white',
  },
  payment: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: 'white',
  },
});

export default Profile;
