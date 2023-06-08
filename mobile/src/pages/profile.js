import React, {useContext} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../App';

const Profile = ({navigation}) => {
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('@access');
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  const [{user, setUser, subscription}] = useContext(AuthContext);

  // TODO
  //     1. make this part as component

  return (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Image
          source={{
            uri: user.profile_image,
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
                <Icon name="calendar-blank-outline" size={24} color="white" />
              </View>
              <Text style={styles.days}>
                {subscription.totalDays !== null ? subscription.totalDays : 0}
              </Text>
              <Text style={styles.small}>үлдсэн хоног</Text>
            </View>
            <View style={{paddingRight: 15}}>
              <Icon name="chevron-right" size={24} color="white" />
            </View>
          </View>
        </TouchableOpacity>
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
