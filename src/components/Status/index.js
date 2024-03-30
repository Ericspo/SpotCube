import { PieChart } from '@mui/x-charts';
import styled from 'styled-components';
import { ReactComponent as StatusIcon } from '../../assets/svg/status.svg';
import StatusCornerImage from '../../assets/image/status.png';

import DesktopTableImage from '../../assets/image/desktop-table.png'
import MobileTableImage from '../../assets/image/mobile-table.png'

const FlexDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const AlginStartDiv = styled(FlexDiv)`
  align-items: start;
`;

const Root = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding-top: 50px;
  width: 100%;
`;

const PositionDiv = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RevenuseFlexDivF = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  margin-top: 20px;
  flex-direction: row;
  @media (max-width:700px) {
    width: 80%;
    flex-direction: column;
    align-items: start;
    margin-top: 0px;
  }
`
const RevenuseFlexDivS = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  margin-top: 100px;
  flex-direction: row;
  @media (max-width:700px) {
    width: 80%;
    flex-direction: column;
    align-itmes: start;
    margin-top:50px;
  }
`

const BlueUL = styled.ul`
  & li {
    color: darkblue;
    margin: 5px;
  }
`;

const Dotline1 = styled.div`
  border-top: 2px dashed #1b1e96;
  border-left: 2px dashed #1b1e96;
  width: 150px;
  height: 100px;
`;

const FirstLabelRoot = styled.div`
  position: absolute;
  top: 25px;
  right: calc(100% - 50px);
`;

const FirstLabel = () => {
  return (
    <FirstLabelRoot>
      <div style={{ marginLeft: 100, textAlign: 'center' }}>
        <div>65%</div>
        <Dotline1 />
      </div>
      <BlueUL>
        <li>Platform Growth</li>
        <li>development costs</li>
        <li>Marketing investment</li>
        <li>Covering legal costs</li>
      </BlueUL>
    </FirstLabelRoot>
  );
};

const PurpleUL = styled.ul`
  width: 200px;
  & li {
    color: #6145c5;
    margin: 5px;
  }
`;

const Dotline21 = styled.div`
  border-right: 2px dashed #6145c5;
  width: 50px;
  height: 50px;
`;

const Dotline22 = styled.div`
  border-top: 2px dashed #6145c5;
  border-left: 2px dashed #6145c5;
  width: 50px;
  height: 50px;
`;

const SecondLabelRoot = styled.div`
  position: absolute;
  top: 100%;
  right: calc(50% - 40px);
`;

const SecondLabel = () => {
  return (
    <SecondLabelRoot>
      <div style={{ marginLeft: 100, textAlign: 'center' }}>
        <Dotline21>9%</Dotline21>
        <Dotline22 />
      </div>
      <PurpleUL>
        <li>For distribution and network simulation</li>
      </PurpleUL>
    </SecondLabelRoot>
  );
};

const GrayUL = styled.ul`
  margin-left: calc(100% - 50px);
  width: 250px;
  & li {
    color: #e5e5e7;
    margin: 5px;
  }
`;

const Dotline3 = styled.div`
  border-top: 2px dashed #e5e5e7;
  border-right: 2px dashed #e5e5e7;
  width: 150px;
  height: 100px;
`;

const ThirdLabelRoot = styled.div`
  position: absolute;
  bottom: calc(-100% + 50px);
  left: calc(100% - 250px);
`;

const ThirdLabel = () => {
  return (
    <ThirdLabelRoot>
      <div style={{ marginLeft: 100, textAlign: 'center' }}>
        <Dotline3>20%</Dotline3>
      </div>
      <GrayUL>
        <li>
          Of the total tokens available purchase via pre-sale and crowd sale
        </li>
      </GrayUL>
    </ThirdLabelRoot>
  );
};

const LightBlueUL = styled.ul`
  margin-left: 50%;
  width: 250px;
  & li {
    color: #1ba9ea;
    margin: 5px;
  }
`;

const Dotline4 = styled.div`
  border-bottom: 2px dashed #1ba9ea;
  border-right: 2px dashed #1ba9ea;
  width: 100px;
  height: 50px;
`;

const FourLabelRoot = styled.div`
  position: absolute;
  top: -17%;
  left: calc(100% - 250px);
`;

const FourLabel = () => {
  return (
    <FourLabelRoot>
      <LightBlueUL>
        <li>Dedicated to investors and team</li>
      </LightBlueUL>
      <div style={{ marginLeft: 100, textAlign: 'center' }}>
        <Dotline4>3.5%</Dotline4>
      </div>
    </FourLabelRoot>
  );
};

const Header1 = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #1b1e96;
  padding: 20px;
  margin-bottom: 50px;
  @media (max-width:700px) {
    margin-bottom: 39px;
  }
`;

const Image1 = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Image2 = styled.img`
  position: absolute;
  top: 50px;
  right: 10px;
`;

const ImageDesktop = styled.img`
  width: 70vw; /* Set the width of the image to 100% of the viewport width */
  height: auto; /* Allow the browser to adjust the height while maintaining the original aspect ratio */
  display: block;
  margin: 0;
  padding: 0;
  object-fit: cover;
  @media (max-width:500px) {
    display: none;
  }
`
const ImageMobile = styled.img`
  width: 90vw; /* Set the width of the image to 100% of the viewport width */
  height: auto; /* Allow the browser to adjust the height while maintaining the original aspect ratio */
  display: block;
  margin: 0;
  padding: 0;
  @media (min-width:501px) {
    display: none;
  }
`

const Status = () => {
  return (
    <Root>
      <div style={{width:'90%', display: 'flex', justifyContent:'center'}}>
        <ImageDesktop src={DesktopTableImage}></ImageDesktop>
        <ImageMobile src={MobileTableImage}></ImageMobile>
      </div>
      <PositionDiv style={{ width: '100%', marginTop: '50px' }}>
        <Header1>Uses Of Revenuse</Header1>
        <RevenuseFlexDivF>
          <AlginStartDiv>
            <StatusIcon style={{ width: 50, height: 50 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#1b1e96' }}>
                40%
              </div>
              <div style={{ fontSize: 12 }}>For development</div>
            </div>
          </AlginStartDiv>
          <AlginStartDiv>
            <StatusIcon style={{ width: 50, height: 50 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#1b1e96' }}>
                5%
              </div>
              <div style={{ fontSize: 12 }}>For administrative needs</div>
            </div>
          </AlginStartDiv>
          <AlginStartDiv>
            <StatusIcon style={{ width: 50, height: 50 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#1b1e96' }}>
                5%
              </div>
              <div style={{ fontSize: 12 }}>For legal expenses</div>
            </div>
          </AlginStartDiv>
        </RevenuseFlexDivF>
        <RevenuseFlexDivS>
          <AlginStartDiv>
            <StatusIcon style={{ width: 50, height: 50 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#1b1e96' }}>
                6%
              </div>
              <div style={{ fontSize: 12 }}>Unforeseen costs and operating</div>
            </div>
          </AlginStartDiv>
          <AlginStartDiv>
            <StatusIcon style={{ width: 50, height: 50 }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#1b1e96' }}>
                44%
              </div>
              <div style={{ fontSize: 12, width: 300 }}>
                To expand adoption, this includes growing and maintaining the
                platform's community including growth and PR advisors,
                Partnerships, affiliate programs, etc.
              </div>
            </div>
          </AlginStartDiv>
        </RevenuseFlexDivS>
      </PositionDiv>
    </Root>
  );
};

export default Status;
