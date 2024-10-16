import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";

const InputForm = ({ label, onChange, error = "", isSecure = false }) => {
  const [input, setInput] = useState("");

  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };
  return (
    <View style={styles.inputContainer}>
      <CustomText>{label}</CustomText>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? <CustomText style={styles.error}>{error}</CustomText> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  error: {
    color: "red",
    fontStyle: "italic",
  },
});
