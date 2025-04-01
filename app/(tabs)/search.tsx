import { Item } from "@/components/search/item";
import { Filter } from "@/components/search/Filter";
import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import styles from "@/styles/search.styles";

export default function SearchScreen() {
  const [surname, setSurname] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [type, setType] = useState<"any" | "staff" | "student">("student");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dzuelsfoundation.vercel.app/api/patrons"
        );
        const result = await response.json();
        if (result.status) {
          setData(result.data);
        } else {
          console.error("Failed to fetch patrons:", result.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(
      (item: any) =>
        (surname === "" ||
          item?.surname.toLowerCase().includes(surname.toLowerCase())) &&
        (barcode === "" || item.barcode.includes(barcode)) &&
        (type === "any" || item.patronType.toLowerCase() === type.toLowerCase())
    );
  }, [data, surname, barcode, type]);

  const clearFilters = () => {
    setSurname("");
    setBarcode("");
    setType("any");
  };

  const handlePatronDetail = (patronBarcode: string) => {
    router.push({
      pathname: "/(screens)/patron",
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
          renderItem={({ item: { barcode, surname, patronType, points } }) => (
            <Item
              handlePatronDetail={handlePatronDetail}
              barcode={barcode}
              surname={surname}
              patronType={patronType}
              points={points}
            />
          )}
        />
      )}
    </View>
  );
}
