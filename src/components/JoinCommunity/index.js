import styled from 'styled-components';
import { styled as MuiStyled, Button } from '@mui/material';
import MailchimpForm from './MailChimpForm';

const FlexDiv = styled.div`
  display: flex;
  gap: 10px;
  user-select: none;
  color: white;
`;
const FlexColumn = styled(FlexDiv)`
  flex-direction: column;
`;
const Root = styled(FlexDiv)`
  margin: 50px 0;
  background-color: #1ba9ea;
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  @media (max-width:900px) {
    flex-direction: column;
    align-items: start;
  }
`;

const StyledInput = styled.input`
  border: none !important;
  height: fit-content;
  user-select: none;
  background: transparent;
  border-bottom: 1px solid white !important;
  color: white;
  padding: 10px 0;
  font-size: 15px;
  min-width: 400px;
  margin-left: auto;
  margin-right: 30px;

  @media (max-width: 900px) {
    margin-top: 46px;
    margin-left: 0px;
    margin-bottom: 10px;
  }

  &::placeholder {
    color: white;
    opacity: 1; /* Firefox */
  }

  &:active {
    border: none !important;
  }

  &:hover,
  &:focus {
    border: none !important;
    outline: none !important;
    border-bottom: 1px solid white !important;
  }
`;

const StyledButton = MuiStyled(Button)`
  border-radius: 40;
  background: white;
  font-size: 24;
  color: #0d0d2b;
  text-transform: capitalize;
  border-radius: 100px;
  font-weight: 600;
  padding: 10px 20px;
  :hover {
    background-color: #c4d2d1;
  }
`;

const JoinCommunity = () => {
  return (
    <Root>
      <FlexColumn>
        <div style={{ fontSize: 25 }}>Join Our Community</div>
        <div style={{ maxWidth: '500px' }}>
          Join now SpotCube network to get the latest news and start invest now
        </div>
      </FlexColumn>
      {/* <StyledInput placeholder='Enter your email'></StyledInput>
      <StyledButton>Subscribe</StyledButton> */}
      <MailchimpForm/>
    </Root>
  );
};

export default JoinCommunity;
