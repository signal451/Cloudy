import React, {useContext} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AuthContext} from '../../App';

const Header = ({back, navigation}) => {
  const [{user}] = useContext(AuthContext);
  return (
    <Appbar.Header style={styles.background}>
      {back ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color="white"
          size={25}
        />
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image
            source={{
              uri: user.profile_image,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
      <Appbar.Action icon="search" color="#FFFFFF" size={25} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#07080F',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default Header;
