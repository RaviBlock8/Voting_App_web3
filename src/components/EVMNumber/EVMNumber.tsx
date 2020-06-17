import React from "react";
import { Box, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

interface IProps {
  num: string | undefined;
}

function EVMNumber({ num }: IProps) {
  return <EBox>Voting Machine number:{num}</EBox>;
}

const EBox = styled(Box)(() => ({
  background: "#2ac2f5",
  color: "white",
  fontSize: "23px",
  fontHeight: "21px",
  width: "100vw",
  boxSizing: "border-box",
  padding: "7px",
}));

export default EVMNumber;
