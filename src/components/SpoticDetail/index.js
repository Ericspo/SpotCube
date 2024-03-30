import styled from 'styled-components';
import Background from '../../assets/image/detail_background.png';
const Root = styled.div`
  display: flex;
  background-size: 100% 100%;
  background-image: url(${Background});
  min-height: 100px;
  margin: 20px 0 50px 0;
  padding: 7px;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #ffffff;
  // border-radius: 8px;
  // border: 1px solid white;
  // background: #f5f0f01f;
  // display: grid;
  // grid-template-areas:
  //   'item1 item2 item3'
  //   'progressbar progressbar progressbar' 'links links links';
  // width: 100%;
  // padding: 20px;
`;

const DetailInfoContainer = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
`
const DetailInfoSubContainer = styled.div `
  display: flex;
  flex-direction: row;
  gap: 80px;
  @media (max-width:1000px) {
    flex-direction: column;
    gap: 10px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  gap: 10px;
`;

const PriceDiv = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: white;
`;

const PriceType = styled.span`
  min-width: 70px;
  display: inline-flex;
  justify-content: left;
`;

const GrayText = styled.span`
  color: gray;
`;

const ProgressBarContainer = styled.div`
  margin-right: 0px;
  grid-area: progressbar;
  display: flex;
  background-color: white;
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
  margin-top: 12px;
  margin-bottom: 12px;
`;
const ProgressBarItem = styled.div`
  width: 30%;
  height: 100%;
  background-color: #1ba9ea;
`;

const StyledButton = styled.a`
  color: white;
  background-color: #647ed0;
  height: 45px;
  width: 150px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  flex: 1;
  cursor: pointer;
  text-decoration: none;
`;

const SpoticDetail = () => {
  return (
    <Root>
      <Container>
        <DetailInfoContainer>
          <DetailInfoSubContainer>
            <Row style={{ 'grid-area': 'item1' }}>
              <PriceDiv>1 $SPOTIC: $0.02</PriceDiv>
            </Row>
            <Row style={{ 'grid-area': 'item2', flexDirection: 'column' }}>
              <div>
                <PriceType>Raised:</PriceType>{' '}
                <GrayText>$203,023 / $12,000,000</GrayText>
              </div>
              <div style={{marginLeft: '10px'}}>
                <PriceType>Sold:</PriceType>{' '}
                <GrayText>$203,023 / $4,000,000</GrayText>
              </div>
            </Row>
          </DetailInfoSubContainer>
          <DetailInfoSubContainer>
            <Row
              style={{ 'grid-area': 'item1' }}
            >
              <PriceDiv>Phase 1</PriceDiv>
            </Row>
            <Row style={{flexDirection:'column'}}>
              <PriceType>
                Next Phase: $0.04
              </PriceType>
              <PriceType>
                Final Phase: $0.08
              </PriceType>
            </Row>
          </DetailInfoSubContainer>
        </DetailInfoContainer>
        <ProgressBarContainer>
          <ProgressBarItem></ProgressBarItem>
        </ProgressBarContainer>
        <Row style={{ 'grid-area': 'links', flexWrap: 'wrap' }}>
          <StyledButton href='#referral-link'>Earn by referring!</StyledButton>
          <StyledButton href='#'>Earn by Marketing</StyledButton>
          <StyledButton href='#'>White Paper</StyledButton>
          <StyledButton href='https://www.spoticcoin.com/eco-system'>Eco System</StyledButton>
          <StyledButton href='https://www.spoticcoin.com#section6'>Road Maps</StyledButton>
        </Row>
      </Container>
    </Root>
  );
};

export default SpoticDetail;
