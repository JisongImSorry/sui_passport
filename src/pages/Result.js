import { useState, memo, useMemo, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import dataList from "pages/contents/data";
import { JsonRpcProvider, TransactionBlock } from "@mysten/sui.js";
import { ConnectButton, useWallet, WalletProvider } from "@suiet/wallet-kit";
import { useNavigate } from "react-router-dom";

const StartButton = styled.button`
  height: 54px;
  background-color: #1f69ae;
  color: whitesmoke;
  font-weight: 700;
  border-radius: 20px;
  border-width: 0;
`;

function Result() {
  const { id } = useParams();
  const wallet = useWallet();
  const navigate = useNavigate();

  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    if (wallet.connected) {
      setIsConnect(true);
    }
  }, [wallet]);

  async function handleMoveCall(type) {
    const tx = new TransactionBlock();
    const packageObjectId =
      "0xdbc04eb578810883896e343a0cba5a7e421934466e5bdbbc1e145fc0ba538035";
    let img = "";
    let name = "";
    let desc = "";
    if (type === "1") {
      name = "Sui Passport - Newbie";
      img = "https://storage.googleapis.com/jisong/sui_passport_newbie.png";
    } else if (type === "2") {
      name = "Sui Passport - Expert";
      img = "https://storage.googleapis.com/jisong/sui_passport_expert.png";
    } else if (type === "3") {
      name = "Sui Passport - Master";
      img = "https://storage.googleapis.com/jisong/sui_passport_master.png";
    }
    tx.moveCall({
      target: `${packageObjectId}::nft::mint`,
      arguments: [tx.pure(name), tx.pure("Your SUI Passport!"), tx.pure(img)],
    });
    await wallet.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });
    alert("Your NfT is minted!!");
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {id === "1" && (
        <img src="https://storage.googleapis.com/jisong/sui_passport_newbie.png" />
      )}
      {id === "2" && (
        <img src="https://storage.googleapis.com/jisong/sui_passport_expert.png" />
      )}
      {id === "3" && (
        <img
          src="https://storage.googleapis.com/jisong/sui_passport_master.png"
          style={{ width: "30rem", height: "40rem" }}
        />
      )}
      {!isConnect && (
        <ConnectButton
          label="Connect to Start"
          onConnectSuccess={(res) => {
            console.log(res);
          }}
          onConnectError={(res) => {
            console.log(res);
          }}
        />
      )}
      <StartButton
        type="button"
        className="col-lg-8 col-md-6 col-sm-8 col-12 mx-auto "
        onClick={() => {
          handleMoveCall(id);
        }}
        style={{ marginTop: "20px" }}
      >
        Mint NFT
      </StartButton>
      <StartButton
        type="button"
        className="col-lg-8 col-md-6 col-sm-8 col-12 mx-auto "
        onClick={() => {
          navigate("/question");
        }}
        style={{ marginTop: "20px" }}
      >
        Try AGAIN
      </StartButton>
    </div>
  );
}

export default Result;
