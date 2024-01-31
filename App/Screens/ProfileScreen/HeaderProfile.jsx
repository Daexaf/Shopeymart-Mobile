import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import Color from "../../components/Utils/Color";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ navigation }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const { user } = useUser();

  // const handleLogout = async () => {
  //   await signOut();
  //   await AsyncStorage.removeItem("token");
  //   await AsyncStorage.removeItem("username");
  //   await AsyncStorage.removeItem("role");
  //   navigation.navigate("login");
  // };

  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Pressable
          onPress={async () => {
            signOut();
            console.log("aaa");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("username");
            await AsyncStorage.removeItem("role");
            console.log("bbb");
            try {
              navigation.navigate("login");
            } catch (error) {
              console.log(error);
            }
            console.log("ccc");
          }}
        >
          <MaterialIcons name="logout" size={24} color={Color.WHITE} />
        </Pressable>
        {/* <Button
          title="Sign Out"
          onPress={async () => {
            signOut();
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("username");
            await AsyncStorage.removeItem("role");
            navigation.navigate("login");
          }}
        /> */}
      </View>
    );
  };

  useEffect(() => {
    AsyncStorage.getItem("username")
      .then((uname) => {
        setUsername(uname);
      })
      .catch((err) => console.log(err));

    AsyncStorage.getItem("role")
      .then((userRole) => {
        setRole(userRole);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {user && (
        <View style={styles.container}>
          <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
              <View>
                <Text style={{ color: Color.WHITE, fontFamily: "Oswald-bold" }}>
                  Welcome
                </Text>
                <Text style={styles.userName}>{user?.fullName}</Text>
              </View>
            </View>
            <SignOut />
          </View>
        </View>
      )}
      {username && (
        <View style={styles.container}>
          <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
              <View>
                <Text style={{ color: Color.WHITE, fontFamily: "Oswald-bold" }}>
                  Welcome
                </Text>
                <Text style={styles.userName}>{username}</Text>
                <Text style={styles.userName}>{role}</Text>
              </View>
            </View>
            <SignOut />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  container: {
    padding: 20,
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  userName: {
    fontSize: 15,
    color: Color.WHITE,
    fontFamily: "Oswald-bold",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
