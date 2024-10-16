import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../components/CustomText";
import globalStyles from "../global/globalStyles";
import CustomButton from "../components/CustomButton";
import Container from "../components/Container";
import { deleteSession } from "../database";
import { useState } from "react";
import { logOut } from "../features/user/userSlice";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.value);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { width } = useWindowDimensions();

  const launchCamera = () => {
    navigation.navigate("ImageSelector");
  };

  const launchAdress = () => {
    navigation.navigate("LocationSelector");
  };

  const logoutUser = () => {
    setIsLoggingOut(true);
    deleteSession(user.localId).then(() => dispatch(logOut(user.localId)));
  };

  return (
    <Container
      style={width <= 350 ? [styles.gap24, styles.pb12] : styles.gap24}
      variant={width <= 350 ? "scrollView" : "view"}
    >
      {isLoggingOut ? (
        <CustomText textAlign="center">
          Logging out... Come back soon!
        </CustomText>
      ) : (
        <>
          <View style={styles.area}>
            <CustomText fontSize={18}>{user.email}</CustomText>
            {user.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.image} />
            ) : (
              <>
                <Image
                  source={require("../assets/img/defaultProfile.jpg")}
                  style={styles.image}
                />
              </>
            )}
            <CustomButton onPress={launchCamera}>
              {user.profileImage ? "Change Avatar" : "Add Avatar"}
            </CustomButton>
          </View>
          <View style={styles.area}>
            <CustomText fontSize={18}>My Shiping Address</CustomText>
            <CustomText fontSize={14}>
              {user.location?.address
                ? user.location.address
                : "No address found"}
            </CustomText>

            <CustomButton onPress={launchAdress}>
              {user.location?.address ? "Change Address" : "Add Address"}
            </CustomButton>
          </View>

          <View style={styles.area}>
            <CustomText fontSize={18}>Close Session</CustomText>
            <CustomButton onPress={logoutUser}>Log Out</CustomButton>
          </View>
        </>
      )}
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  gap24: {
    gap: 24,
  },
  pb12: {
    paddingBottom: 12,
  },
  area: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: "80%",
    backgroundColor: globalStyles.color.surface,
    borderRadius: 12,
  },
  image: { width: 100, height: 100 },
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
  },
  buyButtonText: {
    textAlign: "center",
    fontSize: 18,
  },
});
