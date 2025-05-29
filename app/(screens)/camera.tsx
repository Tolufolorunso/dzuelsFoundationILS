import { CameraPermission } from '@/components/camera/CameraPermission';
import React, { useRef, useState } from 'react';
import {
  Pressable,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import Colors from '@/data/Colors';
import styles from '@/styles/camera.styles';
import ImagePreview from '@/components/camera/ImagePreview';
import { router, useLocalSearchParams } from 'expo-router';
import axiosClient from '@/utils/customFetch';
import customFetch from '@/utils/customFetch';
import usePatronStore from '@/store/patron.store';
// import * as ImageManipulator from "expo-image-manipulator";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView | null>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { barcode } = useLocalSearchParams();
  const { setImgUrl } = usePatronStore((state) => state);
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const uploadPhoto = async () => {
    setLoading(true);
    if (!picture) return;

    try {
      const res: { data: { imageUrl: string } } = await customFetch.post(
        '/patrons/upload',
        {
          photoData: `data:image/jpeg;base64,${picture.base64}`,
          barcode,
        }
      );

      setImgUrl(res?.data?.imageUrl);
      router.dismiss();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const res: CameraCapturedPicture | undefined =
      await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
      });

    if (res) {
      setPicture(res);
    }
  };

  if (picture) {
    return (
      <ImagePreview
        imageUri={picture.uri}
        setPicture={(uri: string) => setPicture(null)}
        onPress={uploadPhoto}
        loading={loading}
      />
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return <CameraPermission requestPermission={requestPermission} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash="auto"
        ref={cameraRef}
        pictureSize="480x640"
      ></CameraView>
      <View style={styles.cameraBtns}>
        <View />
        <Pressable style={styles.cameraShot} onPress={takePhoto}>
          <Entypo name="camera" size={24} color="black" />
        </Pressable>
        <Ionicons
          name="camera-reverse"
          size={30}
          color="black"
          onPress={toggleCameraFacing}
        />
      </View>
      <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;
