import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, TextInput, View } from "react-native";
import Button from "../shared/Button";
import styles from "@/styles/home.styles";

interface SmsSectionProps {
  message: string;
  setMessage: (text: string) => void;
  charCount: number;
  recipient: string;
  setRecipient: (value: string) => void;
  handleSendMessage: () => void;
}

export function SmsSection({
  message,
  setMessage,
  charCount,
  recipient,
  setRecipient,
  handleSendMessage,
}: SmsSectionProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Send Bulk SMS</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Text style={styles.charCount}>Characters: {charCount}</Text>

      <Picker
        selectedValue={recipient}
        onValueChange={setRecipient}
        style={styles.picker}
      >
        <Picker.Item label="Students" value="students" />
        <Picker.Item label="Staff" value="staff" />
        <Picker.Item label="Guests" value="guests" />
      </Picker>

      <TextInput style={styles.input} value="Dzuels" editable={false} />
      <Button text="Send Message" onPress={handleSendMessage} />
    </View>
  );
}