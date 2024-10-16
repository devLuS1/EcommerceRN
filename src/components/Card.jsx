import { View } from "react-native";
import React from "react";

const Card = ({ children, additionalStyle = [] }) => {
  return <View style={[additionalStyle]}>{children}</View>;
};

export default Card;
