import styled from 'styled-components';
import Background from '../../assets/image/intro.png';
import { Box } from '@mui/material';
import { ReactComponent as GrayCard } from '../../assets/svg/gray_card.svg';
import { ReactComponent as YellowCard } from '../../assets/svg/yellow_card.svg';
import { ReactComponent as SmallCards } from '../../assets/svg/SmallCards.svg'
import { ReactComponent as Star1 } from '../../assets/svg/star1.svg';
import { ReactComponent as Star2 } from '../../assets/svg/star2.svg';
import { ReactComponent as Star3 } from '../../assets/svg/star3.svg';
import camera from '../../assets/image/camera.png'

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 150px;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  padding-bottom: 150px;
  padding-top: 100px;
  color: white;
  position: relative;
  @media (max-width: 900px) {
    padding-top: 42px;
    padding-bottom: 100px;
  }
`;

const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 900px) {
    display: block
  }
`

const CardContainer = styled.div`
  position: relative;
  margin-top: 100px;
  padding-left: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const BigCardContainer = styled.div`
  position: relative;
`

const StyledGrayCard = styled(GrayCard)`
  right: 0;
  z-index: 2;
  position: relative;
`;

const StyledYellowCard = styled(YellowCard)`
  position: absolute;
  z-index: 1;
  right: 0;
  top: -100px;
  padding-bottom: 45px;
`;

const SmallCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-bottom: 45px;
  @media (min-width: 901px) {
    display: none;
  }
`

const StyledSmallCards = styled(SmallCards)`
`
const StyledHeader = styled.div`
  padding: 20px;
  @media (min-width: 901px) {
    padding: 76px;
  }
`

const StyledHeaderFirst = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  margin: 0;
  @media (min-width:901px) {
    font-size: 76px;
    line-height: 90px;
  }
`
const StyledHeaderSecond = styled.div`
  font-size: 32px;
  font-weight: 100;
  line-height: 48px;
  margin: 0;
  @media (min-width:901px) {
    font-size: 76px;
    line-height: 90px;
  }
`

const StyledParagraph = styled.div`
  font-size: 12px;
  max-width: 80%;
  margin-top: 14px;
  height: 120px;
  @media (min-width:901px) {
    font-size:20px;
  }
`

const StyledStar1 = styled(Star1)`
  position: absolute;
  top: 50px;
  left: 50px;
`;

const StyledStar2 = styled(Star1)`
  position: absolute;
  bottom: 80px;
  left: 50px;
`;

const StyledStar3 = styled(Star2)`
  position: absolute;
  top: 30px;
  left: 60%;
`;

const StyledStar4 = styled(Star1)`
  position: absolute;
  bottom: 80px;
  right: 50px;
`;

const StyledStar5 = styled(Star3)`
  position: absolute;
  top: 50px;
  right: 50px;
`;

const Introduce = () => {
  // useEffect(()=>{
  //   document.getElementById('spoticCoin').addEventListener
  // },[])
  return (
    <Root>
      <IntroduceContainer>
        <>
          <CardContainer> 
            <BigCardContainer>
              <StyledGrayCard />
              <img style={{position:"absolute", top:"-30px", left:'230px', zIndex:"1000" }} width={200} height={200} src={camera} alt="image"></img>
            </BigCardContainer>
            <StyledYellowCard />
          </CardContainer>
          <SmallCardContainer>
            <StyledSmallCards/>
          </SmallCardContainer>
        </>
        <StyledHeader>
          <StyledHeaderFirst>Take this opportunity to</StyledHeaderFirst>
          <StyledHeaderSecond>
            SHINE with $SPOTIC!
          </StyledHeaderSecond>
          <StyledParagraph>
            Invest in the future with $SPOTIC. Join a revolutionary cryptocurrency
            with massive potential for growth and innovation. Don't miss out,
            invest with $SPOTIC now!
          </StyledParagraph>
        </StyledHeader>
      </IntroduceContainer>
      <StyledStar1 />
      <StyledStar2 />
      <StyledStar3 />
      <StyledStar4 />
      <StyledStar5 />
    </Root>
  );
};

export default Introduce;
