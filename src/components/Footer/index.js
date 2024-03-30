import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { ReactComponent as Instagram } from '../../assets/svg/instagram.svg';
import { ReactComponent as Facebook } from '../../assets/svg/facebook.svg';
import { ReactComponent as Twitter } from '../../assets/svg/twitter.svg';

const FlexDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Root = styled(FlexDiv)`
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  background-color: blue;
  color: white;
  padding: 100px;
  gap: 100px;
  margin-top: 100px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 300px;
  @media (max-width: 1290px) {
    gap: 50px; 
  }
`;

const FlexColumn = styled(FlexDiv)`
  flex-direction: column;
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none !important;
`;

const FlexColumnFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: start;

  @media (max-width: 1290px) { 
    width: 100%;
    align-items: center;
  }
`

const Footer = () => {
  return (
    <Root>
      <FlexColumnFooter>
        <Logo />
        <div style={{ maxWidth: '500px' }}>
        Welcome to the SpoticCoin & SpotCube network - the all-in-one platform, through which you can activate your social media style, carry out your tasks, and achieve your goals across a variety of virtual environments, from social media to e-commerce, and from events to consulting, games, and others that are limitless, making The world is your final frontier.
        </div>
        <FlexDiv>
          <Instagram />
          <Facebook />
          <Twitter />
        </FlexDiv>
      </FlexColumnFooter>
      <FlexDiv style={{ flexGrow: 1 }}>
        <FlexColumn style={{ width: '50%' }}>
          {/* <div style={{ fontSize: '1.3rem' }}>Useful Links</div> */}
          <StyledLink href='https://spoticcoin.com/#contact'>Contact Us</StyledLink>
          {/* <StyledLink href='/nft'>NFT</StyledLink> */}
          {/* <StyledLink href='/prices'>Prices</StyledLink> */}
          <StyledLink href='https://spoticcoin.com/'>Product</StyledLink>
          {/* <StyledLink href='/company'>Company</StyledLink> */}
          {/* <StyledLink href='/learn'>Learn</StyledLink> */}
        </FlexColumn>
        <FlexColumn style={{ width: '50%' }}>
          {/* <div style={{ fontSize: '1.3rem' }}>Help & Support</div> */}
          {/* <StyledLink href='/support'>Support</StyledLink> */}
          <StyledLink href='https://spotcube.com/'>Sign Up</StyledLink>
          <StyledLink href='https://spotcube.com/#rl'>Sign In</StyledLink>
        </FlexColumn>
      </FlexDiv>
    </Root>
  );
};

export default Footer;
