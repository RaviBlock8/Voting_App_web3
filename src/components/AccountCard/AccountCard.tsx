import React from "react";
import { Box, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import RegButton from "../RegButton/RegButton";

interface IProps {
  account: string;
  registered: Boolean | null;
  setRegistered: any;
}

function AccountCard({ account, registered, setRegistered }: IProps) {
  return (
    <Header>
      Your account no. :<AccountNo>{account}</AccountNo>
      <RegButton registered={registered} setRegistered={setRegistered} />
    </Header>
  );
}

const Header = styled(Box)(({ theme }) => ({
  width: "100vw",
  boxSizing: "border-box",
  background: "black",
  color: "white",
  fontSize: "21px",
  lineHeight: "21px",
  padding: "20px",
}));

const AccountNo = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "22px",
}));

export default AccountCard;
