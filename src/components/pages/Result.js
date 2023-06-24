import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import { Button } from "@mui/material";
import { quizAction } from "../../store/quiz-slice";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Result = () => {
  const { QNA, amount_of_question, score } = useSelector(
    (state) => state.quizData
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(quizAction.handleChangeScore(0));
    dispatch(quizAction.handleQnA([]));
    dispatch(quizAction.handleChangeAmount(50));

    navigate("/");
  };
  const tableOptions = {
    theme: "grid",
    styles: {
      cellPadding: 5,
      fontSize: 10,
      textColor: 40,
      lineColor: 200,
    },
    headStyles: {
      // fillColor: [231, 76, 60], // Red background color for table header
      textColor: 255,
    },
    bodyStyles: {
      fillColor: 255,
    },
  };
  const exportData = () => {
    const doc = new jsPDF();

    const tableElement = document.getElementById("result");
    doc.autoTable({ html: tableElement, ...tableOptions });
    doc.save(`quiz_results_${Date.now()}.pdf`);
  };

  return (
    <div className="container mt-5">
      {QNA.length > 0 && (
        <>
          <p className="fw-semibold">
            Finall Score : {score} from {amount_of_question}
          </p>
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover text-center"
              id="result"
            >
              <thead>
                <tr>
                  <th>Questions</th>
                  <th>Your Answers</th>
                  <th>Correct Answer</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {QNA.map((data) => (
                  <tr key={data.id}>
                    <td>{decode(data.question)}</td>
                    <td>{decode(data.userSelect)}</td>
                    <td>{decode(data.correct_answer)}</td>
                    <td>{data.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex gap-2 mb-4">
            <Button onClick={handleClick} variant="outlined">
              Back to settings!
            </Button>
            <Button onClick={exportData} variant="contained">
              Export to PDF
            </Button>
          </div>
        </>
      )}
      {QNA.length < 1 && (
        <>
          <div className="mb-3 fw-semibold">No Any Answers</div>
          <Button onClick={handleClick} variant="outlined">
            Back to settings!
          </Button>
        </>
      )}
    </div>
  );
};

export default Result;
