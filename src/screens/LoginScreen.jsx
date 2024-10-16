import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import globalStyles from "../global/globalStyles";
import validations from "../utils/validations";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authServices";
import { setUserSession } from "../features/user/userSlice";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import Container from "../components/Container";
import { createSession } from "../database";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("ready");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [statusError, setStatusError] = useState("");
  const { width } = useWindowDimensions();
  const [triggerSignIn, resultSignIn] = useSignInMutation();

  useEffect(() => {
    if (resultSignIn.isSuccess) {
      createSession({
        localId: resultSignIn.data.localId,
        idToken: resultSignIn.data.idToken,
        email: resultSignIn.data.email,
      })
        .then((e) => {
          console.log("Session Created");
        })
        .catch((e) => {
          console.log("Session Error");
          console.log(e);
        });
      dispatch(
        setUserSession({
          email: resultSignIn.data.email,
          idToken: resultSignIn.data.idToken,
          localId: resultSignIn.data.localId,
          profileImage: "",
          location: {},
        })
      );
    }
  }, [resultSignIn]);

  const onSubmit = () => {
    const isValidVariableEmail = validations.isValidEmail(email);
    const isCorrectPassword = validations.isAtLeastSixCharacters(password);

    if (isValidVariableEmail && isCorrectPassword) {
      setStatus("loading");
      setStatusError("");
      triggerSignIn({
        email,
        password,
        returnSecureToken: true,
      })
        .then((e) => {
          if (e.error) {
            switch (e.error.status) {
              case 400:
                setStatusError("Incorrect email or password.");
                break;
              case 500:
                setStatusError("Server is down, please try again later.");
                break;
              default:
                break;
            }
            setStatus("ready");
          }
          console.log("Starting Sesion");
        })
        .catch(() => {
          setStatusError("Server is down, please try again later.");
          setStatus("ready");
        });
    }

    if (!isValidVariableEmail) setErrorEmail("Email is not correct");
    else setErrorEmail("");
    if (!isCorrectPassword)
      setErrorPassword("Password must be at least 6 characters");
    else setErrorPassword("");
  };

  return (
    <Container
      alignV={width <= 350 ? "center" : "flex-start"}
      variant={width <= 350 ? "scrollView" : "view"}
    >
      {width > 350 && (
        <View style={[styles.imageView]}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require("../assets/img/retroCave.jpg")}
          />
        </View>
      )}
      <CustomText textAlign="center" fontSize={18}>
        The Retro Cave
      </CustomText>

      <View style={styles.form}>
        <InputForm
          label={"Email"}
          onChange={(email) => setEmail(email)}
          error={errorEmail}
        />
        <InputForm
          label={"Password"}
          onChange={(password) => setPassword(password)}
          error={errorPassword}
          isSecure={true}
        />
        <CustomText style={styles.error}>{statusError}</CustomText>
        {status === "loading" ? (
          <CustomText>Loggin in...</CustomText>
        ) : (
          <CustomButton style={{ width: "60%" }} onPress={onSubmit}>
            Log In
          </CustomButton>
        )}
        <CustomText color="textPrimary"> Not have an account?</CustomText>
        <CustomButton
          variant="link"
          style={{ border: `solid 3px ${globalStyles.color.secondary}` }}
          onPress={() => navigation.navigate("Signup")}
        >
          SignUp
        </CustomButton>
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    borderRadius: 10,
    backgroundColor: globalStyles.color.background,
  },
  error: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
  },
  imageView: {
    width: "100%",
    height: "40%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
