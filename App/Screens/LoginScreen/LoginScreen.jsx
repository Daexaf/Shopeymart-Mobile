// LoginScreen.js

// keyworad rnf
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import Color from "../../components/Utils/Color";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import axios from "../../api/axiosInterceptor";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleLogin = async () => {
    axios
      .post(`http://192.168.222.125:8099/api/auth/login`, {
        username,
        password,
      })
      .then(async (res) => {
        setUsername("");
        setPassword("");

        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("username", res.data.username);
        await AsyncStorage.setItem("role", res.data.role);

        navigation.navigate("home");
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.setItem("isSignedIn", true);
  };

  const handleRegister = () => {
    navigation.navigate("register");
  };
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.loginImage}
          source={require("../../../assets/images/app.png")}
        />

        <View style={styles.subContainer}>
          <Text
            style={{
              fontSize: 20,
              color: Color.WHITE,
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Let's Shopping
          </Text>
          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: Color.PRIMARY,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: Color.PRIMARY,
              }}
            >
              Login With Google
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Dont have account?
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: Color.PRIMARY,
                }}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 10,
    borderWidth: 4,
    borderColor: Color.WHITE,
  },
  subContainer: {
    minWidth: "100%",
    height: "100%",
    backgroundColor: Color.PRIMARY,
    marginTop: -100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 15,
  },
  label: {
    color: Color.WHITE,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Color.WHITE,
    color: Color.BLACK,
    borderRadius: 10,
  },
});
