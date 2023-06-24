import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  question_category: "",
  question_difficulty: "",
  QNA: [],
  score: 0,
  amount_of_question: 50,
  question_type: "",
};
const quizSlice = createSlice({
  name: "quizConfig",
  initialState: initialState,
  reducers: {
    handleChangeCategory(state, action) {
      state.question_category = action.payload;
    },
    handleChangeDiffculty(state, action) {
      state.question_difficulty = action.payload;
    },
    handleChangeAmount(state, action) {
      state.amount_of_question = action.payload;
    },
    handleChangeScore(state, action) {
      state.score = action.payload;
    },

    handleQnA(state, action) {
      state.QNA = action.payload;
    },
    handleChangeType(state, action) {
      state.question_type = action.payload;
    },
  },
});

export const quizAction = quizSlice.actions;

export default quizSlice;
