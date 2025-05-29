import { Redirect } from 'expo-router';
import React from 'react';

const FormPage: React.FC = () => {
  return <Redirect href={'/createPatron/patronDetail'} />;
};

export default FormPage;
