import * as React from 'react';

import useContract from './useContract';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import useSpoticContract from './useSpotic';
import exchangeAddress from 'src/web3/contractAddress';
import abi from 'src/web3/contractAbi.json';
import { tokenAddresses } from 'src/web3/bep20Addresses';

function useExchangeContract() {
  const {
    exchangeInstance,
    usdcInstance,
    usdtInstance,
    spoticInstance,
    busdInstance,
    dogeInstance,
    etherInstance,
    solInstance,
    signer,
    account,
  } = useContract();

  const { approve } = useSpoticContract();

  const [isOwner, setIsOwner] = React.useState(false);

  const [limitedCnt, setLimitedCnt] = React.useState(0);
  const [openTime, setOpenTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [exchangeOwner, setOwner] = React.useState('');

  const [unlimited, setUnlimited] = React.useState(false);

  const [tokenBalances, setTokenBalances] = React.useState([]);

  const [bnbBal, setBnbBal] = React.useState(0);
  const [usdcBal, setUsdcBal] = React.useState(0);
  const [usdtBal, setUsdtBal] = React.useState(0);
  const [busdBal, setBusdBal] = React.useState(0);
  const [dogeBal, setDogeBal] = React.useState(0);
  const [wethBal, setWethBal] = React.useState(0);
  const [solBal, setSolBal] = React.useState(0);
  const [preSale, setPreSale] = React.useState(true);

  const getExchangeOwner = React.useCallback(async () => {
    let owner = await exchangeInstance.owner();

    setOwner(owner);
  }, [exchangeInstance]);

  const setExchangeOwner = async (new_owner) => {
    try {
      let receipt = await exchangeInstance.transferOwnership(new_owner);

      await receipt.wait();

      return;
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const getBnbBalance = React.useCallback(async () => {
    let bnbBalance = await exchangeInstance.getBnbBalance();
    return parseInt(bnbBalance.toString()) / 10 ** 18;
  }, [exchangeInstance]);

  const getTokenBalance = React.useCallback(async () => {
    const tmpBalance = await Promise.all(
      tokenAddresses.map(async (token) => {
        let tokenBalance = await exchangeInstance.getTokenBalance(
          token.address
        );

        return {
          ...token,
          balance: Math.floor(parseInt(tokenBalance.toString()) / 10 ** 18),
        };
      })
    );
    setTokenBalances(tmpBalance);
  }, [exchangeInstance]);

  const getCurBalances = React.useCallback(async () => {
    if (!account) {
      return;
    }
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://bsc-dataseed1.binance.org'
      );
      const balanceInWei = await provider.getBalance(account);
      const balanceInBNB = ethers.utils.formatEther(balanceInWei);

      const usdc = await usdcInstance.balanceOf(account);
      const usdt = await usdtInstance.balanceOf(account);
      const busd = await busdInstance.balanceOf(account);
      const doge = await dogeInstance.balanceOf(account);
      const weth = await etherInstance.balanceOf(account);
      const sol = await solInstance.balanceOf(account);
      setBnbBal(balanceInBNB);
      setUsdcBal(parseInt(usdc._hex, 16) / 10 ** 18);
      setUsdtBal(parseInt(usdt._hex, 16) / 10 ** 18);
      setBusdBal(parseInt(busd._hex, 16) / 10 ** 18);
      setDogeBal(parseInt(doge._hex, 16) / 10 ** 8);
      setWethBal(parseInt(weth._hex, 16) / 10 ** 18);
      setSolBal(parseInt(sol._hex, 16) / 10 ** 18);
    } catch (e) {
      console.log('error in getting balance', e);
    }
  }, [
    account,
    busdInstance,
    dogeInstance,
    etherInstance,
    solInstance,
    usdcInstance,
    usdtInstance,
  ]);

  const getStatusOfPreSale = React.useCallback(async () => {
    // let status = await exchangeInstance.preSale();
    // setPreSale(status);
    // return status;
  }, [exchangeInstance]);

  const getHardCap = React.useCallback(async () => {
    let hardCap = await exchangeInstance.getHardCap();
    return parseInt(hardCap.toString());
  }, [exchangeInstance]);

  const getStatusOfLimit = React.useCallback(async () => {
    let statusOfLimit = await exchangeInstance.getStatusOfLimit();
    setUnlimited(statusOfLimit);
    return statusOfLimit;
  }, [exchangeInstance]);

  const getReferralPercent = React.useCallback(async () => {
    let referralPercent = await exchangeInstance.getReferralPercent();
    return parseInt(referralPercent.toString()) / 100;
  }, [exchangeInstance]);

  const checkIfOwner = React.useCallback(async () => {
    let bOwner = await exchangeInstance.checkIfOwner();

    setIsOwner(bOwner);

    return;
  }, [exchangeInstance]);

  const setPurchaseCnt = async (new_limited_cnt) => {
    try {
      let receipt = await exchangeInstance.setPurchaseLimit(new_limited_cnt);

      await receipt.wait();
      await getStatusOfLimit();

      getLimiteCnt();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setHardCap = async (new_limited_cnt) => {
    try {
      let receipt = await exchangeInstance.setHardCap(new_limited_cnt);

      await receipt.wait();

      getLimiteCnt();

      return;
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setRate = async (new_exchange_rate) => {
    try {
      let receipt = await exchangeInstance.setRate(new_exchange_rate);

      await receipt.wait();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setUsdtRate = async (new_exchange_rate) => {
    try {
      let receipt = await exchangeInstance.setUsdtRate(new_exchange_rate);

      await receipt.wait();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setUsdcRate = async (new_exchange_rate) => {
    try {
      let receipt = await exchangeInstance.setUsdcRate(new_exchange_rate);

      await receipt.wait();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setStartedTime = async (newStartedTime) => {
    try {
      let receipt = await exchangeInstance.setStartTime(newStartedTime);

      await receipt.wait();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setExpiredTime = async (newEndTime) => {
    try {
      let receipt = await exchangeInstance.setEndTime(newEndTime);

      await receipt.wait();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setReferralPercent = async (newPercent) => {
    try {
      let receipt = await exchangeInstance.setReferralPercent(newPercent * 100);

      await receipt.wait();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const setUnlimitedHandler = async () => {
    try {
      let receipt = await exchangeInstance.setUnlimited();
      await receipt.wait();
      setUnlimited(true);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const getBnbRate = React.useCallback(async () => {
    let exchange_rate = await exchangeInstance.getBnbRate();

    return (Number(exchange_rate) / 1000).toString();
  }, [exchangeInstance]);

  const getStableRate = React.useCallback(async () => {
    let exchange_rate = await exchangeInstance.getStableRate();
    return (Number(exchange_rate) / 1000).toString();
  }, [exchangeInstance]);

  const getWetherRate = React.useCallback(async () => {
    let exchange_rate = await exchangeInstance.getEtherRate();

    return (Number(exchange_rate) / 1000).toString();
  }, [exchangeInstance]);

  const getSolRate = React.useCallback(async () => {
    let exchange_rate = await exchangeInstance.getSolRate();

    return (Number(exchange_rate) / 1000).toString();
  }, [exchangeInstance]);

  const getDogeRate = React.useCallback(async () => {
    let exchange_rate = await exchangeInstance.getDogeRate();

    return (Number(exchange_rate) / 1000).toString();
  }, [exchangeInstance]);

  const getContractInstance = (tokenAddress) => {
    const token = tokenAddresses.find((item) => item.address === tokenAddress);
    switch (token.tokenName) {
      case 'USDC':
        return usdcInstance;
      case 'USDT':
        return usdtInstance;
      case 'BUSD':
        return busdInstance;
      case 'DOGE':
        return dogeInstance;
      case 'WETH':
        return etherInstance;
      case 'SOL':
        return solInstance;
      default:
        return null;
    }
  };

  const purchaseWithToken = async (token_amount, tokenAddress) => {
    try {
      let receipt;
      let contractInstance = getContractInstance(tokenAddress);

      let allowance = await contractInstance.allowance(
        account,
        exchangeAddress
      );

      console.log('allowance', allowance);
      if (allowance < token_amount) {
        receipt = await contractInstance.approve(
          exchangeAddress,
          ethers.utils.parseEther(token_amount)
        );

        await receipt.wait();
      }

      receipt = await exchangeInstance.purchaseWithToken(
        ethers.utils.parseEther(token_amount),
        tokenAddress
      );

      await receipt.wait();

      return;
    } catch (err) {
      console.log(err);
    }
  };

  const purchaseWithBnb = async (amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const curSigner = provider.getSigner();
    const contract = new ethers.Contract(exchangeAddress, abi, curSigner);

    try {
      const price = ethers.utils.parseUnits(amount.toString(), 'ether');
      const tx = await contract.purchaseWithBnb({
        value: price,
      });
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseBnbWithSpotic = async (amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const curSigner = provider.getSigner();
    const contract = new ethers.Contract(exchangeAddress, abi, curSigner);
    await approve(amount);
    // const price = ethers.utils.parseUnits(amount.toString(), "ether");
    const tx = await contract.purchaseBnbWithSpotic(
      ethers.utils.parseEther(amount)
    );
    await tx.wait();
  };

  const purchaseTokenWithSpotic = async (amount, tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const curSigner = provider.getSigner();
    const contract = new ethers.Contract(exchangeAddress, abi, curSigner);
    // const contractInstance = getContractInstance(tokenAddress);
    let allowance = await spoticInstance.allowance(account, exchangeAddress);
    if (allowance < amount) {
      let receipt = await spoticInstance.approve(
        exchangeAddress,
        ethers.utils.parseEther(amount)
      );

      await receipt.wait();
    }
    // const price = ethers.utils.parseUnits(amount.toString(), "ether");
    const tx = await contract.purchaseTokenWithSpotic(
      ethers.utils.parseEther(amount),
      tokenAddress
    );
    await tx.wait();
  };

  const referralPurchaseWithBnb = async (spotic_amount) => {
    try {
      await approve(spotic_amount);

      let receipt = await exchangeInstance.retransfer(parseInt(spotic_amount));

      await receipt.wait();

      return;
    } catch (err) {
      console.log(err);
    }
  };

  const getHardcap = React.useCallback(async () => {
    let _hardCap = await exchangeInstance.getHardCap();

    return _hardCap;
  }, [exchangeInstance]);

  const getLimiteCnt = React.useCallback(async () => {
    let _limiteCnt = await exchangeInstance.getPurchaseLimit();

    setLimitedCnt(_limiteCnt.toString());

    return;
  }, [exchangeInstance]);

  const getStartedTime = React.useCallback(async () => {
    let startedTime = await exchangeInstance.getStartedTime();
    setOpenTime(startedTime);
    return startedTime;
  }, [exchangeInstance]);

  const getEndTime = React.useCallback(async () => {
    let _seasonPeriod = await exchangeInstance.getEndTime();
    setEndTime(_seasonPeriod);
    return _seasonPeriod;
  }, [exchangeInstance]);

  const getStatus = React.useCallback(async () => {
    let _opened = await exchangeInstance.getStatus();

    setOpenStatus(_opened);

    return;
  }, [exchangeInstance]);

  const openExchangeDapp = async () => {
    try {
      let receipt = await exchangeInstance.setPaused(false);

      await receipt.wait();

      await getStatus();

      return;
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const closeExchangeDapp = async () => {
    try {
      let receipt = await exchangeInstance.setPaused(true);

      await receipt.wait();

      await getStatus();

      return;
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const withdrawBnb = async () => {
    try {
      let receipt = await exchangeInstance.withdrawBnb();

      await receipt.wait();

      return;
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const withdrawAll = async () => {
    try {
      let receipt = await exchangeInstance.withdrawAll();

      await receipt.wait();

      return;
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  React.useEffect(() => {
    if (signer && exchangeInstance) {
      getHardcap();
      getLimiteCnt();
      getStartedTime();
      getStatus();
      getEndTime();
      getHardCap();
      getExchangeOwner();
      getBnbRate();
      checkIfOwner();
      getTokenBalance();
      getStatusOfPreSale();
    }
  }, [
    signer,
    exchangeInstance,
    getBnbRate,
    getHardcap,
    getLimiteCnt,
    getStartedTime,
    getStatus,
    getEndTime,
    getHardCap,
    getExchangeOwner,
    checkIfOwner,
    getTokenBalance,
  ]);

  React.useEffect(() => {
    getCurBalances();
  }, [getCurBalances]);

  return {
    setStartedTime,
    setExpiredTime,
    setRate,
    setUsdcRate,
    setUsdtRate,
    setHardCap,
    setReferralPercent,
    getReferralPercent,
    getBnbRate,
    getStableRate,
    getDogeRate,
    getWetherRate,
    getSolRate,
    getHardCap,
    getEndTime,
    getBnbBalance,
    getTokenBalance,
    purchaseWithBnb,
    purchaseWithToken,
    referralPurchaseWithBnb,
    purchaseBnbWithSpotic,
    purchaseTokenWithSpotic,
    openExchangeDapp,
    closeExchangeDapp,
    setLimitedCnt: setPurchaseCnt,
    getExchangeOwner,
    setExchangeOwner,
    withdrawBnb,
    withdrawAll,
    setUnlimitedHandler,
    unlimited,
    preSale,
    limitedCnt,
    openTime,
    endTime,
    openStatus,
    exchangeOwner,
    isOwner,
    tokenBalances,
    bnbBal,
    usdtBal,
    usdcBal,
    busdBal,
    dogeBal,
    wethBal,
    solBal,
  };
}

export default useExchangeContract;
