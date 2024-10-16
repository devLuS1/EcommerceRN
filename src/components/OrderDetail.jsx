import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setModalActive } from "../features/shop/shopSlice";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import OrderTable from "./OrderTable";
import Container from "./Container";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.shopReducer.orderSelected);

  const date = new Date(order.updatedAt).toLocaleDateString("es-AR");
  return order ? (
    <Container style={styles.py} alignV="space-between">
      <View>
        <CustomText variant="bold" fontSize={20} textAlign="center">
          Order N°{order.id}
        </CustomText>
        <CustomText textAlign="center">{date}</CustomText>
      </View>

      <OrderTable data={order} />
      <CustomButton
        style={styles.pt}
        onPress={() => dispatch(setModalActive())}
      >
        Go back
      </CustomButton>
    </Container>
  ) : (
    ""
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  py: {
    paddingVertical: 24,
  },
  pt: {
    marginTop: 12,
  },
});
