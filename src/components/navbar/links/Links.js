import Link from "next/link";
import { styled } from "styled-components";

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const links = [
  {
    title: "Home",
    path: "/",
  }
  // Linkler çoğaltılabilir.
];

const Links = () => {
  return (
    <StyledLinks>
      {links.map((link) => (
        <Link href={link.path} key={link.title}>
          {link.title}
        </Link>
      ))}
    </StyledLinks>
  );
};

export default Links;
