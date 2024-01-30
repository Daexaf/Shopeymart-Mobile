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
    title: "Full Service",
    data: [
      {
        name: "Home Cleaning",
        price: "mulai dari 299 Ribu Rupiah",
        image: require("../../../assets/images/banner1.png"),
      },
    ],
  },
  {
    title: "Premium Service",
    data: [
      {
        name: "Hydro Vacuum",
        price: "mulai dari 199 Ribu Rupiah",
        image: require("../../../assets/images/banner1.png"),
      },
    ],
  },
  {
    title: "Another Service",
    data: [
      {
        name: "Pool Maintenance",
        price: "mulai dari 99 Ribu Rupiah",
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

const renderFooter = () => (
  <View style={{ padding: 16 }}>
    <Text>Enjoy our list</Text>
  </View>
);

const renderHeader = () => (
  <View style={styles.renderHead}>
    <Text>Our Services.</Text>
  </View>
);

export default function ServiceScreen() {
  return (
    <View>
      <SectionList
        sections={datas}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
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
    marginLeft: 130,
  },
  image: {
    width: 300, // sesuaikan lebar gambar sesuai kebutuhan
    height: 100, // sesuaikan tinggi gambar sesuai kebutuhan
    borderRadius: 10, // sesuaikan radius border sesuai kebutuhan atau hilangkan jika tidak diperlukan
    alignSelf: "center",
  },
});
