import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/shared/Button';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import {AuthContext} from '../../App';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const NavigateTo = () => navigation.navigate('SignUp');

  const displayToast = (message, type) => {
    Toast.show({
      type: type,
      text1: message.text1,
    });
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@access', JSON.stringify(value));
    } catch (e) {
      console.error('error happened when saving data to async storage: ' + e);
    }
  };

  const [{setUser}] = useContext(AuthContext);

  const Authentication = async () => {
    if (phone.length >= 8 && password.length > 0) {
      setIsLoading(true);
      await axios
        .post('http://10.0.2.2:3000/api/auth/login', {
          phone_number: phone,
          password: password,
        })
        .then(response => {
          setIsLoading(false);
          displayToast(
            {
              text1: 'Амжилттай нэвтэрлээ',
            },
            'success',
          );
          storeData(response.data);
          setUser(response.data);
        })
        .catch(function (err) {
          if (err.request.status === 400) {
            displayToast(
              {
                text1: 'Нууц үг буруу',
              },
              'error',
            );
            setIsLoading(false);
          } else {
            console.error(err);
          }
        });
    } else {
      displayToast(
        {
          text1: 'Нууц үг болон имейл хоосон байж болохгүй',
        },
        'error',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
        inputMode="numeric"
        maxLength={8}
        cursorColor={'white'}
        placeholder="Утасны дугаар"
        placeholderTextColor={'#B3B3B3'}
        style={styles.textInput}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        inputMode="text"
        cursorColor={'white'}
        secureTextEntry={true}
        placeholder="Нууц үг"
        placeholderTextColor={'#B3B3B3'}
        style={styles.textInput}
      />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Button
            mode={'contained'}
            text={'Нэвтрэх'}
            color={'black'}
            isLoading={isLoading}
            callback={Authentication}
            style={styles.Login}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Button
            mode={'outlined'}
            text={'Бүртгүүлэх'}
            color={'white'}
            callback={NavigateTo}
            style={styles.signUp}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 50,
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 15,
    color: 'white',
  },
  textRegular: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    paddingTop: 15,
    color: 'white',
  },
  Login: {
    width: '90%',
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  signUp: {
    width: '90%',
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#07080F',
  },
});

export default Login;
