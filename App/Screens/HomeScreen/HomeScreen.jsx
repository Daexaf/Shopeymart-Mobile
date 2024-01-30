import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import Color from "../../components/Utils/Color";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import Carousel from "react-native-snap-carousel";
import Slider from "./Slider";
import HeaderLog from "./HeaderLog";
import { LogBox } from "react-native";
import Header from "./Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

// YellowBox.ignoreWarnings(["ViewPropTypes will be removed"]);
LogBox.ignoreLogs(["YellowBox message you want to ignore"]);
LogBox.ignoreAllLogs();

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const renderItem = ({ item }) => (
  //   <View>
  //     <Text>{item.name}</Text>
  //     <Text>{item.text}</Text>
  //   </View>
  // );

  // const featuredProducts = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     image: require("../../../assets/images/young-pretty.jpeg"),
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     image: require("../../../assets/images/tense-young.jpeg"),
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     image: require("../../../assets/images/scared-young.jpeg"),
  //   },
  // ];

  // const renderCarouselItem = ({ item }) => (
  //   <View style={styles.carouselItem}>
  //     <Image
  //       source={item.image}
  //       style={styles.carouselImage}
  //       resizeMode="cover"
  //     />
  //     <Text style={styles.carouselItemTitle}>{item.name}</Text>
  //   </View>
  // );

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
            signOut();
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("username");
            await AsyncStorage.removeItem("role");
            navigation.navigate("login");
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView>
      <View>
        <Header />
        <Slider />
        <Text style={styles.title}>Ini setelah login</Text>
        <SignOut />

        {/* <Carousel
        data={featuredProducts}
        renderItem={renderCarouselItem}
        sliderWidth={300} // Pastikan sliderWidth dan itemWidth terdefinisi sebelumnya
        itemWidth={120}
        autoplay={true}
        loop={true}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={0.9}
      /> */}

        {/* <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Enter Email"
        keyboardType="email-address"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
        placeholderTextColor="#777"
      /> */}

        {/* <Button title="Login" onPress={() => navigation.navigate("Detail")} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FF4655", // Ubah warna latar belakang sesuai kebutuhan
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ECF0F1", // Ubah warna teks sesuai kebutuhan
    marginBottom: 16,
  },
  label: {
    color: "#ECF0F1", // Ubah warna teks sesuai kebutuhan
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ECF0F1", // Ubah warna border sesuai kebutuhan
    borderRadius: 8,
    color: "#ECF0F1", // Ubah warna teks sesuai kebutuhan
  },
  subContainer: {
    minWidth: "100%",
    height: "70%",
    backgroundColor: Color.PRIMARY,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  carouselItem: {
    borderRadius: 10,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: 150,
  },
  carouselItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ECF0F1", // Ubah warna teks sesuai kebutuhan
  },
});

export default HomeScreen;
