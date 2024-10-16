import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setProfileLocation } from "../features/user/userSlice";
import { usePostProfileLocationMutation } from "../services/shopServices";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import MapPreview from "../components/MapPreview";
import { maps_api_key } from "../database/fireConfig";
import globalStyles from "../global/globalStyles";
import CustomText from "../components/CustomText";
import Container from "../components/Container";
import CustomButton from "../components/CustomButton";

const LocationSelector = ({ navigation }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { localId } = useSelector((state) => state.userReducer.value);
  const [triggerSaveProfileLocation, result] = usePostProfileLocationMutation();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission Denied");
          return;
        }

        let currentPosition = await getCurrentPositionAsync({});
        setLocation({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        });
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${maps_api_key}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [location]);

  const onConfirmLocation = () => {
    const updatedLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: address,
    };
    dispatch(setProfileLocation(updatedLocation));
    triggerSaveProfileLocation({ location: updatedLocation, localId });
    navigation.goBack();
  };

  return (
    <Container alignV={location ? "flex-start" : "center"}>
      {location ? (
        <View>
          <CustomText textAlign="center">
            lat:{location.latitude} long:{location.longitude}
          </CustomText>
          <MapPreview location={location} />
          <CustomText
            fontSize={16}
            style={styles.address}
            textAlign="center"
            color="textPrimary"
          >
            {address}
          </CustomText>
        </View>
      ) : (
        <View style={styles.mb12}>
          <CustomText>
            {error ? `Error: ${error}` : "Loading Address..."}
          </CustomText>
        </View>
      )}
      <CustomButton color="primary" onPress={onConfirmLocation}>
        Confirm Address
      </CustomButton>
    </Container>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  buyButton: {
    backgroundColor: globalStyles.color.primary,
    padding: 12,
    borderRadius: 12,
  },
  address: {
    padding: 24,
  },
  mb12: {
    marginBottom: 12,
  },
});
