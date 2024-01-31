import {
  View,
  Text,
  SectionList,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import Color from "../../components/Utils/Color";

const datas = [
  {
    title: "Promo Elektronik",
    data: [
      {
        name: "Sumsang ROD",
        price: "mulai dari 12 Juta Ribu Rupiah",
        image: require("../../../assets/images/banner1.png"),
      },
    ],
  },
  {
    title: "Promo Tagihan",
    data: [
      {
        name: "Diskon 30% pembayaran listrik",
        price: "sampai dengan 40 ribu",
        image: require("../../../assets/images/banner1.png"),
      },
    ],
  },
  {
    title: "Promo Jalan jalan",
    data: [
      {
        name: "Diskon 20% naik Kereta",
        price: "mulai dari 30 Ribu",
        image: require("../../../assets/images/banner1.png"),
      },
    ],
  },
];

const renderSeparator = () => (
  <View
    style={{
      height: 1,
      backgroundColor: "gray",
      marginLeft: 16, // or any other styling as needed
      marginRight: 16,
    }}
  />
);
const renderHeader = () => (
  <View style={styles.renderHead}>
    <Text>PROMO</Text>
  </View>
);

export default function ServiceScreen() {
  return (
    <View>
      <SectionList
        sections={datas}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}
        // inverted={true}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.title}>{item.price}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: Color.PRIMARY,
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 28,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    color: Color.WHITE,
    textAlign: "center",
  },
  renderHead: {
    textAlign: "center",
    padding: 16,
    marginLeft: 150,
  },
  image: {
    width: 300, // sesuaikan lebar gambar sesuai kebutuhan
    height: 100, // sesuaikan tinggi gambar sesuai kebutuhan
    borderRadius: 10, // sesuaikan radius border sesuai kebutuhan atau hilangkan jika tidak diperlukan
    alignSelf: "center",
  },
});
