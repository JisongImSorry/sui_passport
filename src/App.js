import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Question from "pages/Question";
import Result from "pages/Result";
import { JsonRpcProvider, TransactionBlock } from "@mysten/sui.js";
import { ConnectButton, useWallet, WalletProvider } from "@suiet/wallet-kit";

import "@suiet/wallet-kit/style.css";

import { useState, useEffect } from "react";

import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const Name = styled.p`
  font-family: var(--bs-body-font-family);
  font-size: 26px;
  font-weight: 900;
  color: rgba(31, 105, 174, 1);
  text-align: center;
`;

const StartButton = styled.button`
  height: 54px;
  background-color: #1f69ae;
  color: whitesmoke;
  font-weight: 700;
  border-radius: 20px;
  border-width: 0;
`;

function App() {
  let navigate = useNavigate();
  const [wallets, setWallets] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Container className="pt-5 px-0">
              <img
                src="https://europe1.discourse-cdn.com/sui/original/3X/5/9/59ecd23e9e6a6c765e09f766856b3528b283462f.png"
                style={{ height: "80px" }}
              ></img>
              <Name>
                SUI
                <br />
                Passport
              </Name>
              <p style={{ fontWeight: "700" }}>
                What Kind of Crypto USER ARE YOU?
              </p>
              <p style={{ fontWeight: "500" }}>
                Answer questions to know what kind of crypto user you are!
                <br />
                and mint your passport to SUI!
              </p>
              <div className="col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
                <img
                  src="https://www.nationsonline.org/maps/Political-World-Map-3360.jpg"
                  alt="mainimg"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                ></img>
              </div>

              <StartButton
                type="button"
                className="col-lg-8 col-md-6 col-sm-8 col-12 mx-auto "
                onClick={() => {
                  navigate("/question");
                }}
                style={{ marginTop: "20px" }}
              >
                Start Journey
              </StartButton>
            </Container>
          }
        ></Route>
        <Route path="/question" element={<Question></Question>}></Route>
        <Route path="/result/:id" element={<Result />}></Route>
      </Routes>
    </div>
  );
}

export default App;
