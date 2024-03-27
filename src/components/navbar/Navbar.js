"use client";
import Link from "next/link";
import { styled } from "styled-components";
import Links from "./links/Links";

const Container = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const Navbar = () => {
  return (
    <Container>
      <Link href="/">
        <Logo>Logo</Logo>
      </Link>
      <div>
        <Links />
      </div>
    </Container>
  );
};

export default Navbar;
