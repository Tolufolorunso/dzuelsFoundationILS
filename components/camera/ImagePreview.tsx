import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import styles from '@/styles/camera.styles';
import Button from '../shared/Button';

type ImagePreviewProps = {
  imageUri: string;
  setPicture: (uri: string) => void | null;
  onPress: () => void;
  loading: boolean;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUri,
  setPicture,
  onPress,
  loading,
}) => {
  return (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: imageUri }} style={styles.previewImage} />
      <View
        style={[
          styles.cameraBtns,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Button text="Upload" onPress={onPress} loading={loading} />
      </View>

      <TouchableOpacity onPress={() => setPicture('')} style={styles.retakeBtn}>
        <Text>Retake</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePreview;
