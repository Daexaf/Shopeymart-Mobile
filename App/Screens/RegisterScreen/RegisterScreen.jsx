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
export default function RegisterScreen({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [mobilePhone, setMobilePhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleRegister = async () => {
    axios
      .post(`http://192.168.222.125:8099/api/auth/register`, {
        username,
        password,
        name,
        address,
        mobilePhone,
        email,
      })
      .then(async (res) => {
        setUsername("");
        setPassword("");
        setName("");
        setAddress("");
        setMobilePhone("");
        setEmail("");

        navigation.navigate("login");
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.setItem("isSignedIn", true);
  };

  const handleLogin = () => {
    navigation.navigate("login");
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
            style={{ fontSize: 20, color: Color.WHITE, textAlign: "center" }}
          >
            Let's Register
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
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAddress}
              value={address}
            />
            <Text style={styles.label}>Mobile Phone</Text>
            <TextInput
              style={styles.input}
              onChangeText={setMobilePhone}
              value={mobilePhone}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: Color.PRIMARY,
                }}
              >
                Register
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

          <View>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Already have account?
            </Text>
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
    marginTop: -200,
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
