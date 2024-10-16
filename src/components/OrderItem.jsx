import { StyleSheet, View } from "react-native";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { setModalActive, setOrderSelected } from "../features/shop/shopSlice";

const OrderItem = ({ orderItem: order, setModalVisible }) => {
  const dispatch = useDispatch();
  const date = new Date(order.updatedAt).toLocaleDateString("es-AR");

  const handleDetails = () => {
    dispatch(setOrderSelected(order));
    dispatch(setModalActive());
  };

  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <View style={styles.content}>
          <View style={styles.header}>
            <CustomText style={styles.title}>Order n°{order.id}</CustomText>
            <CustomText color="primary" style={styles.title}>
              {date}
            </CustomText>
          </View>
          <View style={styles.footer}>
            <CustomText variant="bold" fontSize={16} color="secondary">
              ${parseFloat(order.total).toFixed(2)}
            </CustomText>
            <CustomButton onPress={handleDetails}>Details</CustomButton>
          </View>
        </View>
      </View>
      <View style={styles.actions}></View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    width: "95%",
    height: 150,
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
    padding: 6,
  },
  imageView: {
    width: "30%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  actions: {
    width: "100%",
  },
  buttonPanel: {
    width: "30%",
    padding: 3,
    backgroundColor: globalStyles.color.surface,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 24,
    alignItems: "center",
    zIndex: 1,
  },
  iconButton: {
    padding: 6,
    backgroundColor: "red",
    position: "absolute",
    bottom: 2,
    left: 2,
    borderRadius: 35,
  },
});
