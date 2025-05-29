import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderColor: 'gainsboro',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 5,

    marginTop: 4,
    marginBottom: 2,
  },
  errorInput: {
    borderColor: 'crimson',
  },
  error: {
    color: 'crimson',
    height: 17,
  },
  label: {
    fontWeight: '600',
    color: 'dimgray',
  },
});

export default styles;
