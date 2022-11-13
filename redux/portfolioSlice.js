import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../utils/Client";
import { AsyncStorage } from "react-native";

export const fetchPortfolio = createAsyncThunk("portfolio", async ({token}) => {
  const data = await fetch(url + "/stocks-portfolio", {
    headers: {
      "Content-Type": "application/json",
      "authorization": token
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
})

const initialState = {
  portfolio: null,
  status: "loading",
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPortfolio.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPortfolio.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.portfolio = action.payload;
    },
    [fetchPortfolio.rejected]: (state) => {
      state.status = "error";
      state.portfolio = null;
    },
  }
})

export default portfolioSlice.reducer
