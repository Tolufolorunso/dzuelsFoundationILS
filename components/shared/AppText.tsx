import { Text } from 'react-native';
import React from 'react';

export default function AppText({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}) {
  return <Text style={[{}]}>{children}</Text>;
}
