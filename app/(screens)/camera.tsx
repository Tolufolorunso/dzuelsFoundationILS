import { CameraPermission } from "./../../components/camera/CameraPermission";
import React, { useRef, useState } from "react";
import { Pressable, View, ActivityIndicator } from "react-native";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

import Colors from "@/data/Colors";
import styles from "@/styles/camera.styles";
import ImagePreview from "@/components/camera/ImagePreview";
import * as ImageManipulator from "expo-image-manipulator";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView | null>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);

  //   useEffect(() => {
  //     if (permission && !permission.granted && permission.canAskAgain) {
  //       requestPermission();
  //     }
  //   }, [permission]);

  //   if (permission?.granted) {
  //     return <ActivityIndicator />;
  //   }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
    const smallest = sizes[0];

    const res: CameraCapturedPicture | undefined =
      await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.4,
      });

    if (res) {
      setPicture(res);
      console.log(res, "out");
      // const resized = ImageManipulator.useImageManipulator(res.uri).crop({
      //   originX: 0,
      //   originY: 0,
      //   width: 200,
      //   height: 200,
      // });

      //   console.log(resized, "base64");
    }
  };

  if (picture) {
    return (
      <ImagePreview
        imageUri={picture.uri}
        setPicture={(uri: string) => setPicture(null)}
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
        pictureSize="352x288"
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
    </View>
  );
};

export default CameraScreen;
