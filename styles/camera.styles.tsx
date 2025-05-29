import Colors from '@/data/Colors';
import { StyleSheet } from 'react-native';

const cameraStyles = StyleSheet.create({
  camera: {
    width: '100%',
    height: 400,
  },
  cameraBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
  },
  cameraShot: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: '50%',
    borderColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreviewContainer: {
    flex: 1,
  },
  previewImage: { width: '100%', height: 400 },
  retakeBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default cameraStyles;
