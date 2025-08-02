// Card.js
import React from "react";
import { CardContainer } from "./CardStyles";
import InputItem from "./InputItem";

const Card = ({ title, subtitle, inputs, isActive, onClick }) => {
  return (
    <CardContainer isActive={isActive} onClick={onClick}>
      <h4>{title}</h4>
      <p>{subtitle}</p>
      {inputs.map((input, index) => (
        <InputItem key={index} {...input} />
      ))}
    </CardContainer>
  );
};

export default Card;
