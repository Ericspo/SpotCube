import * as React from 'react';
import tagStyled from 'styled-components';

const MainLayout = ({ children }) => {
  return <MainLayoutContainer>{children}</MainLayoutContainer>;
};

export default MainLayout;

const MainLayoutContainer = tagStyled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
`;
