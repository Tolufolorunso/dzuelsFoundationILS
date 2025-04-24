import React, { useState } from "react";
import styles from "@/styles/patron.styles";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

interface ProfileImageProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  barcode: string | string[];
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function ProfileImage({
  imageUrl,
  setImageUrl,
  barcode,
}: ProfileImageProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/(screens)/camera");
      }}
      disabled={isUploading}
    >
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../assets/images/login-image.jpg")
        }
        style={styles.image}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.changeImageText}>
        {isUploading ? "Uploading..." : "Change Photo"}
      </Text>
    </TouchableOpacity>
  );
}
