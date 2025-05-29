import { LastRegisteredMember } from '../../components/home/LastRegisteredMember';
import { UserStat } from '../../components/home/UserStat';
import { SmsSection } from '../../components/home/SmsSection';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import useAuthStore from '@/store/auth.store';
import styles from '@/styles/home.styles';
import StatItem from '@/components/home/StatItem';
import customFetch from '@/utils/customFetch';
import TechDayEvent from '@/components/home/TechDayEvent';

type OverviewPros = {
  circulationStat: {
    totalOverdue: number;
    totalOverdueMoreThanAMonth: number;
    totalPatronsCheckedOutHistory: number;
  };
  lastRegisteredMember: {
    fullname: string;
    barcode: string;
  };
  membersStat: {
    numOfFemale: number;
    numOfMale: number;
    differenceBtwMaleAndFemale: number;
    numOfStaff: number;
    numOfTeacher: number;
    numOfguest: number;
  };
};

const HomeScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('students');

  const [circulationStat, setCirculationStat] = useState({
    totalOverdue: 0,
    totalOverdueMoreThanAMonth: 0,
    totalPatronsCheckedOutHistory: 0,
  });
  const [lastRegisteredMember, setLastRegisteredMember] = useState({
    fullname: '',
    barcode: '',
  });
  const [membersStat, setMembersStat] = useState({
    numOfFemale: 0,
    numOfMale: 0,
    differenceBtwMaleAndFemale: 0,
    numOfStaff: 0,
    numOfTeacher: 0,
    numOfguest: 0,
  });

  const [refreshing, setRefreshing] = useState(false);
  const { token, logout } = useAuthStore((state) => state);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await getLibraryOverview(); // Fetch updated data
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
    setRefreshing(false);
  };

  const handleSendMessage = useCallback(() => {
    alert('Message sent!');
  }, []);

  const getLibraryOverview = useCallback(async () => {
    try {
      const res = await customFetch.get('/overview');
      if (!res) return;
      const { circulationStat, lastRegisteredMember, membersStat } =
        res?.data as OverviewPros;
      setCirculationStat(circulationStat);
      setLastRegisteredMember(lastRegisteredMember);
      setMembersStat(membersStat);
    } catch (error: any) {
      if (error.message === 'jwt expired') logout();
    }
  }, [token, logout]);

  useEffect(() => {
    getLibraryOverview();
  }, [getLibraryOverview]);

  const charCount = useMemo(() => message.length, [message]);

  const stats = useMemo(
    () => [
      {
        label: 'Total Borrowed',
        value: circulationStat?.totalPatronsCheckedOutHistory,
      },
      { label: 'Total Overdues', value: circulationStat?.totalOverdue },
      {
        label: 'Overdue Over a Month',
        value: circulationStat?.totalOverdueMoreThanAMonth,
      },
    ],
    [circulationStat]
  );

  return (
    <FlatList
      data={[{}]}
      keyExtractor={() => 'home'}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      renderItem={() => (
        <View style={styles.container}>
          {/* Overview Section */}
          <View style={styles.row}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statBox}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* User Stats Section */}
          <UserStat {...membersStat} />

          {/* Gender Stats Section */}
          <View style={styles.row}>
            <StatItem label="Female" value={membersStat?.numOfFemale} />
            <StatItem label="Male" value={membersStat?.numOfMale} />
            <StatItem
              label="Difference"
              value={membersStat?.differenceBtwMaleAndFemale}
            />
          </View>

          {/* Last Registered */}
          <LastRegisteredMember {...lastRegisteredMember} />

          {/* Tech day event */}
          <TechDayEvent />

          {/* Bulk SMS Section */}
          <SmsSection
            message={message}
            setMessage={setMessage}
            charCount={charCount}
            recipient={recipient}
            setRecipient={setRecipient}
            handleSendMessage={handleSendMessage}
          />
        </View>
      )}
    />
  );
};

export default HomeScreen;
