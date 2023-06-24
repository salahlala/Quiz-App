import classes from "./Setting.module.css";
import SelectField from "../SelectField";
import TextFields from "../TextField";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Setting = () => {
  const { response, isLoading } = useHttp({ url: "/api_category.php" });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div
        className={`text-center mt-5 d-flex align-items-center justify-content-center`}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/question");
  };

  const diffcultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-3">Quiz App</h1>
      <div className={`${classes.setting} mt-4`}>
        <form onSubmit={handleSubmit} className="w-100">
          <SelectField
            options={response.trivia_categories}
            label={"Category"}
          />
          <SelectField options={diffcultyOptions} label={"Diffculty"} />
          <SelectField options={typeOptions} label={"Type"} />
          <TextFields />
          <Button type="submit" fullWidth variant="contained">
            Play Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
