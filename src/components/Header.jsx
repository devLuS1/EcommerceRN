import { View, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import React from "react";
import globalStyles from "../global/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { useSelector } from "react-redux";

const Header = ({ route, navigation, isBackVisible }) => {

  let title;
  const justifyStyle = isBackVisible
  ? { justifyContent: "space-between" }
  : { justifyContent: "center" };

  const { width } = useWindowDimensions();
  const category = useSelector((state) => state.shopReducer.categorySelected);

  if (route.name === "Home") {
    title = "Home";
  }
  if (route.name === "ItemListCategory") {
    title = `List of ${category}`;
  }
  if (route.name === "ItemDetail") {
    title = "Product detail";
  }
  if (route.name === "CartMain") {
    title = "My Cart";
  }
  if (route.name === "OrderMain") {
    title = "My Orders";
  }
  if (route.name === "ProfileMain") {
    title = "My Profile";
  }
  if (route.name === "ImageSelector") {
    title = "My avatar";
  }
  if (route.name === "LocationSelector") {
    title = "My Address";
  }

  return (
    <View style={[styles.navBar, justifyStyle]}>
      {isBackVisible && (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={width <= 350 ? 14 : 26}
            color={globalStyles.color.textPrimary}
          />
        </Pressable>
      )}

      <CustomText
        textAlign="center"
        fontSize={width <= 350 ? 14 : 20}
        style={width <= 350 ? styles.textSM : styles.text}
      >
        {title}
      </CustomText>
      {isBackVisible && (
        <View>
          <Ionicons
            name="arrow-back"
            size={width <= 350 ? 24 : 14}
            color={globalStyles.color.background}
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 6,
    backgroundColor: globalStyles.color.background,
  },
  text: {
    paddingBottom: 6,
  },
  textSM: {
    paddingBottom: 3,
  },
});
