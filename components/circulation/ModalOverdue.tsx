import React, { useEffect } from 'react';
import styles from '@/styles/overdue.styles';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { HoldItemType } from '@/app/(screens)/overdues';
import customFetch from '@/utils/customFetch';

interface Student {
  patronName: string;
  patronBarcode: string;
  // Add other student properties here if needed
}

type ModalOverdueProps = {
  selectedStudent: Student | null;
  setSelectedStudent: (student: HoldItemType | null) => void;
};

const ModalOverdue: React.FC<ModalOverdueProps> = ({
  selectedStudent,
  setSelectedStudent,
}) => {
  const [patronImage, setPatronImage] = React.useState<string>('');

  useEffect(() => {
    const fetchPatronImage = async () => {
      const res = await customFetch.get<any>(
        `/patrons/image/${selectedStudent?.patronBarcode}`
      );
      const { imageData } = res.data;
      setPatronImage(imageData.imgUrl);
    };
    fetchPatronImage();
  }, [selectedStudent]);
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
          {!patronImage ? (
            <View
              style={[
                styles.modalImage,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <Text style={[styles.modalText, { color: '#fff' }]}>
                {selectedStudent.patronName}
              </Text>
            </View>
          ) : (
            <Image source={{ uri: patronImage }} style={styles.modalImage} />
          )}
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
