import { Contract } from "ethers";

const getCandidatesNo = async (
  voteContract: Contract | null
): Promise<number | undefined> => {
  console.log("starting..........");
  try {
    if (voteContract !== null) {
      let cno: any = await voteContract.totalCandidates();
      let cno_int = parseInt(cno.toString());
      return cno_int;
    } else {
      throw new Error("contract instance not created");
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default getCandidatesNo;
