import { useFonts } from "expo-font";
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { dropTableSessions, init } from "./src/database/index";

init()
  .then((e) => {
    console.log("Database Initialized");
  })
  .catch((err) => {
    console.log("Database Initialization Failed");
    console.log(err);
  });

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./src/assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./src/assets/fonts/Montserrat-Bold.ttf"),
    MontserratItalic: require("./src/assets/fonts/Montserrat-Italic.ttf"),
    VT323: require("./src/assets/fonts/VT323-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
