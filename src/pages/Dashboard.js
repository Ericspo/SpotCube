import * as React from 'react';
import tagStyled from 'styled-components';

import { StyledButton, StyledTextField } from 'src/shared/styled';
import useExchangeContract from 'src/shared/hooks/useExchange';
import useContract from 'src/shared/hooks/useContract';
import address from 'src/web3/contractAddress';
import validator from 'validator';
import { toast } from 'react-toastify';
import Icon from 'src/shared/core/Icon';
import { useStyles } from 'src/shared/styled';
import { getTestBNBUSDTUSDCRate } from 'src/services/bscTestNetServices';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CLIENT_URL } from 'src/config';
import { ReactComponent as CopySVG } from '../assets/svg/copy.svg';
import BNBImage from '../assets/image/bnb.png';
import USDCImage from '../assets/image/usdc.png';
import USDTImage from '../assets/image/usdt.png';
import BUSDImage from '../assets/image/busd.png';
import DOGEImage from '../assets/image/doge.png';
import WETHImage from '../assets/image/weth.png';
import SOLImage from '../assets/image/sol.png';
import SPOTICImage from '../assets/svg/spotic.svg';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';
import { ethers } from 'ethers';
import {
  BUSD_ADDR,
  DOGE_ADDR,
  SOL_ADDR,
  USDC_ADDR,
  USDT_ADDR,
  WETH_ADDR,
} from 'src/web3/bep20Addresses';
import Introduce from 'src/components/Introduce';
import styled from 'styled-components';
import JoinCommunity from 'src/components/JoinCommunity';
import Status from 'src/components/Status';
import SpoticDetail from 'src/components/SpoticDetail';
import { Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { FaDiscord, FaTiktok } from 'react-icons/fa';
import { Pinterest, Reddit, Telegram } from '@mui/icons-material';

const ContractAddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
  align-items: center;
  background: #1f36b2;
  max-width: 1000px;
  width: 100%;
  padding: 40px 0 20px 0;
  margin: auto;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  color: white;
  @media (max-width: 900px) {
    flex-direction: column;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    gap: 8px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: auto;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;
    background: white;
    width: 100%;
    height: 70px;
    top: -70px;
    left: 0%;
    z-index: 0;
    @media (max-width:900px) {
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      height: 60px;
      top: -60px;
    }
  }
  &::after {
    content: '';
    position: absolute;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    background: white;
    width: 100%;
    height: 70px;
    bottom: -140px;
    left: 0%;
    z-index: 1;
  }
`;

const ShareLinkBox = styled.div`
  gap: 17px;
  padding: 20px;
  margin-top: 30px;
  border-top: 2px solid;
  border-left: 2px solid lightgray;
  border-right: 2px solid lightgray;
  border-bottom: 2px solid gray;
  // border-bottom-right-radius: 80px;
  // border-bottom-left-radius: 80px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  @media (max-width:700px) {
    border-bottom-left-radius: 28.5px;
    border-bottom-right-radius: 28.5px;
  }
`

const ShareLinkSubBox = styled.div`
  display: flex;
  gap: 50;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  @media (max-width:700px) {
    flex-direction: column;
    align-items: start;
    gap: 12px;
  }
`

const SubTitleReferralLink = styled.div`
  margin: 0px;
  padding: 0px;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  media (max-width: 900px) {
    font-size: 16px;
    font-weight: 600;
    width: 100%;
  }
  color: rgba(39, 40, 141, 1);
  paddingTop: 0;
  font-size: 25px;
  text-align: 'left';
  @media (max-width: 700px) {
    font-size: 16px;
  }
`
const SubTitleShareLink = styled.div`
  margin: 0px;
  padding: 0px;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  media (max-width: 900px) {
    font-size: 16px;
    font-weight: 600;
    width: 100%;
  }
  color: rgba(39, 40, 141, 1);
  paddingTop: 0;
  font-size: 25;
  text-align: 'left';
  @media (max-width: 700px) {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 16px;
  }
`

const SocialLinkBox = styled.div`
  gap: 20px;
  display:flex;
  @media (max-width:700px) {
    width: 100%;
    justify-content: space-between;
    gap:8px;
  }
`

const Dashboard = () => {
  const { account } = useContract();
  const [new_hardCap, setNewHardCap] = React.useState('');
  const [new_bnb_rate, setNewBnbRate] = React.useState('');
  const [current_hardCap, setCurrentHardCap] = React.useState();

  const [current_bnb_rate, setCurrentBnbRate] = React.useState();
  const [current_stable_rate, setCurrentStableRate] = React.useState();
  const [current_sol_rate, setCurrentSolRate] = React.useState();
  const [current_doge_rate, setCurrentDogeRate] = React.useState();
  const [current_wether_rate, setCurrentWetherRate] = React.useState();
  const [bnbBalance, setBnbBalance] = React.useState(0);

  const [new_limit_cnt, setNewLimitCnt] = React.useState(0);
  const [new_owner, setNewOwner] = React.useState(null);
  const [referralAddress, setReferralAddress] = React.useState('');
  const [newReferralPercent, setNewReferralPercent] = React.useState(0);

  const [bnb_exchange_method, setBnbExchangeMethod] = React.useState('sale');
  const [usdc_exchange_method, setUsdcExchangeMethod] = React.useState('sale');
  const [usdt_exchange_method, setUsdtExchangeMethod] = React.useState('sale');
  const [busd_exchange_method, setBusdExchangeMethod] = React.useState('sale');
  const [doge_exchange_method, setDogeExchangeMethod] = React.useState('sale');
  const [weth_exchange_method, setWethExchangeMethod] = React.useState('sale');
  const [sol_exchange_method, setSolExchangeMethod] = React.useState('sale');

  const [purchase_amount, setPurchaseAmount] = React.useState(0);
  const [coin_method, setCoinMethod] = React.useState('usdt');
  const [stable_coin_rate, setStableCoinRate] = React.useState(0);

  const [openTimeAsString, setOpenTimeAsString] = React.useState('');
  const [endTimeAsString, setEndTimeAsString] = React.useState('');

  const [openDateTimeVal, setOpenDateTime] = React.useState(new Date());
  const [endDateTimeVal, setEndDateTime] = React.useState(new Date());

  const [durationAsString, setDurationAsString] = React.useState('');
  const [referralPercentAsString, setReferralPercentAsString] =
    React.useState('');

  const [stable_exchange_method, setStableExchangeMethod] =
    React.useState('sale');

  const classes = useStyles();

  const {
    getBnbRate,
    getStableRate,
    getDogeRate,
    getWetherRate,
    getSolRate,
    getHardCap,
    getEndTime,
    getReferralPercent,
    setStartedTime,
    setExpiredTime,
    setReferralPercent,
    setRate,
    setHardCap,
    setLimitedCnt,
    purchaseWithBnb,
    purchaseWithToken,
    referralPurchaseWithBnb,
    purchaseBnbWithSpotic,
    purchaseTokenWithSpotic,
    openExchangeDapp,
    closeExchangeDapp,
    isOwner,
    limitedCnt,
    openTime,
    endTime,
    openStatus,
    totalSupply,
    exchangeOwner,
    setExchangeOwner,
    getExchangeOwner,
    withdrawBnb,
    withdrawAll,
    getBnbBalance,
    setUnlimitedHandler,
    unlimited,
    preSale,
    tokenBalances,
    usdtBal,
    usdcBal,
    busdBal,
    dogeBal,
    wethBal,
    solBal,
    bnbBal,
  } = useExchangeContract();

  const [exchangedBnb, setExchangedBnb] = React.useState(bnbBal);
  const [spoticPerBnb, setSpoticPerBnb] = React.useState(0);

  const [exchangedUsdc, setExchangedUsdc] = React.useState(usdcBal);
  const [spoticPerUsdc, setSpoticPerUsdc] = React.useState(0);

  const [exchangedUsdt, setExchangedUsdt] = React.useState(usdtBal);
  const [spoticPerUsdt, setSpoticPerUsdt] = React.useState(0);

  const [exchangedBusd, setExchangedBusd] = React.useState(busdBal);
  const [spoticPerBusd, setSpoticPerBusd] = React.useState(0);

  const [exchangedDoge, setExchangedDoge] = React.useState(dogeBal);
  const [spoticPerDoge, setSpoticPerDoge] = React.useState(0);

  const [exchangedWeth, setExchangedWeth] = React.useState(wethBal);
  const [spoticPerWeth, setSpoticPerWeth] = React.useState(0);

  const [exchangedSol, setExchangedSol] = React.useState(solBal);
  const [spoticPerSol, setSpoticPerSol] = React.useState(0);

  const getCurrentBnbRate = React.useCallback(async () => {
    let rate = await getBnbRate();

    setCurrentBnbRate(rate);
  }, [getBnbRate]);

  const getCurrentStableRate = React.useCallback(async () => {
    let rate = await getStableRate();

    setCurrentStableRate(rate);
  }, [getStableRate]);

  const getCurrentSolRate = React.useCallback(async () => {
    let rate = await getSolRate();

    setCurrentSolRate(rate);
  }, [getSolRate]);

  const getCurrentDogeRate = React.useCallback(async () => {
    let rate = await getDogeRate();

    setCurrentDogeRate(rate);
  }, [getDogeRate]);

  const getCurrentWetherRate = React.useCallback(async () => {
    let rate = await getWetherRate();

    setCurrentWetherRate(rate);
  }, [getWetherRate]);

  const getCurrentreferralPercent = React.useCallback(async () => {
    const percent = await getReferralPercent();
    setReferralPercentAsString(percent);
  }, [getReferralPercent]);

  const getCurrentHardCap = React.useCallback(async () => {
    let hardCap = await getHardCap();
    setCurrentHardCap(hardCap);
  }, [getHardCap]);

  const getCurrentBnbBalance = React.useCallback(async () => {
    let bnb_balance = await getBnbBalance();
    setBnbBalance(bnb_balance);
  }, [getBnbBalance]);

  const rainbowteHandler = async () => {
    await setRate(parseInt(new_bnb_rate));
    getCurrentBnbRate();
  };

  const hardCapHandler = async () => {
    await setHardCap(parseInt(new_hardCap));
    getCurrentHardCap();
  };
  const bnbPurchaseHandler = async () => {
    try {
      await purchaseWithBnb(exchangedBnb);
    } catch (e) {
      console.log('error', e);
      toast.error('Something went wrong');
    }
  };

  const tokenPurchaseHandler = async (exchangedToken, tokenAddress) => {
    try {
      await purchaseWithToken(exchangedToken, tokenAddress);
    } catch (e) {
      console.log('error', e);
      toast.error('Something went wrong');
    }
  };

  const spoticPurchaseWithBnbHandler = async () => {
    try {
      await purchaseBnbWithSpotic(spoticPerBnb);
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const spoticPurchaseWithTokenHandler = async (
    spoticPerToken,
    tokenAddress
  ) => {
    try {
      await purchaseTokenWithSpotic(spoticPerToken, tokenAddress);
    } catch (e) {
      console.log('error in usdc', e);
      toast.error('Something went wrong');
    }
  };

  // const copyRefferalLink = () => {
  //   navigator.clipboard.writeText(referral_link ?? "");

  //   toast.success("copied referral link!");
  // };
  const referralPercentHandler = async () => {
    await setReferralPercent(newReferralPercent);
    getCurrentreferralPercent();
  };

  const getTestChainRate = async () => {
    let price_stable = await getTestBNBUSDTUSDCRate();
    setStableCoinRate(price_stable);
  };

  React.useEffect(() => {
    if (account) {
      getCurrentBnbRate();
      getCurrentStableRate();
      getCurrentSolRate();
      getCurrentDogeRate();
      getCurrentWetherRate();
      getCurrentHardCap();
      getTestChainRate();
      getCurrentBnbBalance();
      getCurrentreferralPercent();
    }
  }, [
    account,
    getCurrentBnbRate,
    getCurrentStableRate,
    getCurrentSolRate,
    getCurrentDogeRate,
    getCurrentWetherRate,
    getCurrentHardCap,
    getCurrentBnbBalance,
    getCurrentreferralPercent,
  ]);

  React.useEffect(() => {
    let date = new Date(openTime * 1000);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    let dayOfWeek = daysOfWeek[date.getDay()];
    let month = monthsOfYear[date.getMonth()];
    let dayOfMonth = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();

    let dateString = `${dayOfWeek} ${month} ${dayOfMonth} ${year} ${date.toLocaleTimeString()}`;
    setOpenTimeAsString(dateString);

    date = new Date(endTime * 1000);

    dayOfWeek = daysOfWeek[date.getDay()];
    month = monthsOfYear[date.getMonth()];
    dayOfMonth = date.getDate().toString().padStart(2, '0');
    year = date.getFullYear();

    dateString = `${dayOfWeek} ${month} ${dayOfMonth} ${year} ${date.toLocaleTimeString()}`;
    setEndTimeAsString(dateString);
  }, [endTime, openTime]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const expiredTime = new Date(endTime * 1000).getTime();
      const currentTime = new Date().getTime();

      if (expiredTime > currentTime) {
        const remainedTime = expiredTime - currentTime;
        const days = Math.floor(remainedTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainedTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainedTime % (1000 * 60)) / 1000);
        if (days > 0) {
          setDurationAsString(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          if (hours > 0) {
            setDurationAsString(`${hours}h ${minutes}m ${seconds}s`);
          } else {
            if (minutes > 0) {
              setDurationAsString(`${minutes}m ${seconds}s`);
            } else {
              setDurationAsString(`${seconds}s`);
            }
          }
        }
      } else {
        setDurationAsString('0s');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [openTime, endTime]);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setReferralAddress(searchParams.get('ref'));
  }, []);

  React.useEffect(() => {
    setExchangedBnb(bnbBal);
  }, [bnbBal]);

  React.useEffect(() => {
    setExchangedSol(solBal);
  }, [solBal]);

  React.useEffect(() => {
    setExchangedBusd(busdBal);
  }, [busdBal]);

  React.useEffect(() => {
    setExchangedUsdt(usdtBal);
  }, [usdtBal]);

  React.useEffect(() => {
    setExchangedUsdc(usdcBal);
  }, [usdcBal]);

  React.useEffect(() => {
    setExchangedWeth(wethBal);
  }, [wethBal]);

  React.useEffect(() => {
    setExchangedDoge(dogeBal);
  }, [dogeBal]);

  const openDateTimeHandler = async (e) => {
    setOpenDateTime(e);
  };

  const endDateTimeHandler = async (e) => {
    setEndDateTime(e);
  };

  const downloadHtml = async () => {};

  const copyHtmlCode = async () => {};

  const showHideHtml = async () => {};

  return (
    <>
      <Introduce />
      <Container>
        <ContractAddressContainer>
          <SubTitle>Token Sale Contract</SubTitle>
          <MiddleLetter style={{width: '80%', marginRight:'20px'}}>
            <div style={{  
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
              }}>
              {address}
            </div>
            <CopyToClipboard text={address}>
              <StyledCopySVG />
            </CopyToClipboard>
          </MiddleLetter>
        </ContractAddressContainer>

        <SpoticDetail />

        {isOwner && (
          <>
            <SubTitle>Rate</SubTitle>
            <MiddleLetter>1 USD = {current_stable_rate} SPOTIC</MiddleLetter>
            <SmallLetter>1 token = {1 / current_stable_rate} USD </SmallLetter>
            <FormLayout>
              <SpanLetter>Set new rate: </SpanLetter>
              <StyledTextField
                value={new_bnb_rate}
                onChange={(e) => setNewBnbRate(e.target.value)}
                size='small'
              />
              <SpanLetter>SPOTIC / USD: </SpanLetter>
              <StyledButton onClick={rainbowteHandler}>Change</StyledButton>
            </FormLayout>
            <SubTitle>Hard Cap</SubTitle>
            <MiddleLetter>{current_hardCap} SPOTIC</MiddleLetter>
            <MiddleLetter>
              ~ {current_stable_rate * current_hardCap} USD
            </MiddleLetter>
            <FormLayout>
              <SpanLetter>Set new hardcap: </SpanLetter>
              <StyledTextField
                value={new_hardCap}
                onChange={(e) => setNewHardCap(e.target.value)}
                size='small'
              />
              <SpanLetter>SPOTIC</SpanLetter>
              <StyledButton onClick={hardCapHandler}>Change</StyledButton>
            </FormLayout>
            {/* <MiddleLetter>Purchase Limit: {limitedCnt} </MiddleLetter>
          <MiddleLetter>
            Season Period: {new Date(openTime * 1000).toDateString()} ~{" "}
            {new Date((openTime + seasonPeriod) * 1000).toDateString()}
          </MiddleLetter> */}
            <SubTitle>Start Time</SubTitle>
            <MiddleLetter>{openTimeAsString}</MiddleLetter>
            <MiddleLetter>
              Before this time token sale contract will not sell tokens
            </MiddleLetter>
            <FormLayout>
              <SpanLetter>Change</SpanLetter>
              <DateTimePicker
                onChange={openDateTimeHandler}
                value={openDateTimeVal}
              />
              <StyledButton
                onClick={async () => {
                  const localMoment = moment(openDateTimeVal).local();
                  setStartedTime(localMoment.unix());
                }}
              >
                Change
              </StyledButton>
            </FormLayout>

            <SubTitle>End Time</SubTitle>
            <MiddleLetter>{endTimeAsString}</MiddleLetter>
            <MiddleLetter>
              Before this time token sale contract will not sell tokens
            </MiddleLetter>
            <FormLayout>
              <SpanLetter>Change</SpanLetter>
              <DateTimePicker
                onChange={endDateTimeHandler}
                value={endDateTimeVal}
              />
              <StyledButton
                onClick={async () => {
                  const localMoment = moment(endDateTimeVal).local();
                  setExpiredTime(localMoment.unix());
                }}
              >
                Change
              </StyledButton>
            </FormLayout>

            <SubTitle>Duration</SubTitle>
            <MiddleLetter>{durationAsString}</MiddleLetter>

            <SubTitle>Purchase Limit</SubTitle>
            <MiddleLetter>{limitedCnt / 10 ** 18} Spotic</MiddleLetter>
            <MiddleLetter>
              Maximum amount that can be contributed from one wallet totally
              during token sale.
            </MiddleLetter>
            <FormLayout>
              <SpanLetter>Set new limit</SpanLetter>
              <StyledTextField
                value={new_limit_cnt}
                onChange={(e) => setNewLimitCnt(e.target.value)}
                size='small'
              />
              <SpanLetter>SPOTIC</SpanLetter>
              <StyledButton
                onClick={async () => {
                  await setLimitedCnt(ethers.utils.parseEther(new_limit_cnt));
                  setNewLimitCnt(0);
                }}
              >
                Change
              </StyledButton>
              {!unlimited && (
                <StyledButton onClick={setUnlimitedHandler}>
                  Unlimited
                </StyledButton>
              )}
            </FormLayout>

            <SubTitle>Referral</SubTitle>
            <MiddleLetter>{referralPercentAsString} % </MiddleLetter>

            <MiddleLetter>
              Referral commission is paid from each referred purchase instantly
              to referrer's wallet.
            </MiddleLetter>

            <MiddleLetter>
              If you dont want to use referral program set referral percent to
              0.
            </MiddleLetter>

            <FormLayout>
              <SpanLetter>Change Percent: </SpanLetter>
              <StyledTextField
                value={newReferralPercent}
                onChange={(e) => setNewReferralPercent(e.target.value)}
                size={'small'}
              />
              <SpanLetter> % </SpanLetter>
              <StyledButton onClick={referralPercentHandler}>
                Change
              </StyledButton>
            </FormLayout>

            <SubTitle>Other functions: </SubTitle>
            <MiddleLetter>
              When the token sale finishes any accidentally occuring balance is
              automatically sent from the contract to your wallet.
            </MiddleLetter>
            <MiddleLetter>
              For any other situations these functions can be used.
            </MiddleLetter>

            <MiddleLetter>BNB on the balance: {bnbBalance} BNB</MiddleLetter>
            <MiddleLetter>
              USDC on the balance:{' '}
              {tokenBalances.find((item) => item.tokenName === 'USDC')
                ?.balance || 0}{' '}
              USDC
            </MiddleLetter>
            <MiddleLetter>
              USDT on the balance:{' '}
              {tokenBalances.find((item) => item.tokenName === 'USDT')
                ?.balance || 0}{' '}
              USDT
            </MiddleLetter>
            <MiddleLetter>
              BUSD on the balance:{' '}
              {tokenBalances.find((item) => item.tokenName === 'BUSD')
                ?.balance || 0}{' '}
              BUSD
            </MiddleLetter>
            <MiddleLetter>
              SOL on the balance:{' '}
              {tokenBalances.find((item) => item.tokenName === 'SOL')
                ?.balance || 0}{' '}
              SOL
            </MiddleLetter>
            <MiddleLetter>
              WETH on the balance:{' '}
              {tokenBalances.find((item) => item.tokenName === 'WETH')
                ?.balance || 0}{' '}
              WETH
            </MiddleLetter>
            <MiddleLetter>
              DOGE on the balance:{' '}
              {tokenBalances.find((item) => item.tokenName === 'DOGE')
                ?.balance || 0}{' '}
              DOGE
            </MiddleLetter>
            <FormLayout>
              <StyledButton onClick={withdrawAll}>WithdrawAll</StyledButton>
            </FormLayout>

            <SubTitle>Token Sale UI</SubTitle>
            <MiddleLetter>
              You can download front-end HTML file and edit the file after
              downloading, or order some design on top of it.
            </MiddleLetter>
            <MiddleLetter>
              Please keep the scripts, IDs and classes otherwise some important
              functions may not work properly.
            </MiddleLetter>
            <MiddleLetter>
              Just upload index.html file to your website - and your very own
              token sale is live! You can also copy the HTML code to clipboard
            </MiddleLetter>
            <FormLayout>
              <StyledButton onClick={downloadHtml}>
                Download HTML file
              </StyledButton>
              <StyledButton onClick={copyHtmlCode}>Copy HTML code</StyledButton>
              <StyledButton onClick={showHideHtml}>Showhide HTML</StyledButton>
            </FormLayout>

            <SubTitle>Dont have a website?</SubTitle>
            <MiddleLetter>
              You can share this link to your token sale page:
            </MiddleLetter>
            <CopyToClipboard text={'test'}>
              <CenterLayout>
                <StyledButton>Copy</StyledButton>
              </CenterLayout>
            </CopyToClipboard>

            <SubTitle>
              Your token sale contract can also work without UI
            </SubTitle>
            <MiddleLetter>
              Buyers can send BNB to contract and get tokens in return
              instantly.
            </MiddleLetter>

            <MiddleLetter>
              Recommended gas limit for correct contract execution 200, 000 or
              more for normal brokens, special tokens with auto-LP, swap, taxes,
              etc. may require gas limit over 1000, 000 .
            </MiddleLetter>

            <MiddleLetter>Inform token buyers about this!</MiddleLetter>

            <MiddleLetter>Just share token sale contract address</MiddleLetter>
            <MiddleLetter>{address}</MiddleLetter>
            <CopyToClipboard text={address}>
              <CenterLayout>
                <StyledButton>Copy</StyledButton>
              </CenterLayout>
            </CopyToClipboard>

            <SubTitle>Owner</SubTitle>
            <MiddleLetter>Address: {exchangeOwner}</MiddleLetter>
            <FormLayout>
              <SpanLetter>New Owner : </SpanLetter>
              <StyledTextField
                size='small'
                value={new_owner || ''}
                placeholder='Enter new owner address'
                onChange={(e) => {
                  setNewOwner(e.target.value);
                  setExchangeOwner(e.target.value);
                  getExchangeOwner();
                }}
                helperText={
                  new_owner !== null && !validator.isEthereumAddress(new_owner)
                    ? 'Invalid Address'
                    : ''
                }
              />
              <StyledButton>Change Owner</StyledButton>
            </FormLayout>
          </>
        )}

        {!isOwner && (
          <>
            {/* BNB */}
            <FormLayout>
              <FlexBox>
                {bnb_exchange_method === 'sale' && (
                  <>
                    <SpanLetter>
                      <img width='25' height='25' src={BNBImage} alt='bnb-logo' />
                      BNB:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={exchangedBnb}
                      onChange={(e) => setExchangedBnb(e.target.value)}
                      size='small'
                    />
                  </>
                )}
                {bnb_exchange_method === 'presale' && (
                  <>
                    <SpanLetter>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPOTIC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={spoticPerBnb}
                      onChange={(e) => setSpoticPerBnb(e.target.value)}
                      size='small'
                    />
                  </>
                )}
              </FlexBox>
              <FlexBox style={{transform: 'rotate(90deg)', width: 'fit-content', justifyContent:'start'}}>
                <Icon
                  name='exchange'
                  color='rgba(39, 40, 141, 1)'
                  
                  onClick={() =>
                    setBnbExchangeMethod(
                      `${bnb_exchange_method === 'sale' ? 'presale' : 'sale'}`
                    )
                  }
                />
              </FlexBox>
              <FlexBox>
                <SpanLetter2>
                  {bnb_exchange_method === 'sale' ? (
                    <>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPTOTIC: {exchangedBnb * current_bnb_rate}
                    </>
                  ) : (
                    <>
                      <img width='25' height='25' src={BNBImage} alt='bnb-logo' />
                      BNB: {(spoticPerBnb / current_bnb_rate).toFixed(5)}
                    </>
                  )}
                </SpanLetter2>
                <StyledButton
                  onClick={
                    bnb_exchange_method === 'sale'
                      ? bnbPurchaseHandler
                      : spoticPurchaseWithBnbHandler
                  }
                >
                  Purchase
                </StyledButton>
              </FlexBox>
            </FormLayout>
            {/* USDC */}
            <FormLayout>
              <FlexBox>
                {usdc_exchange_method === 'sale' && (
                  <>
                    <SpanLetter>
                      <img
                        width='25'
                        height='25'
                        src={USDCImage}
                        alt='usdc-logo'
                      />
                      USDC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={exchangedUsdc}
                      onChange={(e) => setExchangedUsdc(e.target.value)}
                      size='small'
                    />
                  </>
                )}
                {usdc_exchange_method === 'presale' && (
                  <>
                    <SpanLetter>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPOTIC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={spoticPerUsdc}
                      onChange={(e) => setSpoticPerUsdc(e.target.value)}
                      size='small'
                    />
                  </>
                )}
              </FlexBox>
              <FlexBox style={{transform: 'rotate(90deg)', width: 'fit-content', justifyContent:'start'}}>
                <Icon
                  name='exchange'
                  color='rgba(39, 40, 141, 1)'
                  
                  onClick={() =>
                    setBnbExchangeMethod(
                      `${bnb_exchange_method === 'sale' ? 'presale' : 'sale'}`
                    )
                  }
                />
              </FlexBox>
              <FlexBox>
                <SpanLetter2>
                  {usdc_exchange_method === 'sale' ? (
                    <>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPTOTIC:{' '}
                      {Number(exchangedUsdc * current_stable_rate).toFixed(3)}
                    </>
                  ) : (
                    <>
                      <img
                        width='25'
                        height='25'
                        src={USDCImage}
                        alt='usdc-logo'
                      />
                      USDC:{' '}
                      {Number(spoticPerUsdc / current_stable_rate).toFixed(3)}
                    </>
                  )}
                </SpanLetter2>
                <StyledButton
                  onClick={() =>
                    usdc_exchange_method === 'sale'
                      ? tokenPurchaseHandler(exchangedUsdc, USDC_ADDR)
                      : spoticPurchaseWithTokenHandler(spoticPerUsdc, USDC_ADDR)
                  }
                >
                  Purchase
                </StyledButton>
              </FlexBox>
            </FormLayout>
            {/* USDT */}
            <FormLayout>
              <FlexBox>
                {usdt_exchange_method === 'sale' && (
                  <>
                    <SpanLetter>
                      <img
                        width='25'
                        height='25'
                        src={USDTImage}
                        alt='usdt-logo'
                      />
                      USDT:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={exchangedUsdt}
                      onChange={(e) => setExchangedUsdt(e.target.value)}
                      size='small'
                    />
                  </>
                )}
                {usdt_exchange_method === 'presale' && (
                  <>
                    <SpanLetter>
                      {' '}
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPOTIC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={spoticPerUsdt}
                      onChange={(e) => setSpoticPerUsdt(e.target.value)}
                      size='small'
                    />
                  </>
                )}
              </FlexBox>
              <FlexBox style={{transform: 'rotate(90deg)', width: 'fit-content', justifyContent:'start'}}>
                <Icon
                  name='exchange'
                  color='rgba(39, 40, 141, 1)'
                  
                  onClick={() =>
                    setBnbExchangeMethod(
                      `${bnb_exchange_method === 'sale' ? 'presale' : 'sale'}`
                    )
                  }
                />
              </FlexBox>
              <FlexBox>
                <SpanLetter2>
                  {usdt_exchange_method === 'sale' ? (
                    <>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPTOTIC:{' '}
                      {Number(
                        Number(exchangedUsdt * current_stable_rate)
                      ).toFixed(2)}
                    </>
                  ) : (
                    <>
                      <img
                        width='25'
                        height='25'
                        src={USDTImage}
                        alt='usdt-logo'
                      />
                      USDT:{' '}
                      {Number(spoticPerUsdt / current_stable_rate).toFixed(3)}
                    </>
                  )}
                </SpanLetter2>
                <StyledButton
                  onClick={() =>
                    usdt_exchange_method === 'sale'
                      ? tokenPurchaseHandler(exchangedUsdt, USDT_ADDR)
                      : spoticPurchaseWithTokenHandler(spoticPerUsdt, USDT_ADDR)
                  }
                >
                  Purchase
                </StyledButton>
              </FlexBox>
            </FormLayout>

            {/* BUSD */}
            <FormLayout>
              <FlexBox>
                {busd_exchange_method === 'sale' && (
                  <>
                    <SpanLetter>
                      <img
                        width='25'
                        height='25'
                        src={BUSDImage}
                        alt='busd-logo'
                      />
                      BUSD:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={exchangedBusd}
                      onChange={(e) => setExchangedBusd(e.target.value)}
                      size='small'
                    />
                  </>
                )}
                {busd_exchange_method === 'presale' && (
                  <>
                    <SpanLetter>
                      {' '}
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPOTIC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={spoticPerBusd}
                      onChange={(e) => setSpoticPerBusd(e.target.value)}
                      size='small'
                    />
                  </>
                )}
              </FlexBox>
              <FlexBox style={{transform: 'rotate(90deg)', width: 'fit-content', justifyContent:'start'}}>
                <Icon
                  name='exchange'
                  color='rgba(39, 40, 141, 1)'
                  
                  onClick={() =>
                    setBnbExchangeMethod(
                      `${bnb_exchange_method === 'sale' ? 'presale' : 'sale'}`
                    )
                  }
                />
              </FlexBox>
              <FlexBox>
                <SpanLetter2>
                  {busd_exchange_method === 'sale' ? (
                    <>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPTOTIC:{' '}
                      {Number(
                        Number(exchangedBusd * current_stable_rate)
                      ).toFixed(2)}
                    </>
                  ) : (
                    <>
                      <img
                        width='25'
                        height='25'
                        src={BUSDImage}
                        alt='busd-logo'
                      />
                      BUSD:
                      {Number(spoticPerBusd / current_stable_rate).toFixed(3)}
                    </>
                  )}
                </SpanLetter2>
                <StyledButton
                  onClick={() =>
                    busd_exchange_method === 'sale'
                      ? tokenPurchaseHandler(exchangedBusd, BUSD_ADDR)
                      : spoticPurchaseWithTokenHandler(spoticPerBusd, BUSD_ADDR)
                  }
                >
                  Purchase
                </StyledButton>
              </FlexBox>
            </FormLayout>

            {/* DOGE */}
            <FormLayout>
              <FlexBox>
                {doge_exchange_method === 'sale' && (
                  <>
                    <SpanLetter>
                      <img
                        width='25'
                        height='25'
                        src={DOGEImage}
                        alt='doge-logo'
                      />
                      DOGE:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={exchangedDoge}
                      onChange={(e) => setExchangedDoge(e.target.value)}
                      size='small'
                    />
                  </>
                )}
                {doge_exchange_method === 'presale' && (
                  <>
                    <SpanLetter>
                      {' '}
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPOTIC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={spoticPerDoge}
                      onChange={(e) => setSpoticPerDoge(e.target.value)}
                      size='small'
                    />
                  </>
                )}
              </FlexBox>
              <FlexBox style={{transform: 'rotate(90deg)', width: 'fit-content', justifyContent:'start'}}>
                <Icon
                  name='exchange'
                  color='rgba(39, 40, 141, 1)'
                  
                  onClick={() =>
                    setBnbExchangeMethod(
                      `${bnb_exchange_method === 'sale' ? 'presale' : 'sale'}`
                    )
                  }
                />
              </FlexBox>
              <FlexBox>
                <SpanLetter2>
                  {doge_exchange_method === 'sale' ? (
                    <>
                      {' '}
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPTOTIC:{' '}
                      {Number(Number(exchangedDoge * current_doge_rate)).toFixed(
                        2
                      )}
                    </>
                  ) : (
                    <>
                      <img
                        width='25'
                        height='25'
                        src={DOGEImage}
                        alt='doge-logo'
                      />
                      DOGE: {Number(spoticPerDoge / current_doge_rate).toFixed(3)}
                    </>
                  )}
                </SpanLetter2>
                <StyledButton
                  onClick={() =>
                    doge_exchange_method === 'sale'
                      ? tokenPurchaseHandler(exchangedDoge, DOGE_ADDR)
                      : spoticPurchaseWithTokenHandler(spoticPerDoge, DOGE_ADDR)
                  }
                >
                  Purchase
                </StyledButton>
              </FlexBox>
            </FormLayout>

            {/* WETH */}
            <FormLayout>
              <FlexBox>
                {weth_exchange_method === 'sale' && (
                  <>
                    <SpanLetter>
                      <img
                        width='25'
                        height='25'
                        src={WETHImage}
                        alt='weth-logo'
                      />
                      WETH:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={exchangedWeth}
                      onChange={(e) => setExchangedWeth(e.target.value)}
                      size='small'
                    />
                  </>
                )}
                {weth_exchange_method === 'presale' && (
                  <>
                    <SpanLetter>
                      {' '}
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPOTIC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={spoticPerWeth}
                      onChange={(e) => setSpoticPerWeth(e.target.value)}
                      size='small'
                    />
                  </>
                )}
              </FlexBox>
              <FlexBox style={{transform: 'rotate(90deg)', width: 'fit-content', justifyContent:'start'}}>
                <Icon
                  name='exchange'
                  color='rgba(39, 40, 141, 1)'
                  
                  onClick={() =>
                    setBnbExchangeMethod(
                      `${bnb_exchange_method === 'sale' ? 'presale' : 'sale'}`
                    )
                  }
                />
              </FlexBox>
              <FlexBox>
                <SpanLetter2>
                  {weth_exchange_method === 'sale' ? (
                    <>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPTOTIC:{' '}
                      {Number(exchangedWeth * current_wether_rate).toFixed(2)}
                    </>
                  ) : (
                    <>
                      <img
                        width='25'
                        height='25'
                        src={WETHImage}
                        alt='weth-logo'
                      />
                      WETH:
                      {Number(spoticPerWeth / current_wether_rate).toFixed(8)}
                    </>
                  )}
                </SpanLetter2>
                <StyledButton
                  onClick={() =>
                    weth_exchange_method === 'sale'
                      ? tokenPurchaseHandler(exchangedWeth, WETH_ADDR)
                      : spoticPurchaseWithTokenHandler(spoticPerWeth, WETH_ADDR)
                  }
                >
                  Purchase
                </StyledButton>
              </FlexBox>
            </FormLayout>

            {/* Sol */}
            <FormLayout>
              <FlexBox>
                {sol_exchange_method === 'sale' && (
                  <>
                    <SpanLetter>
                      <img width='25' height='25' src={SOLImage} alt='sol-logo' />
                      SOL:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={exchangedSol}
                      onChange={(e) => setExchangedSol(e.target.value)}
                      size='small'
                    />
                  </>
                )}
                {sol_exchange_method === 'presale' && (
                  <>
                    <SpanLetter>
                      {' '}
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPOTIC:{' '}
                    </SpanLetter>
                    <StyledTextField
                      value={spoticPerSol}
                      onChange={(e) => setSpoticPerSol(e.target.value)}
                      size='small'
                    />
                  </>
                )}
              </FlexBox>
              <FlexBox style={{transform: 'rotate(90deg)', width: 'fit-content', justifyContent:'start'}}>
                <Icon
                  name='exchange'
                  color='rgba(39, 40, 141, 1)'
                  
                  onClick={() =>
                    setBnbExchangeMethod(
                      `${bnb_exchange_method === 'sale' ? 'presale' : 'sale'}`
                    )
                  }
                />
              </FlexBox>
              <FlexBox>
                <SpanLetter2>
                  {sol_exchange_method === 'sale' ? (
                    <>
                      <img
                        width='25'
                        height='25'
                        style={{
                          background: 'blue',
                          borderRadius: 5,
                          padding: 2,
                        }}
                        src={SPOTICImage}
                        alt='spotic-logo'
                      />
                      SPTOTIC:{' '}
                      {Number(exchangedSol * current_sol_rate).toFixed(2)}
                    </>
                  ) : (
                    <>
                      <img width='25' height='25' src={SOLImage} alt='sol-logo' />
                      SOL: {Number(spoticPerSol / current_sol_rate).toFixed(3)}
                    </>
                  )}
                </SpanLetter2>
                <StyledButton
                  onClick={() =>
                    sol_exchange_method === 'sale'
                      ? tokenPurchaseHandler(exchangedSol, SOL_ADDR)
                      : spoticPurchaseWithTokenHandler(spoticPerSol, SOL_ADDR)
                  }
                >
                  Purchase
                </StyledButton>
              </FlexBox>
            </FormLayout>

            {/* {account && ( */}
              <ShareLinkBox id='referral-link'>
                <ShareLinkSubBox>
                  <SubTitleReferralLink>
                    Referral Link
                  </SubTitleReferralLink>
                  <FormLayoutRefer>
                    <MiddleLetter>
                      {account!=null ? <div>{`${CLIENT_URL}/referral?ref=${account}`}</div> : <div>xxxxxxxx &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}
                      <CopyToClipboard
                        text={account!=null?`${CLIENT_URL}/referral?ref=${account}`:''}
                      >
                        <StyledCopySVG />
                      </CopyToClipboard>
                    </MiddleLetter>
                  </FormLayoutRefer>
                </ShareLinkSubBox>
                <div
                  style={{
                    display: 'flex',
                    gap: 50,
                    margin: 'auto',
                    alignItems: 'center',
                  }}
                >
                </div>
                {/* <CopyToClipboard text={`${CLIENT_URL}/referral?ref=${account}`}>
                  <CenterLayout>
                    <StyledButton>Copy</StyledButton>
                  </CenterLayout>
                </CopyToClipboard> */}
                <ShareLinkSubBox>
                  <SubTitleShareLink>
                    Share your Referral Link
                  </SubTitleShareLink>
                  <SocialLinkBox>
                    <a href="https://www.instagram.com/spoticcoin/">
                      <InstagramIcon sx={{
                        border: 'solid 2px',
                        borderRadius:'100%'
                        }}/>
                    </a>
                    <a href='https://www.facebook.com/profile.php?id=61552965301474'>
                      <FacebookRoundedIcon sx={{
                        border: 'solid 2px',
                        borderRadius:'100%'
                        }}/>
                    </a>
                    <a href='https://twitter.com/SpoticCoin'>
                      <TwitterIcon sx={{
                        border: 'solid 2px',
                        borderRadius:'100%'
                      }}/>
                    </a>
                    <a href='https://t.me/SpoticCoin'>
                      <Telegram sx={{
                        border: 'solid 2px',
                        borderRadius:'100%'
                      }}/>
                    </a>
                    <a href='https://reddit.com/user/SpoticCoin'>
                      <Reddit sx={{
                        border: 'solid 2px',
                        borderRadius:'100%'
                      }}/>
                    </a>
                    <a href='https://pinterest.com/SpoticCoin'>
                      <Pinterest sx={{
                        border: 'solid 2px',
                        borderRadius:'100%'
                      }}/>
                    </a>
                    <a href='https://discord.com/channels/1168944232283771023/1168944232975835188'>
                      <Box sx={{
                        width:'25px',
                        height:'25px',
                        border: 'solid 2px',
                        borderRadius:'100%',
                        color:'rgba(0, 0, 238, 1)',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                      }}>
                      <FaDiscord />
                      </Box>
                    </a>
                    <a href='https://www.tiktok.com/profile.php?id=61552965301474'>
                      <Box sx={{
                        width:'25px',
                        height:'25px',
                        border: 'solid 2px',
                        borderRadius:'100%',
                        color:'rgba(0, 0, 238, 1)',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                      }}>
                        <FaTiktok />
                      </Box>
                    </a>
                  </SocialLinkBox>
                  
                  {/* <Twitter></Twitter> */}
                </ShareLinkSubBox>
              </ShareLinkBox>

            {/* )} */}
            {/* <SubTitle>Purchase</SubTitle>
          <FormLayout>
            <SpanLetter>
              {coin_method === "usdt" ? "USDT" : "USDC"}:{" "}
            </SpanLetter>

            <StyledTextField
              value={purchase_amount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Select
                      placeholder="Choose a coin"
                      sx={{
                        color: "white",
                        "& svg": {
                          color: "white",
                        },
                        border: "none !important",
                      }}
                      MenuProps={{
                        className: classes.selectPaper,
                      }}
                      value={coin_method}
                      onChange={(event) => setCoinMethod(event.target.value)}
                      size="small"
                    >
                      <MenuItem value={"usdt"}>USDT</MenuItem>
                      <MenuItem value={"usdc"}>USDC</MenuItem>
                    </Select>
                  </InputAdornment>
                ),
              }}
            />
            <Icon name="exchange" color="white" />
            <SpanLetter>
              SPOTIC:
              {Number(
                (Number(purchase_amount) * Number(current_bnb_rate)) /
                  Number(stable_coin_rate)
              ).toFixed(2)}
            </SpanLetter>
            <StyledButton onClick={BuyWithStableCoin}>
              Buy With {coin_method === "usdt" ? "USDT" : "USDC"}
            </StyledButton>
          </FormLayout> */}
          </>
        )}
        <Status />
        <JoinCommunity />
      </Container>
    </>
  );
};

export default Dashboard;

const FormLayout = tagStyled.div`
    // width: 100%;
    padding-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    flex-direction: row;
    @media ( max-width: 750px ) {
      flex-direction: column;
      align-items: start;
    }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
  // @media (max-width:750px) {
  //   justify-content: space-around;
  // }
`

const FormLayoutRefer = tagStyled.div`
    padding-top: 0px;
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
`;

const CenterLayout = tagStyled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
`;

const SubTitle = tagStyled.p`
    margin: 0px;
    padding: 0px;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    media (max-width: 900px) {
      font-size: 16px;
      font-weight: 600;
      width: 100%;
    }
`;

const MiddleLetter = tagStyled.div`
    marign: 0px;
    font-size: 17px;
    text-align: center;
    display: flex;
    gap: 5px;
    align-items: center;
    border: 1px solid rgba(39, 40, 141, 1);
    border-radius: 10px;
    background: white;
    color: rgba(39, 40, 141, 1);
    padding: 0 10px;
    @media (max-width:1200) {
      padding: 0px;
    } 
`;

const StyledCopySVG = styled(CopySVG)`
  cursor: pointer;
  width: 25px;
`;

const SmallLetter = tagStyled.p`
    margin: 0px;
    padding: 0px;
    font-size: 14px;
    text-align: center;
    width: 100%;
`;

const SpanLetter = tagStyled.span`
    font-size: 18px;
    color: black;
    width: 100px;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const SpanLetter2 = tagStyled.span`
    color: black;
    max-width: 250px;
    padding-right:20px;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
`;
