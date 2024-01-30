import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../components/Utils/GlobalApi";

export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = () => {
    GlobalApi.getSlider().then((response) => {
      console.log("response: ", response);
      setSlider(response?.sliders);
    });
  };

  return (
    <>
      <View>
        <Text style={styles.heading}>Offers of the Week</Text>
        <FlatList
          data={slider}
          horizontal
          style={{ padding: 10 }}
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{ uri: item?.image?.url }}
                style={styles.sliderImage}
              />
              <Text style={styles.title}>{item.name}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <Text style={styles.heading}>Offers of the Week</Text>
        <FlatList
          data={slider}
          horizontal
          style={{ padding: 10 }}
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{ uri: item?.image?.url }}
                style={styles.sliderImage}
              />
              <Text style={styles.title}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: 250,
    height: 150,
    borderRadius: 20,
    objectFit: "contain",
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    // color: "#ECF0F1", // Ubah warna teks sesuai kebutuhan
    marginBottom: 10,
    fontFamily: "Oswald-bold",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: "Oswald-reguler",
    textAlign: "center",
  },
});
