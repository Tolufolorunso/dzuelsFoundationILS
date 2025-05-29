import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const FullLoadingActivityIndicator: React.FC<Props> = ({ children }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      {children}
    </View>
  );
};

export default FullLoadingActivityIndicator;
