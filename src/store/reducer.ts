import React from "react";
import {Contract} from "ethers"

export interface Istate {
  account: string;
  voteContract:Contract|null
}
const initialState: Istate = {
  account: " ",
  voteContract:null
};
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "ACCOUNT":
      return {
        ...state,
        account: action.account,
      };
    case "VOTECONTRACT":
        return {
            ...state,
            voteContract:action.voteContract
        }
    default:
      return state;
  }
}

export default reducer;
