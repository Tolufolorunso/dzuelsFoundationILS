import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Colors from "@/data/Colors";
import { useHolds } from "@/hooks/useHolds";

export default function HoldScreen() {
  const { holds, loading } = useHolds();

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Patrons with Overdue Books</Text>
      <Text style={[styles.header, { textAlign: "center" }]}>
        Total: {holds.length}
      </Text>
      <FlatList
        data={holds}
        keyExtractor={(item: any) => item.patronBarcode + item.itemBarcode}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.patronName}>{item.patronName}</Text>
            <Text style={styles.bookTitle}>
              {item.title} {item.subtitle && `- ${item.subtitle}`}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginBottom: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.GRAY,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  patronName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 5,
  },
  details: {
    fontSize: 14,
    color: Colors.GRAY,
  },
});
