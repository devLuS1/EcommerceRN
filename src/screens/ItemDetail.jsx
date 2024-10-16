import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../global/globalStyles";
import CustomText from "../components/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import CustomButton from "../components/CustomButton";
import Container from "../components/Container";

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const product = useSelector((state) => state.shopReducer.productSelected);
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer.value);

  const productInCart = cart.items?.find((e) => e.product.id === product.id);
  const descriptionMaxLength = width <= 350 ? 215 : 210;

  const handleAddCart = () => {
    dispatch(addToCart({ ...product, quantity: 1, user: user }));
  };

  return (
    <>
      {product ? (
        <Container
          alignV={width >= 350 ? "space-between" : "flex-start"}
          style={width >= 350 ? styles.p12 : styles.p6}
          variant={width >= 350 ? "view" : "scrollView"}
        >
          <View
            style={{
              width: "100%",
              gap: 12,
              justifyContent: "flex-start",
            }}
          >
            <View style={{ height: "35%" }}>
              <FlatList
                contentContainerStyle={globalStyles.defaultFlatList}
                data={product.images}
                keyExtractor={(image) => image}
                horizontal
                renderItem={({ item }) => (
                  <View style={{ width: width, height: "100%" }}>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{ uri: item }}
                    />
                  </View>
                )}
              ></FlatList>
            </View>

            <View>
              <CustomText
                color="secondary"
                fontSize={width > 350 ? 22 : 14}
                style={width > 350 ? styles.textTitle : styles.textTitleSM}
              >
                {product.title}
              </CustomText>
              <CustomText color="primary">{product.developer}</CustomText>
            </View>

            <View
              style={
                width <= 350
                  ? [styles.specsBarView, styles.p6]
                  : [styles.specsBarView, styles.p12]
              }
            >
              <CustomText>
                <AntDesign
                  name="download"
                  size={width <= 350 ? 20 : 24}
                  color={globalStyles.color.textPrimary}
                />
                {"  "}
                {product.stock}
              </CustomText>
              <CustomText>
                <AntDesign
                  name="tag"
                  size={width <= 350 ? 20 : 24}
                  color={globalStyles.color.textPrimary}
                />
                {"  "}
                {product.category}
              </CustomText>
              <View style={styles.ratingView}>
                <AntDesign
                  name="star"
                  size={width <= 350 ? 20 : 24}
                  color={globalStyles.color.tertiary}
                />
                <CustomText>{product.rating}</CustomText>
              </View>
            </View>

            {product.description.length >= descriptionMaxLength ? (
              <ScrollView style={{ height: "25%" }}>
                <CustomText variant="bold" fontSize={16}>
                  Overview
                </CustomText>
                <CustomText
                  fontSize={width > 350 ? 16 : 14}
                  style={
                    width > 350
                      ? styles.textDescription
                      : styles.textDescriptionSM
                  }
                >
                  {product.description}
                </CustomText>
              </ScrollView>
            ) : (
              <View>
                <CustomText variant="bold" fontSize={16}>
                  Overview
                </CustomText>
                <CustomText
                  fontSize={width > 350 ? 16 : 14}
                  style={
                    width > 350
                      ? styles.textDescription
                      : styles.textDescriptionSM
                  }
                >
                  {product.description}
                  {product.description.length}
                </CustomText>
              </View>
            )}
          </View>

          <View style={styles.priceView}>
            <View style={styles.centeredView}>
              <CustomText variant="bold" color="primary">
                Total Price:
              </CustomText>
              <CustomText style={styles.priceNotDiscount}>
                $
                {parseFloat(
                  (100 * product.price) / (100 - product.discountPercentage)
                ).toFixed(2)}
              </CustomText>
              <CustomText
                variant="bold"
                color="secondary"
                fontSize={22}
                style={styles.textTitle}
              >
                ${parseFloat(product.price).toFixed(2)}
              </CustomText>
            </View>
            <View style={styles.centeredView}>
              <CustomText style={styles.discountPercentage}>
                {product.discountPercentage}% OFF!
              </CustomText>
              <CustomButton color="primary" onPress={handleAddCart}>
                {productInCart
                  ? `On cart (${productInCart.quantity})`
                  : "Add to Cart"}
              </CustomButton>
            </View>
          </View>
        </Container>
      ) : (
        <CustomText>Loading product...</CustomText>
      )}
    </>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  p12: {
    padding: 12,
  },
  p6: {
    padding: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    justifyContent: "space-between",
    height: "50%",
  },
  contentSM: {
    width: "100%",
    justifyContent: "space-between",
  },
  card: {},
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 12,
  },
  imageSM: {
    height: "25%",
    width: "100%",
    borderRadius: 12,
  },
  textTitle: {
    marginBottom: 6,
  },
  textTitleSM: {
    marginBottom: 3,
  },
  textDescription: {
    lineHeight: 20,
    paddingBottom: 6,
  },
  textDescriptionSM: {
    lineHeight: 14,
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 5,
  },
  priceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  specsBarView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: globalStyles.color.surface,
    borderRadius: 12,
  },
  centeredView: {
    width: "50%",
  },
  priceNotDiscount: {
    textDecorationLine: "line-through",
  },
  discountPercentage: {
    textAlign: "center",
  },
});
