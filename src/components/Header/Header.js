import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';

const Header = () => {
  // Our site features two visual headers, but they should be
  // grouped semantically as a single header.
  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <Side>
          <Logo />
        </Side>
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Side />
      </MainHeader>
    </header>
  );
};


/* 
  Note the use of align-items: baseline; to align the logo with the navigation.
  Also, to *optically vertical-align* the content, we a bit of extra top padding
*/  
const MainHeader = styled.div`
  padding: 0 32px;
  border-bottom: 1px solid ${COLORS.gray[300]};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;

  padding: 24px 32px;
  padding-top: 26px;

  .${Logo} {
    margin-right: auto;
  }
`;

/* 
  This <Side> element indirectly centers the Nav.
  It evenly takes up the extra space on each side of the Nav.
*/
const Side = styled.div`
  flex: 1;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 48px;

  margin: 0 48px;
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

export default Header;
