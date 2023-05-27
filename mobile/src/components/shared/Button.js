import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as Btn} from 'react-native-paper';

const Button = props => {
  const {mode, color, text, callback, isLoading, style} = props;
  return (
    <Btn
      mode={mode}
      textColor={color}
      style={style}
      onPress={callback}
      loading={isLoading}>
      {text}
    </Btn>
  );
};

export default Button;
