import React, { useState } from "react";
import styles from "@/styles/patron.styles";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

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

  const uploadImageToBackend = async (imageBase64: string) => {
    try {
      setIsUploading(true);

      const response = await fetch(
        `https://dzuelsfoundation.vercel.app/api/patrons/upload/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photoData: imageBase64,
            barcode: barcode,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "Failed to upload image");
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to upload image"
      );
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async () => {
    if (isUploading) return;

    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "We need permissions to access your photos"
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const selectedImage = result.assets[0];
        const imageUri = selectedImage.uri;

        // Set the local image URL immediately for better UX
        setImageUrl(imageUri);

        if (selectedImage.base64) {
          try {
            // Upload the image to the backend
            const newImageUrl = await uploadImageToBackend(
              `data:image/jpeg;base64,${selectedImage.base64}`
            );
            // Update with the secure URL from Cloudinary
            if (newImageUrl) {
              setImageUrl(newImageUrl);
              Alert.alert("Success", "Profile image updated successfully");
            }
          } catch (error) {
            console.log(error);
            setImageUrl(imageUrl);
          }
        } else {
          Alert.alert("Error", "Could not get image data");
        }
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image");
    }
  };

  return (
    <TouchableOpacity onPress={handleImageChange} disabled={isUploading}>
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
