import Colors from '@/data/Colors';
import { StyleSheet } from 'react-native';

const overdueStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 15,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textTransform: 'capitalize',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  modalImage: {
    width: '100%',
    // height: 150,
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default overdueStyles;
