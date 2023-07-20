import { useState, memo, useMemo, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../App.css";

import questions from "pages/contents/question";
import dataList from "pages/contents/data";

import LoadingSpinner from "components/LoadingSpinner";

// import ButtonComponent from "../components/ButtonComponent";

const Qbox = styled.div`
  background-color: whitesmoke;
  text-align: center;
  border-radius: 20px;
  font-size: 20px;
  width: 80%;
`;
const ButtonComponent = styled.button`
  height: 54px;
  width: 80%;
  border-width: 0;

  border-radius: 1rem;
  background-color: #1f69ae;
  cursor: pointer;
  margin: auto;
  margin-bottom: 1.5rem;

  color: whitesmoke;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  border: ${(props) =>
    props.type === "result" ? "1px solid #00462A" : "1px solid lightgray"};
`;

function Question() {
  const [questionNum, setQuestionNum] = useState(0);
  const [turn, setTurn] = useState(0);

  const linkResult = "/result/";
  const endPoint = questions.length;
  const dataPoint = dataList.length;

  const [isProcess, setIsProcess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [linkTo, setLinkTo] = useState("");

  const [select, setSelect] = useState([]);
  const [result, setResult] = useState(0);

  const [ress, setRess] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (questionNum === endPoint) {
      setLoading(true);
      setTimeout(function () {
        setLoading(false);
      }, 2000);
    }
  }, [questionNum, endPoint]);

  const onConditionChange = (key) => {
    var newArray = [...select];

    if (questionNum === 0) {
      setRess(key + 1);
      let weight = questions[questionNum].answers.length - key - 1;
      for (let i in dataList) {
        newArray[i] = dataList[i][`${questionNum}`] * weight;
      }
    } else if (questionNum == endPoint - 1) {
      console.log(newArray);
      var num = newArray.indexOf(Math.max(...newArray));
      setResult(num);
      setLinkTo(linkResult + ress);
      setIsLoading(true);
      setTimeout(function () {
        setIsLoading(false);
        setIsProcess(true);
      }, 2000);
    } else {
      let weight = questions[questionNum].answers.length - key - 1;
      for (let i in dataList) {
        newArray[i] += dataList[i][`${questionNum}`] * weight;
      }
    }
    setSelect(newArray);
    setQuestionNum(questionNum + 1);
    setTurn(turn + 1);
  };
  // console.log(endPoint)
  if (questionNum === endPoint) {
    return (
      <>
        {loading && <LoadingSpinner />}
        {loading && <div>Examining your style... </div>}
        {!loading && (
          <Container>
            <Link to={linkTo} style={{ textDecoration: "none" }}>
              <img
                src="https://europe1.discourse-cdn.com/sui/original/3X/5/9/59ecd23e9e6a6c765e09f766856b3528b283462f.png"
                style={{ height: "80px", marginTop: "40px" }}
              ></img>
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                Your Passport is ready! <br />
                Click to see your result!
              </div>
              <ButtonComponent>Check My Result</ButtonComponent>
            </Link>
          </Container>
        )}
      </>
    );
  } else {
    return (
      <Container>
        <div className="status mx-auto mt-5">
          <div className="statusBar"></div>
        </div>

        <p style={{ fontSize: "24px" }}>Q. {questionNum + 1}</p>
        <div className="mx-auto my-5 py-3">
          {questions[questionNum].question}
        </div>
        {questions[questionNum].answers.map((answer, i) => (
          <ButtonComponent
            key={"answer-" + i}
            onClick={(e) => onConditionChange(i)}
          >
            {answer.text}
          </ButtonComponent>
        ))}
      </Container>
    );
  }
}

export default Question;
