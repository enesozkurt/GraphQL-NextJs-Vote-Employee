"use client";
import { useEffect } from "react";
import { GetEmployee } from "@/lib/features/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Loading from "../loading";
import { styled } from "styled-components";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const EmployeePicture = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoSection = styled.div`
  width: 100%;
  padding: 10px;
`;

const Section = styled.div`
  border-bottom: 1px solid #dedede;
  height: 50px;
  margin: 10px;
  padding: 10px;
  display: flex;
`;

const Label = styled.div`
  font-size: 24px; 
  margin-right: 10px;
`;

const Text = styled.div`
font-size: 28px;
`;

const Name = styled.div`
font-size: 32px;
color: #2dc44d;;
margin: 15px;
`;

const EmployeeDetail = ({ params }) => {
  const { status, error, data } = useAppSelector(
    (state) => state.employee.employeeDetail
  );
  const dispatch = useAppDispatch();

  const { slug } = params;

  useEffect(() => {
    dispatch(GetEmployee(slug));
  }, []);

  if (status === "loading") return <Loading />;
  return (
    <Container>
      <EmployeePicture>
        <Image
          src="/next.svg"
          alt="Çalışan Profil Foto"
          width={100}
          height={100}
        />
      </EmployeePicture>
      <InfoSection>
        <Name>{data.name}</Name>
        {Object.keys(data).map((key) => {
          if (key === "__typename" || key === 'id') {
            return null;
          }
          return (
            <Section key={key}>
              <Label>{key}:</Label>
              <Text>{data[key]}</Text>
            </Section>
          );
        })}
      </InfoSection>
    </Container>
  );
};

export default EmployeeDetail;
