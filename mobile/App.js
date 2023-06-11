import React, {useState, createContext, useEffect} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainBottomTabNavigator} from './src/components/navigation/Stacks';
import Profile from './src/pages/profile';
import Login from './src/pages/login';
import SignUp from './src/pages/signup';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Subscription from './src/pages/subscription';

const Theme = {
  ...DefaultTheme,
  colors: {
    background: '#07080F',
  },
};

const Stack = createNativeStackNavigator();
const AuthContext = createContext(null);
const LibraryContext = createContext(null);

const App = () => {
  // optimize re-rendering of the context
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [userLibrary, setUserLibrary] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('@access');
      if (data !== null) {
        const temp = JSON.parse(data);
        setUser(temp);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PaperProvider
      settings={{
        icon: props => <FeatherIcon {...props} />,
      }}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={'#07080F'} />
        <NavigationContainer theme={Theme}>
          <AuthContext.Provider
            value={[{user, setUser, subscription, setSubscription}]}>
            <LibraryContext.Provider value={[{userLibrary, setUserLibrary}]}>
              <Stack.Navigator>
                {user == null ? (
                  <Stack.Group>
                    <Stack.Screen
                      name="Login"
                      component={Login}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="SignUp"
                      component={SignUp}
                      options={{
                        title: 'Бүртгүүлэх',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                          fontFamily: 'Lato-Bold',
                        },
                        headerTintColor: 'white',
                        headerStyle: {
                          backgroundColor: '#07080F',
                        },
                      }}
                    />
                  </Stack.Group>
                ) : (
                  <Stack.Group>
                    <Stack.Screen
                      name="MainScreen"
                      component={MainBottomTabNavigator}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="ProfileScreen"
                      options={{
                        title: 'Миний хаяг',
                        headerTitleAlign: 'left',
                        headerTitleStyle: {
                          fontFamily: 'Lato-Bold',
                        },
                        headerTintColor: 'white',
                        headerStyle: {
                          backgroundColor: '#07080F',
                        },
                      }}
                      component={Profile}
                    />
                    <Stack.Screen
                      name="GetSubscription"
                      options={{
                        title: 'Эрх сунгах',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                          fontFamily: 'Lato-Bold',
                        },
                        headerTintColor: 'white',
                        headerStyle: {
                          backgroundColor: '#07080F',
                        },
                      }}
                      component={Subscription}
                    />
                  </Stack.Group>
                )}
              </Stack.Navigator>
            </LibraryContext.Provider>
          </AuthContext.Provider>
        </NavigationContainer>
      </SafeAreaProvider>
      <Toast />
    </PaperProvider>
  );
};

export default App;
export {AuthContext};
