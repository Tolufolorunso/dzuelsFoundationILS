import React from "react";
import { Text, View } from "react-native";
import styles from "@/styles/home.styles";

export function LastRegisteredMember({
  fullname,
  barcode,
}: {
  fullname: string;
  barcode: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Last Registered</Text>
      <Text style={styles.statLabel}>
        Name: <Text style={styles.statValue}>{fullname}</Text>
      </Text>
      <Text style={styles.statLabel}>
        Barcode: <Text style={styles.statValue}>{barcode}</Text>
      </Text>
    </View>
  );
}
