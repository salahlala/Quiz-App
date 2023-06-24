import { FormControl, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { quizAction } from "../store/quiz-slice";
const TextFields = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(quizAction.handleChangeAmount(e.target.value));
  };

  return (
    <div className="mb-4">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          type="number"
          size="small"
          label={"Amount of Questions"}
        />
      </FormControl>
    </div>
  );
};

export default TextFields;
