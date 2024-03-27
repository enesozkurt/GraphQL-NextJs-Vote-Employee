"use client";
import { useEffect, useState } from "react";

import { GetEmployees } from "@/lib/features/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Card from "@/components/card/Card";
import Image from "next/image";
import { styled } from "styled-components";
import Loading from "./loading";

const HomeSection = styled.div`
  display: flex;
  gap: 100px;
`;

const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  color: #bf4f74;
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 500px;
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export default function Home() {
  const { status, data, error } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    dispatch(GetEmployees());
  }, []);

  useEffect(() => {
    const sortedEmployees = [...data].sort((a, b) => a.vote - b.vote);
    setSortedData(sortedEmployees);
  }, [data]);

  return (
    <>
      <HomeSection>
        <TextSection>
          <Title>Frontend Developer Case Study</Title>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </TextSection>
        <ImageSection>
          <Image src="/Hero.png" alt="Hero image" fill />
        </ImageSection>
      </HomeSection>
      {status === "loading" && <Loading />}
      {status === "done" && (
        <>
          <h4>You can vote for the Employee of the Month.</h4>
          <CardSection>
            {sortedData.map((item, key) => (
              <Card key={key} item={item} />
            ))}
          </CardSection>
        </>
      )}
    </>
  );
}
