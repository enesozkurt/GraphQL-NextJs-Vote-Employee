"use client"
import { VoteEmployee } from "@/lib/features/employeeSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";

import { styled } from "styled-components";

const EmployeeCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  align-items: center;
`;

const EmployeePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmployeeInfo = styled.div`
  flex: 1;
`;

const Button = styled.button`
display: inline-block;
padding: 10px 20px;
font-size: 16px;
color: #fff;
background-color: #2dc44d;
border: none;
border-radius: 5px;
text-align: center;
text-decoration: none;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
transition: box-shadow 0.3s;
cursor: pointer;
`;

const StyledLink = styled.div`
  font-size: 12px;
  color: #2dc44d;
  font-weight: bold;
`;

const VoteRating = styled.span`
display: inline-block;
color: #cc9f16;
`;

const Card = ({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <EmployeeCard>
      <EmployeePicture>
        <Image
          src="/next.svg"
          alt="Çalışan Profil Foto"
          width={50}
          height={50}
        />
      </EmployeePicture>
      <EmployeeInfo>
        <div>{item.name} <VoteRating> * {item.vote} </VoteRating></div>
        <div>{item.role}</div>
        <StyledLink>
          <Link href={`/${item.id}`}>View Employee Detail</Link>
        </StyledLink>
      </EmployeeInfo>
      <Button type="button" onClick={() => dispatch(VoteEmployee(item.id))}>Vote</Button>
    </EmployeeCard>
  );
};

export default Card;
