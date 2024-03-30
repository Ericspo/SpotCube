import * as React from "react";

import * as Wagmi from "wagmi";
import address from "src/web3/contractAddress";
import abi from "src/web3/contractAbi.json";
import spoticAddress from "src/web3/spoticAddress";
import spoticAbi from "src/web3/spoticAbi.json";
import bep20Abi from "src/web3/bep20Abi.json";
import {
  BUSD_ADDR,
  DOGE_ADDR,
  SOL_ADDR,
  USDC_ADDR,
  USDT_ADDR,
  WETH_ADDR,
} from "src/web3/bep20Addresses";

function useContract() {
  const [account, setAccount] = React.useState(null);

  const { data: signer } = Wagmi.useSigner();

  const exchangeInstance = Wagmi.useContract({
    address: address,
    abi: abi,
    signerOrProvider: signer,
  });

  const spoticInstance = Wagmi.useContract({
    address: spoticAddress,
    abi: spoticAbi,
    signerOrProvider: signer,
  });

  const usdtInstance = Wagmi.useContract({
    address: USDT_ADDR,
    abi: bep20Abi,
    signerOrProvider: signer,
  });

  const usdcInstance = Wagmi.useContract({
    address: USDC_ADDR,
    abi: bep20Abi,
    signerOrProvider: signer,
  });

  const busdInstance = Wagmi.useContract({
    address: BUSD_ADDR,
    abi: bep20Abi,
    signerOrProvider: signer,
  });

  const dogeInstance = Wagmi.useContract({
    address: DOGE_ADDR,
    abi: bep20Abi,
    signerOrProvider: signer,
  });

  const solInstance = Wagmi.useContract({
    address: SOL_ADDR,
    abi: bep20Abi,
    signerOrProvider: signer,
  });

  const etherInstance = Wagmi.useContract({
    address: WETH_ADDR,
    abi: bep20Abi,
    signerOrProvider: signer,
  });

  const getAddress = async (signer) => {
    let address = await signer.getAddress();
    setAccount(address);
  };

  React.useEffect(() => {
    if (signer) {
      getAddress(signer);
    }
  }, [signer]);

  return {
    signer,
    account,
    exchangeInstance,
    spoticInstance,
    usdtInstance,
    usdcInstance,
    etherInstance,
    busdInstance,
    dogeInstance,
    solInstance,
  };
}

export default useContract;
