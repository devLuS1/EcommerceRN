import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";
import { setCategorySelected } from "../features/shop/shopSlice";
import { useDispatch } from "react-redux";


const CategoryItem = ({ category, navigation }) => {
  
  const dispatch = useDispatch();

  const handleCategory = () => {
    dispatch(setCategorySelected(category));
    navigation.navigate("ItemListCategory");
  };

  return (
    <Pressable onPress={handleCategory}>
      <Card additionalStyle={styles.card}>
        <CustomText color={globalStyles.color.background} fontSize={22}>
          {category}
        </CustomText>
      </Card>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: globalStyles.color.primary,
    borderRadius: 25,
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
