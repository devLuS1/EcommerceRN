import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../global/globalStyles";
import CustomText from "./CustomText";

const Search = ({ onSearch, error = "" }) => {
  const { width } = useWindowDimensions();
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (text) => {
    setInputValue(text);
    onSearch(text);
  };

  const handleCancel = (text) => {
    setInputValue(text);
    onSearch(text);
  };

  return (
    <View style={width > 350 ? styles.pb : ""}>
      <View style={styles.searchBox}>
        <TextInput
          style={width > 350 ? styles.input : styles.inputSm}
          placeholder="Search product..."
          value={inputValue}
          onChangeText={(text) => handleOnChange(text)}
        />
        <Pressable style={styles.searchButton} onPress={() => handleCancel("")}>
          <MaterialIcons
            name="cancel"
            size={width > 350 ? 30 : 22}
            color={globalStyles.color.primary}
          />
        </Pressable>
      </View>
      {error ? <CustomText style={styles.errorText}>{error}</CustomText> : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  pb: {
    paddingBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    gap: 6,
  },
  input: {
    width: "85%",
    padding: 8,
    fontSize: 16,
    backgroundColor: globalStyles.color.background,
    borderBottomWidth: 1,
    borderColor: globalStyles.color.textSecondary,
    color: globalStyles.color.secondary,
  },
  inputSm: {
    width: "60%",
    padding: 8,
    backgroundColor: globalStyles.color.background,
    borderRadius: 10,
    color: globalStyles.color.primary,
  },
  searchButton: {
    width: "10%",
  },
  errorText: {
    color: "red",
    marginLeft: "5%",
  },
});
