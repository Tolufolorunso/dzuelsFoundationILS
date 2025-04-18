import Colors from '@/data/Colors';
import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  statBox: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default homeStyles;
