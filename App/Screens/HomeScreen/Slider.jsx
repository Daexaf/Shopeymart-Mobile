import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../components/Utils/GlobalApi";
import axios from "../../api/axiosInterceptor";

export default function Slider() {
  const [slider1, setSlider1] = useState([]);
  const [slider2, setSlider2] = useState([]);
  const [store, setStore] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchDataStore();
    fetchDataProduct();
  }, []);

  useEffect(() => {
    getSlider();
  }, [store]);

  useEffect(() => {
    getSlider2();
  }, [product]);

  const getSlider = () => {
    GlobalApi.getSlider().then((response) => {
      try {
        const formatted = response?.sliders.map((slider, index) => {
          return {
            ...slider,
            name: store[index].name,
          };
        });
        setSlider1(formatted);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const getSlider2 = () => {
    GlobalApi.getSlider().then((response) => {
      try {
        const formatted = response?.sliders.map((slider, index) => {
          return {
            ...slider,
            productName: product[index]?.name,
          };
        });
        setSlider2(formatted);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const fetchDataStore = async () => {
    await axios
      .get(`http://192.168.222.125:8099/store/v1`)
      .then((res) => {
        console.log(res.data);
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDataProduct = async () => {
    await axios
      .get(`http://192.168.222.125:8099/product`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <View>
        <Text style={styles.heading}>Our Best Store</Text>
        <FlatList
          data={slider1}
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
        <Text style={styles.heading}>Our Best Product</Text>
        <FlatList
          data={slider2}
          horizontal
          style={{ padding: 10 }}
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{ uri: item?.image?.url }}
                style={styles.sliderImage}
              />
              <Text style={styles.title}>{item.productName}</Text>
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
    // fontFamily: "Oswald-bold",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    // fontFamily: "Oswald-reguler",
    textAlign: "center",
  },
});
