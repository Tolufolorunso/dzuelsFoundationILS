import React from 'react';
import { Text, View } from 'react-native';
import Button from '../shared/Button';

type CameraPermissionProps = {
  requestPermission: () => void;
};

export const CameraPermission: React.FC<CameraPermissionProps> = ({
  requestPermission,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          paddingBottom: 10,
          textTransform: 'capitalize',
        }}
      >
        We need your permission to show the camera
      </Text>
      <Button onPress={requestPermission} text="Grant Permission" />
    </View>
  );
};
