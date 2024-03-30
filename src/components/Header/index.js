import { ConnectButton } from '@rainbow-me/rainbowkit';
import tagStyled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import Navbar from '../Navbar';

const HeaderContainer = tagStyled.div`
  background: linear-gradient(180deg, rgba(0, 2, 120, 0.85) 0%, rgba(3, 10, 149, 0.85) 100%);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    padding: 0px;
  }
`;

const WalletConnectLayout = tagStyled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    gap: 2rem;
    white-space: nowrap;
    @media (max-width: 1199px) {
      display: none;
    }
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* <Logo /> */}
      <Navbar/>
      <WalletConnectLayout>
        <ConnectButton label='Connect' />
      </WalletConnectLayout>
    </HeaderContainer>
  );
};

export default Header;
