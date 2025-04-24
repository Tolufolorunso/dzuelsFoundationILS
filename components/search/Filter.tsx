import React from "react";
import styles from "@/styles/search.styles";
import { Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../shared/Button";

interface FilterProps {
  surname: string;
  setSurname: (text: string) => void;
  barcode: string;
  setBarcode: (text: string) => void;
  type: "any" | "staff" | "student";
  setType: (value: "any" | "staff" | "student") => void;
  clearFilters: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  surname,
  setSurname,
  barcode,
  setBarcode,
  type,
  setType,
  clearFilters,
}) => {
  return (
    <View style={styles.filters}>
      <Text style={styles.heading}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Barcode"
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="numeric"
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Picker
          selectedValue={type}
          onValueChange={setType}
          style={styles.picker}
        >
          <Picker.Item label="Any" value="any" style={styles.pickerText} />
          <Picker.Item label="Staff" value="staff" style={styles.pickerText} />
          <Picker.Item
            label="Student"
            value="student"
            style={styles.pickerText}
          />
        </Picker>
      </View>
      <Button text="CLEAR SEARCH" onPress={clearFilters} size="small" />
    </View>
  );
};
