import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Color from "../../components/Utils/Color";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const { user, isLoading } = useUser();

  useEffect(() => {
    AsyncStorage.getItem("username")
      .then((uname) => {
        setUsername(uname);
        console.log("test", username, role);
      })
      .catch((err) => console.log(err));
    // setUsername();
    // setRole(AsyncStorage.getItem("role"));
  }, []);

  return (
    <>
      {user && (
        <View style={styles.container}>
          <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
              {/* <Image source={{ uri: user?.imageUrl }} style={styles.userImage} /> */}
              <View>
                <Text style={{ color: Color.WHITE, fontFamily: "Oswald-bold" }}>
                  Welcome
                </Text>
                <Text style={styles.userName}>{user?.fullName}</Text>
              </View>
            </View>
            <FontAwesome5 name="bookmark" size={24} color={Color.WHITE} />
          </View>
          <View style={styles.searchBarContainer}>
            <TextInput placeholder="search" style={styles.textInput} />
            <FontAwesome
              name="search"
              size={24}
              color={Color.BLACK}
              style={styles.searchBtn}
            />
          </View>
        </View>
      )}
      {username && (
        <View style={styles.container}>
          <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
              {/* <Image source={{ uri: user?.imageUrl }} style={styles.userImage} /> */}
              <View>
                <Text style={{ color: Color.WHITE, fontFamily: "Oswald-bold" }}>
                  Welcome
                </Text>
                <Text style={styles.userName}>{username}</Text>
                <Text style={styles.userName}>{role}</Text>
              </View>
            </View>
            <FontAwesome5 name="bookmark" size={24} color={Color.WHITE} />
          </View>
          <View style={styles.searchBarContainer}>
            <TextInput placeholder="search" style={styles.textInput} />
            <FontAwesome
              name="search"
              size={24}
              color={Color.BLACK}
              style={styles.searchBtn}
            />
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
    // fontWeight: "bold",
    color: Color.WHITE, // Ubah warna teks sesuai kebutuhan
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
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Color.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
  },
  searchBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Color.WHITE,
  },
});
