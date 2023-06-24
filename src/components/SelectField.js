import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { quizAction } from "../store/quiz-slice";
const SelectField = (props) => {
  const { options, label } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);

    switch (label) {
      case "Category":
        dispatch(quizAction.handleChangeCategory(e.target.value));
        break;
      case "Diffculty":
        dispatch(quizAction.handleChangeDiffculty(e.target.value));
        break;
      case "Type":
        dispatch(quizAction.handleChangeType(e.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <div className="mb-4">
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
