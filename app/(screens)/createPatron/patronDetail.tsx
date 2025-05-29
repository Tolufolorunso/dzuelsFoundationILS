import { ScrollView, StyleSheet, Button, Text } from 'react-native';
import { patronDetail, patronDetailType } from '@/data/FormFields';
import CustomTextInput from '@/components/customTextIinput/CustomTextInput';
import { router } from 'expo-router';
import KeyboardAvoidingScrollView from '@/components/shared/KeyboardAvoidingScrollView';

const FormPage: React.FC = () => {
  const next = () => {
    router.push('/createPatron/patronAddress');
  };

  const handleChange = (value: string, name: string) => {
    console.log(`Field: ${name}, Value: ${value}`);
  };

  return (
    <KeyboardAvoidingScrollView>
      {patronDetail.map((item: patronDetailType) => {
        console.log(item);
        return (
          <CustomTextInput
            key={item.label}
            label={item.label}
            placeholder={item.placeholder}
            containerStyle={{ marginBottom: 15 }}
            onChangeText={(e) => handleChange(e, item.name)}
          />
        );
      })}
      <Button title="Next" onPress={next} />
    </KeyboardAvoidingScrollView>
  );
};

export default FormPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 12,
  },
  legend: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});
