import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      email: "",
      idToken: "",
      locadId: "",
      profileImage: "",
      location: {
        latitude: "",
        longitude: "",
        address: "",
      },
    },
  },
  reducers: {
    setUserSession: (state, action) => {
      state.value = {
        ...state.value,
        email: action.payload.email,
        idToken: action.payload.idToken,
        localId: action.payload.localId,
      };
    },
    logOut: (state) => {
      state.value = {
        email: "",
        idToken: "",
        locadId: "",
        profileImage: "",
        location: {
          latitude: "",
          longitude: "",
          address: "",
        },
      };
    },
    setProfilePic: (state, action) => {
      state.value = {
        ...state.value,
        profileImage: action.payload,
      };
    },
    setProfileLocation: (state, action) => {
      state.value = {
        ...state.value,
        location: action.payload,
      };
    },
  },
});

export const { setUserSession, logOut, setProfilePic, setProfileLocation } =
  userSlice.actions;

export default userSlice.reducer;
