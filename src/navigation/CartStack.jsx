import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import Cart from "../screens/Cart";

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="Cart"
        screenOptions={({ route, navigation }) => ({
          header: () => {
            return (
              <Header
                route={route}
                navigation={navigation}
                isBackVisible={false}
                title={route.name}
              />
            );
          },
        })}
      >
        <Stack.Screen name="CartMain" component={Cart} />
      </Stack.Navigator>
  );
};

export default CartStack;