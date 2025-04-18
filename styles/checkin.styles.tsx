import Colors from '@/data/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.PRIMARY,
  },

  formContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },

  form: {
    flex: 1,
    gap: 16,
    // flexGrow: 1,
  },

  //   buttonContainer: {
  //     marginTop: 'auto',
  //   },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: 300,
    alignItems: 'center',
  },
  cameraText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  flipCamera: {
    padding: 20,
  },
});
export default styles;
