"use client";
import Image from "next/image";
import { styled } from "styled-components";

const Loader = styled.div`
  font-size: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loading = () => {
  return (
    <Loader>
      Loading...
      <Image src="/loading.png" alt="Loading" width={400} height={400} />
    </Loader>
  );
};

export default Loading;
