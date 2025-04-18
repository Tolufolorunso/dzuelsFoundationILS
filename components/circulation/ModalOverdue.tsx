import React from 'react';
import styles from '@/styles/overdue.styles';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from 'react-native';
import { HoldItem } from '@/app/(screens)/overdues';

interface Student {
  patronName: string;
  patronBarcode: string;
  // Add other student properties here if needed
}

interface ModalOverdueProps {
  selectedStudent: Student | null;
  setSelectedStudent: (student: HoldItem | null) => void;
  patronImage: { uri: string } | null;
}

const ModalOverdue: React.FC<ModalOverdueProps> = ({
  selectedStudent,
  setSelectedStudent,
  patronImage,
}) => {
  if (!selectedStudent) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedStudent}
      onRequestClose={() => setSelectedStudent(null)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Student Details</Text>
          {/* <Image source={patronImage} style={styles.image} /> */}
          <Text style={styles.modalText}>
            <Text style={styles.bold}>Full Name:</Text>{' '}
            {selectedStudent.patronName}
          </Text>
          <Text style={styles.modalText}>
            <Text style={styles.bold}>Barcode:</Text>{' '}
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
  );
};

export default ModalOverdue;
