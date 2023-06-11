import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import {AuthContext} from '../../App';

const Item = ({id, price, plan, plan_id, navigation}) => {
  let plan_detail = plan.includes('Month')
    ? plan[0] + ' сарын эрх'
    : plan[0] + ' жилын эрх';

  const [{setSubscription}] = useContext(AuthContext);

  const Transaction = async () => {
    await axios
      .post('http://10.0.2.2:3000/api/subscription', {
        client_id: id,
        plan_id: plan_id,
      })
      .then(response => {
        setSubscription(response.data);
        Toast.show({
          type: 'success',
          text1: `Амжилттай ${plan_detail} авлаа`,
          text2: 'Хүссэн цувралаа та хязгааргүй үзэх боломжтой боллоо',
        });

        navigation.navigate('MainScreen');
      })
      .catch(err => {
        if (err.response) {
          console.log('error on getting subscription');
          console.log(err.response.status);
        } else {
          console.log('Error', err.message);
        }
      });
  };
  return (
    <TouchableOpacity style={styles.field} onPress={Transaction}>
      <Text style={[styles.text, {marginLeft: 15}]}>{plan_detail}</Text>
      <Text style={[styles.text, {marginRight: 15}]}>{price} ₮</Text>
    </TouchableOpacity>
  );
};

const Subscription = ({navigation}) => {
  const [data, setData] = useState({
    list: [],
    isLoading: true,
  });

  const [{user}] = useContext(AuthContext);

  const fetchPlan = async () => {
    const subscription_plan = await axios
      .get('http://10.0.2.2:3000/api/subscription/plan')
      .catch(function (err) {
        if (err.response) {
          console.log(err.response.status);
        } else {
          console.log('Error', err.message);
        }
      });

    setData({
      list: subscription_plan.data,
      isLoading: false,
    });
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <View style={styles.container}>
      {data.isLoading ? (
        <ActivityIndicator
          style={styles.indicator}
          animating={true}
          color={MD2Colors.red800}
          size={'large'}
        />
      ) : (
        <FlatList
          horizontal={false}
          data={data.list}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Item
                id={user.client_id}
                plan_id={item.id}
                price={item.plan_price}
                plan={item.plan_details}
                navigation={navigation}
              />
            );
          }}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          keyExtractor={(item, index) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  field: {
    width: '100%',
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    height: 60,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Lato-Bold',
    color: 'white',
    fontSize: 16,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Subscription;
