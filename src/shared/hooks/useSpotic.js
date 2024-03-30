import * as React from "react";

import useContract from "./useContract";
import { ethers } from "ethers";
import exchangeAddress from "src/web3/contractAddress";

function useSpoticContract() {
  const { spoticInstance, signer, account } = useContract();

  const approveToken = async (amount) => {
    try {
      let allowance = await spoticInstance.allowance(account, exchangeAddress);
      if (allowance < amount) {
        let receipt = await spoticInstance.approve(
          exchangeAddress,
          ethers.utils.parseEther(amount)
        );

        receipt.wait();
      }

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  };
  React.useEffect(() => {
    if (signer && spoticInstance) {
    }
  }, [signer, spoticInstance]);

  return {
    approve: approveToken,
  };
}

export default useSpoticContract;
