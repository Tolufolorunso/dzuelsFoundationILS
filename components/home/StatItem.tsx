import { View, Text } from "react-native";
import React from "react";
import styles from "@/styles/home.styles";

export default ({
  label,
  value,
  row = false,
}: {
  label: string;
  value: number;
  row?: boolean;
}) => (
  <View
    style={[
      styles.statBox,
      {
        flexDirection: row ? "row" : "column",
        justifyContent: row ? "space-between" : "center",
      },
    ]}
  >
    {row && <Text style={[styles.statLabel]}>{label}</Text>}
    <Text style={styles.statValue}>{value}</Text>
    {!row && <Text style={[styles.statLabel]}>{label}</Text>}
  </View>
);
