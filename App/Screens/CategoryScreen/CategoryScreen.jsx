import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SectionList,
  FlatList,
} from "react-native";
import Color from "../../components/Utils/Color";

export default function BookingScreen() {
  const CategoryItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  const category = [
    {
      id: 1,
      name: "Electronic",
      item: 199,
      image: require("../../../assets/images/cargo-truck.png"),
    },
    {
      id: 2,
      name: "Beauty",
      item: 369,
      image: require("../../../assets/images/mop.png"),
    },
    {
      id: 3,
      name: "Fashion",
      item: 989,
      image: require("../../../assets/images/support.png"),
    },
    {
      id: 4,
      name: "Health",
      item: 422,
      image: require("../../../assets/images/cargo-truck.png"),
    },
    {
      id: 5,
      name: "Travel",
      item: 365,
      image: require("../../../assets/images/mop.png"),
    },
    {
      id: 6,
      name: "Entertainment",
      item: 989,
      image: require("../../../assets/images/support.png"),
    },
  ];

  const sections = [
    {
      title: "Categories",
      data: category,
    },
  ];

  return (
    <ScrollView>
      <View style={{ paddingTop: 30 }}>
        <Text
          style={{
            color: Color.PRIMARY,
            fontSize: 20,
            fontWeight: "600",
            paddingLeft: 20,
            paddingBottom: 10,
          }}
        >
          Category
        </Text>
        <View>
          <FlatList
            data={category}
            numColumns={2}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 12,
              paddingTop: 10,
            }}
            columnWrapperStyle={{ gap: 5, paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    height: 200,
                    borderRadius: 20,
                    backgroundColor: Color.PRIMARY,
                    paddingBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Image
                    source={item.image}
                    style={{ width: "50%", height: "50%", borderRadius: 10 }}
                  />
                  <Text
                    style={{
                      color: Color.WHITE,
                      marginTop: 5,
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: Color.WHITE }}>{item.item}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  sliderImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
  },
  itemSeparator: {
    borderBottomWidth: 1,
    marginRight: 10,
  },
  sectionHeader: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
});
