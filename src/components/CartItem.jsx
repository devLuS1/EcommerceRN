import {
  StyleSheet,
  View,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import {
  addToCart,
  removeFromCart,
  substractFromCart,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ cartItem }) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.value);

  const handleAddCart = () => {
    dispatch(addToCart({ ...cartItem.product, quantity: 1, user: user }));
  };
  const handleSubstractCart = () => {
    dispatch(
      substractFromCart({ ...cartItem.product, quantity: 1, user: user })
    );
  };
  const handleRemoveCart = () => {
    dispatch(removeFromCart(cartItem.product.id));
  };

  return (
    <View style={styles.card}>
      <Pressable style={styles.deleteButton} onPress={handleRemoveCart}>
        <Ionicons
          name="close-circle"
          size={36}
          color={globalStyles.color.primary}
        />
      </Pressable>
      <View style={styles.main}>
        <View style={styles.imageView}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: cartItem.product.thumbnail }}
          ></Image>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <CustomText variant="bold" style={styles.title}>
              {cartItem.product.title}
            </CustomText>
            <CustomText>
              ${parseFloat(cartItem.product.price).toFixed(2)}
            </CustomText>
          </View>
          <View style={styles.footer}>
            <CustomText textAlign="right">Total: </CustomText>
            <CustomText
              variant="bold"
              color="secondary"
              textAlign="right"
              fontSize={20}
            >
              $
              {parseFloat(cartItem.product.price * cartItem.quantity).toFixed(
                2
              )}
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <View style={styles.buttonPanel}>
          <Pressable onPress={handleSubstractCart}>
            <Ionicons
              name="remove-circle"
              size={24}
              color={globalStyles.color.primary}
            />
          </Pressable>
          <CustomText fontSize={24} style={styles.base}>
            {cartItem.quantity}
          </CustomText>
          <Pressable onPress={handleAddCart}>
            <Ionicons
              name="add-circle"
              size={24}
              color={globalStyles.color.primary}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    width: "95%",
    height: 124,
  },
  deleteButton: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
  },
  main: {
    width: "100%",
    height: "80%",
    flexDirection: "row",
    backgroundColor: globalStyles.color.surface,
    borderRadius: 12,
    borderBottomRightRadius: 0,
  },
  imageView: {
    width: "30%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  content: {
    width: "70%",
    justifyContent: "space-between",
    padding: 6,
    gap: 6,
  },
  header: {
    paddingLeft: 6,
  },
  title: {
    flexWrap: "wrap",
  },
  footer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonPanel: {
    width: "30%",
    paddingVertical: 3,
    paddingHorizontal: 12,
    backgroundColor: globalStyles.color.surface,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 24,
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  iconButton: {
    padding: 6,
    backgroundColor: "red",
    position: "absolute",
    bottom: 2,
    left: 2,
    borderRadius: 33,
  },
});
