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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import Color from "../../components/Utils/Color";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import axios from "axios";

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
    <View style={{ alignItems: "center" }}>
      <Image
        style={styles.loginImage}
        source={require("../../../assets/images/app.png")}
      />

      <View style={styles.subContainer}>
        <Text style={{ fontSize: 20, color: Color.WHITE, textAlign: "center" }}>
          Let's Shopping
        </Text>
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          {/* <Button
            title="Press me"
            onPress={() => navigation.navigate("Home")}
            style={{ marginTop: 5, borderRadius: 30 }}
          /> */}
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
        {/* <Text
          style={{
            fontSize: 10,
            color: Color.WHITE,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          The Bost App To Find Services Near You
        </Text> */}

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginAcc")}
        >
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Color.PRIMARY }}
          >
            Login Account
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Color.PRIMARY }}
          >
            Login With Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    height: "70%",
    backgroundColor: Color.PRIMARY,
    marginTop: -180,
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
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Color.WHITE,
    color: Color.BLACK,
    borderRadius: 10,
  },
});
