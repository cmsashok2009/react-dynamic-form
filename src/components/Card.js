import React from "react";
import InputItem from "./InputItem";
import styled from "@emotion/styled";

// Outer container — acts as the "white surface"
export const CardContainer = styled.div`
  background-color: #ffffff;
  padding: 24px;
  margin: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border-radius: 0; /* Flat rectangle (no outer rounding) */
`;

// Inner content — bordered and rounded box
const CardContent = styled.div`
  border: 1.5px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  ${({ isActive }) =>
    isActive &&
    `
    border-color: #999;
    box-shadow: 0 6px 12px rgba(153, 153, 153, 0.1);
  `}
`;

// Subcard block
const SubcardContainer = styled.div`
  margin-top: 14px;
  padding-left: 24px;
  border-left: 3px solid rgb(75, 121, 161); /* Match button theme */
  border-radius: 8px;
  background-color: rgba(75, 121, 161, 0.08); /* Thematic soft tint */
  padding: 12px 16px;
`;

const Card = ({ title, subtitle, inputs, subcards, isActive, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <CardContent isActive={isActive}>
        <h4 style={{ marginBottom: 6 }}>{title}</h4>
        <p style={{ marginTop: 0, color: "#555", fontSize: "0.9rem" }}>
          {subtitle}
        </p>

        {inputs.map((input, index) => (
          <InputItem key={index} {...input} />
        ))}

        {subcards &&
          subcards.length > 0 &&
          subcards.map((subcard, subIndex) => (
            <SubcardContainer key={subIndex}>
              <h5 style={{ marginTop: 0, marginBottom: 8 }}>{subcard.title}</h5>
              {subcard.inputs.map((input, inputIndex) => (
                <InputItem key={inputIndex} {...input} />
              ))}
            </SubcardContainer>
          ))}
      </CardContent>
    </CardContainer>
  );
};

export default Card;
