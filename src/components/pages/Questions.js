import classes from "./Questions.module.css";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import { quizAction } from "../../store/quiz-slice";
import { Button } from "@mui/material";
const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state.quizData);
  let apiUrl = `/api.php?amount=${amount_of_question}`;

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }

  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, isLoading } = useHttp({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [qna, setQna] = useState([]);
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        randomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      handleClickAnswer("");
    }

    return () => {
      clearInterval(countdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, questionIndex]);

  const handleClickAnswer = (e) => {
    const question = response?.results[questionIndex];
    let point = 0;
    if (e === "") {
      if (questionIndex + 1 < response?.results.length) {
        setQuestionIndex((prev) => prev + 1);
        setTimer(10);
      } else {
        if (qna) {
          dispatch(quizAction.handleQnA([...qna]));
          navigate("/result");
        }
      }
      return;
    }

    if (e.target.textContent === decode(question.correct_answer)) {
      dispatch(quizAction.handleChangeScore(score + 1));
      point = 1;
    }

    const myData = {
      question: decode(question.question),
      userSelect: decode(e.target.textContent),
      correct_answer: decode(question.correct_answer),
      point,
      id: Math.random() * 1000,
    };
    setQna([...qna, myData]);
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex((prev) => prev + 1);
      setTimer(10);
    } else {
      const lastData = {
        question: decode(question.question),
        userSelect: decode(e.target.textContent),
        correct_answer: decode(question.correct_answer),
        point,
        id: Math.random() * 1000,
      };
      dispatch(quizAction.handleQnA([...qna, lastData]));
      navigate("/result");
    }
  };

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
  return (
    <div className="container mt-5">
      <div className={`${classes.overlay}`}></div>
      <h1 className="text-center mb-3 text-white text-uppercase">Questions</h1>

      <div className={`rounded-2 p-4 ${classes["main-question"]}`}>
        <div className="fw-semibold text-white mb-4">
          Question No.{questionIndex + 1} of {response?.results.length}
        </div>

        <p className="fw-semibold text-white">
          {response?.results &&
            decode(response.results[questionIndex].question)}
        </p>

        {options?.map((option, id) => (
          <div className="mb-4" key={id}>
            <Button
              onClick={handleClickAnswer}
              variant="contained"
              className={`${classes.btn}`}
            >
              {decode(option)}
            </Button>
          </div>
        ))}

        <div className="fw-semibold text-white mb-3">
          Time left {timer} seconds
        </div>
        <div className="fw-semibold text-white">
          Score: {score}/ {response?.results.length}
        </div>
      </div>
    </div>
  );
};

export default Questions;
