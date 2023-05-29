import React from 'react';
import {Button as Btn} from 'react-native-paper';

const Button = props => {
  const {
    mode,
    color,
    text,
    callback,
    isLoading,
    style,
    label,
    iconAlign,
    icon,
  } = props;
  return (
    <Btn
      icon={icon}
      mode={mode}
      textColor={color}
      style={style}
      onPress={callback}
      loading={isLoading}
      labelStyle={label}
      contentStyle={iconAlign}>
      {text}
    </Btn>
  );
};

export default Button;
