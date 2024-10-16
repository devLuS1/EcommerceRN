import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";

const OrderTable = ({ data }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.table}>
      <FlatList
        contentContainerStyle={globalStyles.defaultFlatList}
        data={data.items}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={width <= 350 ? styles.w50 : styles.w60}>
              <CustomText textAlign="left" variant="bold" color="secondary">
                Product
              </CustomText>
            </View>
            <View style={width <= 350 ? styles.w30 : styles.w20}>
              <CustomText textAlign="right" variant="bold" color="secondary">
                Quantity
              </CustomText>
            </View>

            <View style={styles.w20}>
              <CustomText textAlign="right" variant="bold" color="secondary">
                Price
              </CustomText>
            </View>
          </View>
        }
        keyExtractor={(item) => item.product.id}
        renderItem={({ item, index }) => (
          <View
            style={
              index === data.items.length - 1 ? styles.lastRow : styles.row
            }
          >
            <View style={width <= 350 ? styles.w50 : styles.w60}>
              <CustomText textAlign="left">{item.product.title}</CustomText>
            </View>
            <View style={width <= 350 ? styles.w30 : styles.w20}>
              <CustomText textAlign="center">x{item.quantity}</CustomText>
            </View>
            <View style={styles.w20}>
              <CustomText color="textPrimary" textAlign="right">
                ${parseFloat(item.product.price).toFixed(2)}
              </CustomText>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.w70}>
              <CustomText
                textAlign="left"
                variant="bold"
                color="secondary"
                fontSize={16}
              >
                Total:
              </CustomText>
            </View>
            <View style={styles.w30}>
              <CustomText
                color="secondary"
                textAlign="right"
                variant="bold"
                fontSize={16}
              >
                ${parseFloat(data.total).toFixed(2)}
              </CustomText>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default OrderTable;

const styles = StyleSheet.create({
  table: { width: "100%", maxHeight: "80%" },
  header: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: globalStyles.color.primary,
    borderBottomWidth: 3,
    borderStyle: "dotted",
  },
  row: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: globalStyles.color.textSecondary,
    borderBottomWidth: 3,
    borderStyle: "dotted",
  },
  lastRow: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: globalStyles.color.primary,
    borderBottomWidth: 3,
  },
  footer: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  w80: {
    width: "80%",
    paddingVertical: 6,
  },
  w70: {
    width: "70%",
    paddingVertical: 6,
  },
  w60: {
    width: "60%",
    paddingVertical: 6,
  },
  w50: {
    width: "50%",
    paddingVertical: 6,
  },
  w30: {
    width: "30%",
    paddingVertical: 6,
  },
  w20: {
    width: "20%",
    paddingVertical: 6,
  },
});
