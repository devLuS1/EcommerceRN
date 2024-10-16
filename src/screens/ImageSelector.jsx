import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePic } from "../features/user/userSlice";
import { usePostProfileImageMutation } from "../services/shopServices";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import globalStyles from "../global/globalStyles";
import CustomText from "../components/CustomText";
import Container from "../components/Container";
import CustomButton from "../components/CustomButton";

const ImageSelector = ({ navigation }) => {
  const { localId, profileImage } = useSelector(
    (state) => state.userReducer.value
  );
  const dispatch = useDispatch();
  const [image, setImage] = useState(profileImage);
  const [dirtyImage, setDirtyImage] = useState(false);
  const [triggerSaveProfileImg, result] = usePostProfileImageMutation();

  const checkCameraPermissions = async () => {
    const { granted } = await requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await checkCameraPermissions();
    if (isCameraOk) {
      let result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setDirtyImage(true);
      }
    }
  };

  const confirmImage = () => {
    dispatch(setProfilePic(image));
    triggerSaveProfileImg({ image, localId });
    navigation.goBack();
  };

  return (
    <Container style={styles.gap}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />

          <CustomButton
            onPress={pickImage}
            fontSize={18}
            style={{ width: "40%" }}
          >
            {dirtyImage ? "Take Other" : "Add Photo"}
          </CustomButton>
          {dirtyImage && (
            <CustomButton
              onPress={confirmImage}
              fontSize={18}
              style={{ width: "40%" }}
            >
              Confirm
            </CustomButton>
          )}
        </>
      ) : (
        <>
          <View style={styles.noPhotoContainer}>
            <Image
              source={require("../assets/img/defaultProfile.jpg")}
              style={styles.image}
            />
            <CustomText textAlign="center">No image</CustomText>
          </View>

          <CustomButton onPress={pickImage}>Add a Foto</CustomButton>
        </>
      )}
    </Container>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  gap: {
    gap: 12,
  },
  image: { height: 200, width: 200 },
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
    width: 150,
  },
});
