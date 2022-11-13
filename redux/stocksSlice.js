import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../utils/Client";
import { AsyncStorage } from "react-native";

export const fetchPosts = createAsyncThunk("posts", async () => {
  const data = await fetch(url + "/posts/limit/0/date/0")
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
});

export const fetchStocks = createAsyncThunk("stocks/usa", async () => {
  const data = await fetch(url + "/stocks")
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  return data;
});

const dontPars = (data) => {
  let arr = data
  for(let i = 1; i < arr.length; ++i)
    if(arr[i][3] === arr[i - 1][3]) arr.splice(i---1, 1)
  return arr
}

export const fetchStocksRUS = createAsyncThunk("stocks/rus", async () => {
  const data = await fetch("https://iss.moex.com/iss/history/engines/stock/markets/shares/securities.json")
    .then((response) => response.json()).then(json =>
      dontPars(json?.history.data)//.splice(0, 10))
    )
    .catch((error) => {
      console.error(error);
    });
  return data;
});

export const fetchStock = createAsyncThunk("stock", async ({ symbol }) => {
  // const data = await fetch(url + "/stocks/get/" + symbol)
  // .then((response) => response.json())
  // .catch((error) => {
  //   console.error(error);
  // });
  return {};
});

export const fetchStocksPortfolio = createAsyncThunk("stocks/portfolio", async ({token}) => {
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
  stocks: null,
  status: "loaded",
  stocksRUS: null,
  statusRUS: "loaded",
  stocksPortfolio: null,
  statusPortfolio: "loaded",
  posts: null,
  statusPosts: "loaded",
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStocks.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStocks.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.stocks = action.payload;
    },
    [fetchStocks.rejected]: (state) => {
      state.status = "error";
    },
    [fetchStocksRUS.pending]: (state) => {
      state.statusRUS = "loading";
    },
    [fetchStocksRUS.fulfilled]: (state, action) => {
      state.statusRUS = "loaded";
      state.stocksRUS = action.payload;
    },
    [fetchStocksRUS.rejected]: (state) => {
      state.statusRUS = "error";
    },
    [fetchStocksPortfolio.pending]: (state) => {
      state.statusPortfolio = "loading";
    },
    [fetchStocksPortfolio.fulfilled]: (state, action) => {
      state.statusPortfolio = "loaded";
      state.stocksPortfolio = action.payload;
    },
    [fetchStocksPortfolio.rejected]: (state) => {
      state.statusPortfolio = "error";
    },
    [fetchPosts.pending]: (state) => {
      state.statusPosts = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.statusPosts = "loaded";
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.statusPosts = "error";
    },
  },
});

export default stocksSlice.reducer;
