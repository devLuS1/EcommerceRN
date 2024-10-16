import { StyleSheet, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../global/globalStyles";

const CustomText = ({
  variant = "semiBold", 
  color = "default",
  style = {}, 
  children,
  fontSize = null,
  textAlign = "left",
}) => {
  const { width } = useWindowDimensions();
  const variantStyle = styles[variant] ? styles[variant] : styles["semiBold"];
  const [colorStyle, setColorStyle] = useState({});
  const fontSizeStyle = fontSize
    ? { fontSize: fontSize }
    : width >= 350
    ? 14
    : 12;
  const textAlignStyle = { textAlign: textAlign };

  useEffect(() => {
    switch (color) {
      case "primary":
        setColorStyle({ color: globalStyles.color.primary });
        break;
      case "secondary":
        setColorStyle({ color: globalStyles.color.secondary });
        break;
      case "textPrimary":
        setColorStyle({ color: globalStyles.color.textPrimary });
        break;
      case "textSecondary":
        setColorStyle({ color: globalStyles.color.textSecondary });
        break;
      case "background":
        setColorStyle({ color: globalStyles.color.background });
        break;

      default:
        if (color.startsWith("#")) {
          setColorStyle({ color: color });
        } else {
          setColorStyle({});
        }
        break;
    }
  }, []);

  return (
    <Text
      style={[
        styles.baseText,
        variantStyle,
        colorStyle,
        fontSizeStyle,
        textAlignStyle,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  baseText: {
    color: globalStyles.color.textSecondary,
    fontWeight: 600,
  },
  bold: {
    fontFamily: "MontserratBold",
  },
  semiBold: {
    fontFamily: "MontserratSemiBold",
  },
  link: { color: "blue", textDecorationLine: "underline" },
  regular: {},
});
