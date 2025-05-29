import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginVertical: 2,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonEdit: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#FF5722',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
