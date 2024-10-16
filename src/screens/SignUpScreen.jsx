import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import globalStyles from "../global/globalStyles";
import { useSignUpMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUserSession } from "../features/user/userSlice";
import validations from "../utils/validations";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import Container from "../components/Container";
import { createSession } from "../database";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [status, setStatus] = useState("ready");
  const [statusError, setStatusError] = useState("");
  const [triggerSignUp, result] = useSignUpMutation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (result.isSuccess) {
      createSession({
        localId: result.data.localId,
        idToken: result.data.idToken,
        email: result.data.email,
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
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
          profileImage: "",
          location: {},
        })
      );
    }
  }, [result]);

  const onSubmit = () => {
    try {
      const isValidVariableEmail = validations.isValidEmail(email);
      const isCorrectPassword = validations.isAtLeastSixCharacters(password);
      const isRepeatedPasswordCorrect = password === confirmPassword;

      if (
        isValidVariableEmail &&
        isCorrectPassword &&
        isRepeatedPasswordCorrect
      ) {
        const request = {
          email,
          password,
          returnSecureToken: true,
        };
        triggerSignUp(request)
          .then((e) => {
            if (e.error) {
              switch (e.error.status) {
                case 400:
                  setStatusError(
                    "Email is already registered in the database."
                  );
                  break;
                case 500:
                  setStatusError("Server is down, please try again later.");
                  break;
                default:
                  break;
              }
              setStatus("ready");
            }
          })
          .catch(() => {
            setStatusError("Server is down, please try again later.");
            setStatus("ready");
          });
      }

      if (!isValidVariableEmail) setErrorMail("Email is not correct");
      else setErrorMail("");
      if (!isCorrectPassword)
        setErrorPassword("Password must be at least 6 characters");
      else setErrorPassword("");
      if (!isRepeatedPasswordCorrect)
        setErrorConfirmPassword("Passwords must match");
      else setErrorConfirmPassword("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container alignV="center" variant={width <= 350 ? "scrollView" : "view"}>
      <View style={styles.form}>
        <CustomText fontSize={18}>Signup</CustomText>

        <InputForm label={"email"} onChange={setEmail} error={errorMail} />
        <InputForm
          label={"password"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"confirm password"}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <CustomText style={styles.error}>{statusError}</CustomText>
        {status === "loading" ? (
          <CustomText>Loggin in...</CustomText>
        ) : (
          <CustomButton onPress={onSubmit} style={{ width: "60%" }}>
            Register
          </CustomButton>
        )}

        <CustomText color="textPrimary">Already have an account?</CustomText>
        <CustomButton
          variant="link"
          style={{ border: `solid 3px ${globalStyles.color.secondary}` }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </CustomButton>
      </View>
    </Container>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: globalStyles.color.background,
  },
  error: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
  },
});
