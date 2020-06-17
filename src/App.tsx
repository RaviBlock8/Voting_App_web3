import React, { useEffect, useState } from "react";
import "./App.css";
import { loadWeb3, getAccount, loadingContract } from "./utils/getWeb3";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Istate } from "./store/reducer";
import { Contract } from "ethers";
import Vote from "./abis/Vote.json";
import AccountCard from "./components/AccountCard/AccountCard";
import AddCandidate from "./components/AddCandidate/AddCandidate";
import EVMNumber from "./components/EVMNumber/EVMNumber";
import getCandidatesNo from "./utils/getCandidatesNo";

interface IProps {
  account: string;
  voteContract: Contract | null;
  setAccount: (account: string) => void;
  setContract: (vote: Contract) => void;
}

const App = ({ account, voteContract, setAccount, setContract }: IProps) => {
  const address = "0x3a10fb64178a8aeac1c847b10139434aa65d79d2";
  const [candidateId, setCandidateId] = useState(0);
  const [isRegistered, setRegistered] = useState(false);
  const refreshWeb3 = async (): Promise<void> => {
    loadWeb3().then(() => {
      getAccount().then((_account) => {
        if (_account !== undefined) {
          setAccount(_account);
        }
        loadingContract(JSON.stringify(Vote.abi), address).then(
          async (voteContract) => {
            console.log(voteContract);
            if (voteContract !== undefined) {
              setContract(voteContract);
              await getCandidatesNo(voteContract);
              voteContract?.registered(_account).then((val: boolean) => {
                console.log("is reg.:", val);
                setRegistered(val);
              });
            }
          }
        );
      });
    });
  };
  useEffect(() => {
    refreshWeb3().then(async () => {
      window.ethereum.on("accountsChanged", async () => {
        await refreshWeb3();
      });
    });
  }, []);

  const handleAddCandidate = (): void => {
    console.log("ci", candidateId);
    voteContract?.addCandidate(candidateId).then(() => {
      alert("candidate added");
    });
  };

  const handleRegister = (): void => {
    voteContract?.register().then(() => {
      setRegistered(true);
    });
  };

  return account === " " ? (
    <div>Account loading....</div>
  ) : (
    <>
      <AccountCard
        account={account}
        registered={isRegistered}
        setRegistered={handleRegister}
      />
      <EVMNumber num={voteContract?.address} />
      <AddCandidate
        candidateId={candidateId}
        setCandidateId={setCandidateId}
        handleAddCandidate={handleAddCandidate}
      />
    </>
  );
};

declare global {
  interface Window {
    FB: any;
    ethereum: any;
    web3: any;
  }
}

const matchStateToProps = (state: Istate) => {
  return {
    account: state.account,
    voteContract: state.voteContract,
  };
};
const matchDispatchToProps = (dispatch: Dispatch) => {
  return {
    setAccount: (account: string) => {
      dispatch({ type: "ACCOUNT", account: account });
    },
    setContract: (vote: Contract) => {
      dispatch({ type: "VOTECONTRACT", voteContract: vote });
    },
  };
};
export default connect(matchStateToProps, matchDispatchToProps)(App);
