import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import React from "react";
import Color from "../../components/Utils/Color";

export default function LoginAccScreen({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={{ alignItems: "center" }}>
      {/* <Text>LoginScreen</Text> */}
      <Image
        style={styles.loginImage}
        source={require("../../../assets/images/app.png")}
      />
      <View style={styles.subContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>Sign in to your account</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={username}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={password}
        />
        <Button
          title="Press me"
          onPress={() => navigation.navigate("Home")}
          color={Color.PRIMARY}
          style={{ marginTop: 5, borderRadius: 30 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 30,
    borderWidth: 4,
    borderColor: Color.WHITE,
  },
  subContainer: {
    minWidth: "100%",
    height: "70%",
    backgroundColor: Color.BLUE,
    marginTop: -100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  title: {
    color: Color.WHITE,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  subTitle: {
    color: Color.WHITE,
    fontSize: 20,
    textAlign: "center",
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
