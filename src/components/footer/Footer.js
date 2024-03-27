"use client";

import { styled } from "styled-components";

const StyledFooter = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-weight: bold;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Logo>Logo</Logo>
      <div>Enes Özkurt. All rights reserved.</div>
    </StyledFooter>
  );
};

export default Footer;
