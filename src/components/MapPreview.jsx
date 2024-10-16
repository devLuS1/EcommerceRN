import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { maps_api_key } from "../database/fireConfig";

const MapPreview = ({ location }) => {
  const { width } = useWindowDimensions();

  const widthStyle = { width: width,height:"100%" };
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${maps_api_key}`;

  return (
    <View style={[styles.mapPreview]}>
      <Image style={[widthStyle]} source={{ uri: mapPreviewUrl }} />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
});
