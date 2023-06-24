import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./quiz-slice";
const store = configureStore({
  reducer: { quizData: quizSlice.reducer },
});

export default store;
