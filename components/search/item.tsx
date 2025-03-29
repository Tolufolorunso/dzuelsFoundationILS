import React from "react";
import styles from "@/styles/search.styles";
import { Text, TouchableOpacity, View } from "react-native";

interface ItemProps {
  handlePatronDetail: (barcode: string) => void;
  barcode: string;
  surname: string;
  patronType: string;
  points: number;
}

export function Item({
  handlePatronDetail,
  barcode,
  surname,
  patronType,
  points,
}: ItemProps) {
  return (
    <TouchableOpacity onPress={() => handlePatronDetail(barcode)}>
      <View style={styles.row}>
        <Text style={styles.cell}>{barcode}</Text>
        <Text style={styles.cell}>{surname}</Text>
        <Text style={styles.cell}>{patronType}</Text>
        <Text style={styles.cell}>{points}</Text>
      </View>
    </TouchableOpacity>
  );
}
