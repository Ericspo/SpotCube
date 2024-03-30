import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import tagStyled from 'styled-components';
import { ReactComponent as Logo } from '../assets/svg/logo.svg';
import { ReactComponent as DownArrow } from '../assets/svg/downarrow.svg'
import { ReactComponent as CloseMenu } from '../assets/svg/CloseMenu.svg'
import mobileLogo from '../assets/image/MobileLogo.png'
import mobileBgImage from '../assets/image/MobileMenuBg.png'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const menus = [
  "SpotCube Network",
  "The Wallet",
  "Our Vision",
  "Our Mission",
  "Contact",
  // "How to buy"
]
const submenus = {
  "SpotCube Network": ["Ecosystem", "Solution Overview", "What deos it mean"]
}
const Links = {
  "SpotCube Network" : "/",
  "The Wallet" : "https://www.spoticcoin.com/wallet",
  "Our Vision" : "https://www.spoticcoin.com/vision",
  "Our Mission" : "https://www.spoticcoin.com/mission",
  "Contact": "https://www.spoticcoin.com/#contact",
  // "How to buy" : "/",
  "Ecosystem" : "https://www.spoticcoin.com/eco-system",
  "Solution Overview" : "https://www.spoticcoin.com/overView",
  "What deos it mean" : "https://www.spoticcoin.com/about-us"
}
// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const WalletConnectLayout = tagStyled.div`
//     display: flex;
//     justify-content: flex-end;
//     padding-right: 20px;
//     gap: 2rem;
// `;

const LangDiv = tagStyled.div`
  font-size: 16px;
  color: white;
  display: flex;
  aligh-items: center;
  gap: 6px;
  @media (max-width: 1200px) {
    display: none;
  }
`

const MobileMenu = tagStyled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-image: url(${mobileBgImage});
  background-size: cover;
  @media (min-width: 1200px) {
    display: none;
  }
`
const WalletConnectLayout = tagStyled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    gap: 2rem;
`;

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showMenu, setShowMenu] = React.useState(false);
  const [curSubMenu, setCurSubMenu] = React.useState("");

  const handleOpenNavMenu = (event) => {
    if(showMenu)
      document.body.style.overflow = 'auto'
    else
      document.body.style.overflow = 'hidden'
    setShowMenu(!showMenu);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuItem = (page) => {
    if (curSubMenu!=page && submenus[page]?.length>0){
      setCurSubMenu(page)
    } else {
      setCurSubMenu("")
    }
  }

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  return (
    <div style={{width: '100%'}}>
      <Container maxWidth="xl" style={{padding: '14px'}}>
        <Toolbar disableGutters sx={{background:'rgba(0,0,0,0)'}}>
          <Box sx={{
              mr: 2,
              display: { xs: 'none', lg: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>          
            <Logo />
          </Box>
          <Box sx={{display: {xs:'flex', lg:'none'}}} >
            <img src={mobileLogo} width={125} alt="123" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {menus.map((page) => (
              <>
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'flex' }}
                endIcon={submenus[page]?.length>0 && <KeyboardArrowDownIcon />}
                onClick={submenus[page]?.length>0 ? handleOpenUserMenu: ()=>{window.location.href=Links[page]}}
              >
               {page}
              </Button>
              {submenus[page] && 
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  // onClose={handleCloseUserMenu}
                >
                  {submenus[page]?.map((submenu) => (
                    <MenuItem key={submenu} onClick={()=>{window.location.href=Links[submenu]}}>
                      <Typography textAlign="center">{submenu}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              }
            </>
            ))}
          </Box>
          <LangDiv>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1M12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1M12 23C15 23 16 18 16 12C16 6 15 1 12 1M12 23C9 23 8 18 8 12C8 6 9 1 12 1M2 16H22M2 8H22" stroke="#F8F8F8" stroke-width="2"/>
            </svg>
            <span>EN</span>
          </LangDiv>
        
          <Box sx={{marginLeft:'auto',display: {xs:'flex', lg:'none'}}} >
            {!showMenu ?
              <>
                  {/* <IconButton
                    size="large"
                    color="inherit"
                  >
                    <div style={{width: '26px', height:'26px', backgroundColor: '#647ED0', borderRadius: '100%', display: 'grid', placeContent:'center'}}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1418_2316)">
                        <path d="M12.25 9.57833V11.641C12.2501 11.7887 12.1941 11.9309 12.0934 12.0389C11.9927 12.147 11.8548 12.2128 11.7075 12.2232C11.4526 12.2407 11.2443 12.25 11.0833 12.25C5.92842 12.25 1.75 8.07158 1.75 2.91667C1.75 2.75567 1.75875 2.54742 1.77683 2.2925C1.78717 2.14518 1.85301 2.00726 1.96105 1.90657C2.0691 1.80589 2.21131 1.74993 2.359 1.75H4.42167C4.49402 1.74993 4.56382 1.77675 4.61751 1.82526C4.67119 1.87377 4.70493 1.94051 4.71217 2.0125C4.72558 2.14667 4.73783 2.25342 4.7495 2.3345C4.86543 3.14354 5.103 3.9304 5.45417 4.66842C5.50958 4.78508 5.47342 4.9245 5.36842 4.99917L4.10958 5.89867C4.87926 7.6921 6.30849 9.12132 8.10192 9.891L9.00025 8.6345C9.03697 8.58317 9.09054 8.54635 9.15162 8.53046C9.21271 8.51458 9.27743 8.52064 9.3345 8.54758C10.0724 8.89809 10.8591 9.13507 11.6678 9.2505C11.7489 9.26217 11.8557 9.275 11.9887 9.28783C12.0606 9.2952 12.1271 9.329 12.1755 9.38267C12.2239 9.43634 12.2507 9.50607 12.2506 9.57833H12.25Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1418_2316">
                        <rect width="14" height="14" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </IconButton> */}
                  <WalletConnectLayout>
                    <ConnectButton label='Connect' />
                  </WalletConnectLayout>
                  <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.45833 12.0835H25.375" stroke="white" stroke-width="2.41667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.625 7.25H25.375" stroke="white" stroke-width="2.41667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.625 16.9165H25.375" stroke="white" stroke-width="2.41667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.45833 21.75H25.375" stroke="white" stroke-width="2.41667" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </IconButton>
              </> 
              : 
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <CloseMenu/>
              </IconButton>
            }
          </Box>
        </Toolbar>
      </Container>
      {showMenu && (
        <MobileMenu>
          <ul style={{ listStyle: 'none', marginTop: '34px'}}>
            {menus.map(page => {
              return (
                <li key={page} style={{ color: 'white', fontSize: '18px', marginBottom: '47px', cursor: 'pointer', hover: { opacity: '0.5'} }}>
                  <div>
                    {submenus[page]?.length > 0 ?
                     <MenuItem onClick={()=>handleMenuItem(page)}>{page}<DownArrow style={{marginLeft: '5px'}} /></MenuItem>
                      :
                      <a style={{ color: 'white', fontSize: '18px', marginBottom: '47px', cursor: 'pointer', textDecoration:'none', hover: { opacity: '0.5'} }} href={Links[page]}><MenuItem onClick={()=>handleMenuItem(page)}>{page}</MenuItem></a>
                    }
                    {/* <MenuItem onClick={()=>handleMenuItem(page)}>{page} {submenus[page]?.length > 0 && <DownArrow style={{marginLeft: '5px'}} />}</MenuItem> */}
                    {page==curSubMenu && submenus[page]?.map((submenu, index) => (
                      <MenuItem key={index} onClick={handleMenuItem}>
                        <a style={{ color: 'white', fontSize: '18px', cursor: 'pointer', textDecoration:'none', hover: { opacity: '0.5'} }} href={Links[submenu]}>
                          <Typography pl="10px" fontSize='15px'>{submenu}</Typography>
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </MobileMenu>
      )}

    </div>
  );
}
export default Navbar;
