import { FlatList, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "../global/globalStyles";
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import OrderDetail from "../components/OrderDetail";
import CustomModal from "../components/CustomModal";
import Container from "../components/Container";
import useOrder from "../hooks/useOrder";

const Order = () => {
  const user = useSelector((state) => state.userReducer.value);
  const order = useSelector((state) => state.shopReducer.orders);
  const modalVisible = useSelector((state) => state.shopReducer.modalActive);
  const { isLoading } = useOrder(user.email);

  return (
    <Container alignV="center">
      {isLoading ? (
        <CustomText>Loading orders...</CustomText>
      ) : (
        <FlatList
          contentContainerStyle={[
            globalStyles.defaultFlatList,
            styles.flatlist,
          ]}
          data={order}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderItem orderItem={item} />}
          numColumns={1}
        />
      )}
      <CustomModal visible={modalVisible}>
        <OrderDetail />
      </CustomModal>
    </Container>
  );
};

export default Order;

const styles = StyleSheet.create({
  flatlist: {
    width: "100%",
  },
});
