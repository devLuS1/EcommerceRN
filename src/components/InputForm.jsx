import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";

const InputForm = ({ label, onChange, error = "", isSecure = false }) => {
  const [input, setInput] = useState("");

  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };
  return (
    <KeyboardAvoidingView style={styles.inputContainer}>
      <CustomText style={styles.subtitle}>{label}</CustomText>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? <CustomText color="#F00">{error}</CustomText> : null}
    </KeyboardAvoidingView>
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
  subtitle: {
    width: "90%",
  },
  input: {
    width: "90%",
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: globalStyles.color.primary,
    padding: 2,
    fontSize: 16,
    color: globalStyles.color.secondary,
  },
});
