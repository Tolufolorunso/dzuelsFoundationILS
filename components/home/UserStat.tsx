import styles from '@/styles/home.styles';
import { View } from 'react-native';
import StatItem from './StatItem';

interface UserStatProps {
  numOfFemale: number;
  numOfMale: number;
  numOfStaff: number;
  numOfguest: number;
  numOfTeacher: number;
}

export function UserStat({
  numOfFemale,
  numOfMale,
  numOfStaff,
  numOfguest,
  numOfTeacher,
}: UserStatProps) {
  return (
    <View style={[styles.section, { borderRadius: 8 }]}>
      <StatItem row label="Students" value={numOfFemale + numOfMale} />
      <StatItem row label="Staff" value={numOfStaff} />
      <StatItem row label="Guests" value={numOfguest} />
      <StatItem row label="Teachers" value={numOfTeacher} />
    </View>
  );
}
