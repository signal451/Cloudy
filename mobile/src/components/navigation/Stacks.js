import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';

import Header from '../../components/Header';

//pages
import Home from '../../pages/home';
import Library from '../../pages/library';

import Content from '../../pages/contentDetails';
import Watch from '../../pages/Watch';

//Stacks
const HomeStack = createNativeStackNavigator();
const CollectionStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ContentDetails" component={Content} />
      <HomeStack.Screen
        options={{headerShown: false}}
        name="Watch"
        component={Watch}
      />
    </HomeStack.Navigator>
  );
};

const CollectionStackScreen = () => {
  return (
    <CollectionStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <CollectionStack.Screen name="Collection" component={Library} />
    </CollectionStack.Navigator>
  );
};

const MainBottomTabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          marginBottom: 10,
        },
      }}
      initialRouteName="Main">
      <Tab.Screen
        name="Main"
        component={HomeStackScreen}
        options={({route}) => ({
          tabBarLabel: 'Нүүр',
          tabBarLabelStyle: styles.text,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#808080',
          tabBarIcon: ({color}) => (
            <FeatherIcon name="home" color={color} size={20} />
          ),
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Watch') {
              return {display: 'none'};
            }
            return {
              marginBottom: 10,
            };
          })(route),
        })}
      />

      <Tab.Screen
        name="Library"
        component={CollectionStackScreen}
        options={{
          tabBarLabel: 'Миний Сан',
          tabBarLabelStyle: styles.text,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#808080',
          tabBarIcon: ({color}) => (
            <FeatherIcon name="heart" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Bold',
    color: 'white',
    fontSize: 12,
  },
});

export {MainBottomTabNavigator};
