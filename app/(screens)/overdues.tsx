import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
} from "react-native";
import Colors from "@/data/Colors";
import { useHolds } from "@/hooks/useHolds";

interface HoldItem {
  patronBarcode: string;
  patronName: string;
  title: string;
  borrowingDate: string | Date;
  dueDate: string | Date;
  // Add other properties as needed
}

export default function OverduesScreen() {
  const { holds, loading } = useHolds();
  const [selectedStudent, setSelectedStudent] = useState<HoldItem | null>(null);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  console.log(holds);

  const renderItem: ListRenderItem<HoldItem> = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedStudent(item)}
    >
      <Text style={styles.text}>{index + 1}.</Text>
      <Text style={styles.text}>{item.patronName}</Text>
      <Text style={styles.text}>{item.patronBarcode}</Text>
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>
        {new Date(item.borrowingDate).toLocaleString()}
      </Text>
      <Text style={styles.text}>{new Date(item.dueDate).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overdue Books</Text>
      <FlatList
        data={holds}
        keyExtractor={(item, index) => `${item.patronBarcode}-${index}`}
        renderItem={renderItem}
      />

      {/* Modal for Student Details */}
      {selectedStudent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedStudent}
          onRequestClose={() => setSelectedStudent(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Student Details</Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Full Name:</Text>{" "}
                {selectedStudent.patronName}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Barcode:</Text>{" "}
                {selectedStudent.patronBarcode}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Gender:</Text> Female
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Address:</Text> NO 4, OKE BOLA STREET
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>School:</Text> APOSTOLIC PILOT SCHOOL
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Class:</Text> PRY 3
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Parent Number:</Text> 08068750702
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedStudent(null)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginBottom: 15,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    alignItems: "center",
  },
  closeText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});
