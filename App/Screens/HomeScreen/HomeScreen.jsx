import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  FlatList,
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

  const category = [
    {
      id: 1,
      name: "Electronic",
      image: require("../../../assets/images/cargo-truck.png"),
    },
    {
      id: 2,
      name: "Beauty",
      image: require("../../../assets/images/mop.png"),
    },
    {
      id: 3,
      name: "Fashion",
      image: require("../../../assets/images/support.png"),
    },
    // {
    //   id: 4,
    //   name: "Health",
    //   image: require("../../../assets/images/cargo-truck.png"),
    // },
    // {
    //   id: 5,
    //   name: "Travel",
    //   image: require("../../../assets/images/mop.png"),
    // },
  ];

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
        <Image
          style={styles.carouselImage}
          source={require("../../../assets/images/banner2.png")}
        />
        <Slider />

        <Image
          style={styles.carouselImage}
          source={require("../../../assets/images/banner1.png")}
        />
        <View>
          <Text style={styles.heading}>Our Top Category</Text>
          <FlatList
            data={category}
            horizontal
            style={{ padding: 10 }}
            renderItem={({ item, index }) => (
              <View>
                <Image source={item.image} style={styles.sliderImage} />
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>

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
    borderRadius: 10,
    marginTop: 20,
  },
  carouselItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ECF0F1", // Ubah warna teks sesuai kebutuhan
  },
  heading: {
    fontSize: 20,
    // color: "#ECF0F1", // Ubah warna teks sesuai kebutuhan
    // fontFamily: "Oswald-bold",
    textAlign: "center",
    marginTop: 20,
  },
  sliderImage: {
    width: 150, // Sesuaikan lebar gambar sesuai kebutuhan
    height: 100, // Sesuaikan tinggi gambar sesuai kebutuhan
    borderRadius: 10, // Sesuaikan radius border sesuai kebutuhan atau hilangkan jika tidak diperlukan
    marginTop: 20, // Sesuaikan margin atas sesuai kebutuhan
    marginBottom: 10, // Sesuaikan margin bawah sesuai kebutuhan
    marginLeft: 10, // Sesuaikan margin kiri sesuai kebutuhan
    marginRight: 10, // Sesuaikan margin kanan sesuai kebutuhan
    resizeMode: "cover", // Sesuaikan tipe penyesuaian gambar sesuai kebutuhan
    alignSelf: "center", // Sesuaikan aligment gambar sesuai kebutuhan
  },
});

export default HomeScreen;
