import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Button from '../components/shared/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const SignUp = ({navigation}) => {
  const [fieldData, setFieldData] = useState({
    username: '',
    phone_number: '',
    password: '',
  });

  const handleFieldChange = (field, text) => {
    setFieldData(prev => ({
      ...prev,
      [field]: text,
    }));
  };

  const userRegister = async () => {
    await axios
      .post('http://10.0.2.2:3000/api/auth/signup', {
        username: fieldData.username,
        phone_number: fieldData.phone_number,
        password: fieldData.password,
      })
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `${fieldData.username} хаяг амжилттай үүссэн`,
        });

        setFieldData({
          username: '',
          phone_number: '',
          password: '',
        });
        return navigation.navigate('Login');
      })
      .catch(function (err) {
        if (err.response) {
          Toast.show({
            type: 'error',
            text1: 'Алдаа гарлаа❗',
            text2: err.message,
          });
        } else {
          console.log('Error', err);
        }
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        label="Username"
        value={fieldData.username}
        onChangeText={text => handleFieldChange('username', text)}
        inputMode="text"
        cursorColor={'white'}
        placeholder="Нэр"
        placeholderTextColor={'#B3B3B3'}
        style={styles.textInput}
      />
      <TextInput
        label="Phone"
        value={fieldData.phone_number}
        onChangeText={text => handleFieldChange('phone_number', text)}
        inputMode="text"
        maxLength={8}
        cursorColor={'white'}
        placeholder="Утас"
        placeholderTextColor={'#B3B3B3'}
        style={styles.textInput}
      />
      <TextInput
        label="Password"
        value={fieldData.password}
        onChangeText={text => handleFieldChange('password', text)}
        inputMode="text"
        cursorColor={'white'}
        secureTextEntry={true}
        placeholder="Нууц үг"
        placeholderTextColor={'#B3B3B3'}
        style={styles.textInput}
      />
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Button
          mode={'contained'}
          text={'Бүртгүүлэх'}
          color={'black'}
          callback={userRegister}
          style={styles.signUp}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  signUp: {
    width: '90%',
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default SignUp;
