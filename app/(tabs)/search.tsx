import { Item } from '@/components/search/item';
import { Filter } from '@/components/search/Filter';
import React, { useState, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import styles from '@/styles/search.styles';
import { useFetchAllPatrons } from '@/hooks/useFetchAllPatrons';

export default function SearchScreen() {
  const [surname, setSurname] = useState<string>('');
  const [barcode, setBarcode] = useState<string>('');
  const [type, setType] = useState<'any' | 'staff' | 'student'>('student');
  // const [data, setData] = useState([]);

  const router = useRouter();
  const { data: patrons, loading, error } = useFetchAllPatrons();

  const filteredData = useMemo(() => {
    return patrons.filter(
      (item: any) =>
        (surname === '' ||
          item?.surname.toLowerCase().includes(surname.toLowerCase())) &&
        (barcode === '' || item.barcode.includes(barcode)) &&
        (type === 'any' || item.patronType.toLowerCase() === type.toLowerCase())
    );
  }, [patrons, surname, barcode, type]);

  const clearFilters = () => {
    setSurname('');
    setBarcode('');
    setType('any');
  };

  const handlePatronDetail = (patronBarcode: string) => {
    router.push({
      pathname: '/(screens)/patron',
      params: { barcode: patronBarcode },
    });
  };

  return (
    <View style={styles.container}>
      {/* FILTERS */}
      <Filter
        surname={surname}
        setSurname={setSurname}
        barcode={barcode}
        setBarcode={setBarcode}
        type={type}
        setType={setType}
        clearFilters={clearFilters}
      />

      {/* LOADING STATE */}
      {loading ? (
        <ActivityIndicator size="large" color="#d9534f" />
      ) : (
        <FlashList
          data={filteredData}
          keyExtractor={({ barcode }) => barcode}
          estimatedItemSize={100}
          renderItem={({
            item: { barcode, surname, patronType, points },
            index,
          }) => (
            <Item
              handlePatronDetail={handlePatronDetail}
              barcode={barcode}
              surname={surname}
              patronType={patronType}
              points={points}
              index={index + 1}
            />
          )}
        />
      )}
    </View>
  );
}
