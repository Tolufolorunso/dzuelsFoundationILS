import Colors from '@/data/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'singleDay',
    color: Colors.PRIMARY,
    marginBottom: 30,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  buttonContainer: {
    width: '46%', // Two buttons per row with some space in between
  },
  button: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.8,
  },

  holdsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  holdsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 15,
  },
  holdsNoDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.GRAY,
  },
  holdsCard: {
    gap: 3,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  holdsPatronName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  holdsBookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 5,
  },
  holdsDetails: {
    fontSize: 14,
    color: Colors.GRAY,
  },
});

export default styles;
