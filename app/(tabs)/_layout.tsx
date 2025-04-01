import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/data/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAuthStore from "@/store/auth.store";
import { Text } from "react-native";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore((state) => state);

  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        headerTitle: () => (
          <Text style={{ fontWeight: 700, fontSize: 13 }}>
            {user?.name.toUpperCase()}
          </Text>
        ),
        headerRight: () => (
          <Text style={{ fontSize: 13, marginRight: 15 }}>Active</Text>
        ),
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShadowVisible: false,
        tabBarStyle: {
          // backgroundColor: 'red',
          borderTopWidth: 1,
          borderTopColor: Colors.GRAY,
          paddingTop: 5,
          bottom: insets.bottom,
          height: 60 + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="circulation"
        options={{
          title: "Circulation",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
