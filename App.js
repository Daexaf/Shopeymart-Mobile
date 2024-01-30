import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Button } from "react-native";
import LoginScreen from "./App/Screens/LoginScreen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./App/Screens/HomeScreen/HomeScreen";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import TabNavigation from "./App/navigations/TabNavigation";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import LoginAccScreen from "./App/Screens/LoginScreen/LoginAccScreen";
import { Axios } from "axios";
import RegisterScreen from "./App/Screens/RegisterScreen/RegisterScreen";

// YellowBox.ignoreWarnings(["ViewPropTypes will be removed"]);
LogBox.ignoreLogs(["YellowBox message you want to ignore"]);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Oswald-bold": require("../shopeymart/assets/font/static/Oswald-Bold.ttf"),
    "Oswald-Regular": require("../shopeymart/assets/font/static/Oswald-Regular.ttf"),
    "Oswald-SemiBold": require("../shopeymart/assets/font/static/Oswald-SemiBold.ttf"),
  });

  return (
    // <ClerkProvider publishableKey="pk_test_dW5iaWFzZWQtd2FscnVzLTgzLmNsZXJrLmFjY291bnRzLmRldiQ">
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //       <SignedIn>
    //         <Text>You are Signed in</Text>
    //       </SignedIn>
    //       <SignedOut>
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //       </SignedOut>
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </ClerkProvider>
    <ClerkProvider
      publishableKey="pk_test_dW5iaWFzZWQtd2FscnVzLTgzLmNsZXJrLmFjY291bnRzLmRldiQ"
      tokenCache={tokenCache}
    >
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
          {/* <SignOut /> */}
        </SignedIn>
        <SignedOut>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <LoginScreen /> */}
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="LoginAcc" component={LoginAccScreen} />
              <Stack.Screen name="home" component={TabNavigation} />
              <Stack.Screen name="register" component={RegisterScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 40,
  },
});
