import { FlatList } from "react-native";
import React from "react";
import CategoryItem from "../components/CategoryItem";
import globalStyles from "../global/globalStyles";
import { useGetCategoriesQuery } from "../services/shopServices";
import Container from "../components/Container";

const Home = ({ navigation }) => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <Container alignV="center">
      <FlatList
        contentContainerStyle={globalStyles.defaultFlatList}
        data={categories}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <CategoryItem category={item} navigation={navigation} />
        )}
      />
    </Container>
  );
};

export default Home;