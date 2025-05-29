import React from 'react';
import { View, Text } from 'react-native';
import styles from './header.styles';

type HeaderProps = {
  title: string;
  type?: number;
  style?: object;
};

const Header: React.FC<HeaderProps> = ({ title, style, type = 1 }) => {
  const styleToApply = () => {
    switch (type) {
      case 1:
        return styles.title1;
      case 2:
        return styles.title2;
      case 3:
        return styles.title3;
      default:
        return styles.title1;
    }
  };
  return (
    <View>
      <Text style={[styleToApply(), style]}>{title}</Text>
    </View>
  );
};

export default Header;
