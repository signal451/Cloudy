import React, {useContext} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AuthContext} from '../../App';

const Header = ({back, navigation, route}) => {
  const [{user}] = useContext(AuthContext);

  const goBack = () => {
    if (route.params.dest) {
      navigation.goBack();
      navigation.navigate(route.params.dest);
    } else {
      return navigation.goBack();
    }
  };

  return (
    <Appbar.Header style={styles.background}>
      {back ? (
        <Appbar.BackAction onPress={goBack} color="white" size={25} />
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
