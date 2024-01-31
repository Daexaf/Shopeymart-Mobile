import { View, Text, Pressable, Button } from "react-native";
import React from "react";
import Header from "./HeaderProfile";
import { useAuth } from "@clerk/clerk-expo";
import Color from "../../components/Utils/Color";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Button
          title="Sign Out"
          onPress={async () => {
            try {
              signOut();
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("username");
              await AsyncStorage.removeItem("role");
              navigation.navigate("login");
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </View>
    );
  };
  return (
    <View>
      <Header />
      <SignOut />
    </View>
  );
}
