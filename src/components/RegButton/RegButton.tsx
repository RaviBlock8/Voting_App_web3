import React from "react";
import { Button, Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

interface IProps {
  registered: Boolean | null;
  setRegistered: any;
}

function RegButton({ registered, setRegistered }: IProps) {
  return registered === null ? null : !registered ? (
    <RButton
      onClick={() => {
        setRegistered();
      }}
    >
      Register yourself
    </RButton>
  ) : (
    <Box>is registered already</Box>
  );
}

const RButton = styled(Button)(({ theme }) => ({
  background: "#40eb34",
  color: "white",
}));

export default RegButton;
