import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import Order from "../screens/Order";

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Order"
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
      <Stack.Screen name="OrderMain" component={Order} />
    </Stack.Navigator>
  );
};

export default OrderStack;