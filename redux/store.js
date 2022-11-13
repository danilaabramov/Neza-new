import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from './userSlice'
import postsSlice from './postsSlice'
import stocksSlice from "./stocksSlice";
import portfolioSlice from "./portfolioSlice";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postsSlice,
  stocks: stocksSlice,
  portfolio: portfolioSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store
