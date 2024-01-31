import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import BookingScreen from "../Screens/CategoryScreen/CategoryScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import Color from "../components/Utils/Color";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ServiceScreen from "../Screens/PromoScreen/PromoScreen";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.BLACK,
        // tabBarInactiveTintColor: Color.WHITE,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 14, marginTop: -7 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={24} color={Color.PRIMARY} />
          ),
        }}
      />
      <Tab.Screen
        name="booking"
        component={BookingScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 14, marginTop: -7 }}>
              Category
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={24} color={Color.PRIMARY} />
          ),
        }}
      />
      <Tab.Screen
        name="service"
        component={ServiceScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 14, marginTop: -7 }}>
              Promo
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="ticket" size={24} color={Color.PRIMARY} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 14, marginTop: -7 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-sharp"
              size={24}
              color={Color.PRIMARY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// <Ionicons name="person-circle-sharp" size={24} color="black" />
