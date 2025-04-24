import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import styles from "@/styles/camera.styles";
import Button from "../shared/Button";

type ImagePreviewProps = {
  imageUri: string;
  setPicture: (uri: string) => void | null;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUri,
  setPicture,
}) => {
  return (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: imageUri }} style={styles.previewImage} />
      <View
        style={[
          styles.cameraBtns,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Button text="Upload" onPress={() => console.log("upload")} />
      </View>

      <TouchableOpacity
        onPress={() => setPicture("")}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text>Retake</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePreview;
