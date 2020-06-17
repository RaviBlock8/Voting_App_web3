import React, { SetStateAction } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Dispatch, Action } from "redux";

interface IProps {
  candidateId: number;
  setCandidateId: any;
  handleAddCandidate: () => void;
}
export default function AddCandidate({
  candidateId,
  setCandidateId,
  handleAddCandidate,
}: IProps) {
  return (
    <Contain>
      <TextField
        style={{ margin: "5px" }}
        type="number"
        value={candidateId}
        onChange={(e) => {
          setCandidateId(e.target.value);
        }}
      />
      <AddButton
        onClick={() => {
          handleAddCandidate();
        }}
      >
        &nbsp;Add Candidate
      </AddButton>
    </Contain>
  );
}

const Contain = styled(Box)(({ theme }) => ({
  width: "100vw",
  boxSizing: "border-box",
  padding: "30px",
  display: "flex",
  justifyContent: "center",
  boxShadow: "4px 4px 20px black",
}));

const AddButton = styled(Button)(({ theme }) => ({
  background: "#40eb34",
  color: "white",
}));
