import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 250px;
  margin: 16px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const Card = ({ title, description,children }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {children}
    </CardContainer>
  );
};

export default Card;
