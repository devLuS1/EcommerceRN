import {
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Card from "./Card";
import globalStyles from "../global/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { useDispatch } from "react-redux";
import { setProductSelected } from "../features/shop/shopSlice";


const ProductItem = ({ product, navigation }) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const handleProduct = () => {
    dispatch(setProductSelected(product));
    navigation.navigate("ItemDetail");
  };

  return (
    <Pressable style={styles.pressable} onPress={handleProduct}>
      <Card additionalStyle={width > 350 ? styles.card : styles.cardSM}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: product.thumbnail }}
        />
        <View style={styles.cardContent}>
          <View>
            <CustomText color="primary" fontSize={width <= 350 ? 12 : ""}>
              {product.developer}
            </CustomText>
            <CustomText fontSize={width > 350 ? 16 : 14} style={styles.mb4}>
              {product.title}
            </CustomText>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.ratingView}>
              <AntDesign
                name="star"
                size={24}
                color={globalStyles.color.tertiary}
              />
              <CustomText>{parseFloat(product.rating).toFixed(2)}</CustomText>
            </View>
            <View>
              <CustomText color="primary" style={styles.priceNotDiscount}>
                $
                {parseFloat(
                  (100 * product.price) / (100 - product.discountPercentage)
                ).toFixed(2)}
              </CustomText>
              <CustomText>${parseFloat(product.price).toFixed(2)}</CustomText>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  pressable: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  card: {
    backgroundColor: globalStyles.color.surface,
    width: "95%",
    height: 260,
    borderRadius: 12,
  },
  cardSM: {
    backgroundColor: globalStyles.color.surface,
    width: "95%",
    height: 215,
  },
  cardContent: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 5,
  },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 115,
    width: "100%",
    borderRadius: 12,
  },
  mb4: {
    marginBottom: 4,
  },
  priceNotDiscount: {
    textDecorationLine: "line-through",
  },
});
