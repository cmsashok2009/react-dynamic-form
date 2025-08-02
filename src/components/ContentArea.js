import React from "react";
import { Container, CardWrapper } from "./ContentAreaStyles";
import Card from "./Card";

const ContentArea = ({ cards, activeCard, onCardClick, titleRefs }) => {
  return (
    <Container>
      {cards.map((card, index) => (
        <CardWrapper
          key={index}
          ref={(el) => (titleRefs.current[index] = el)}
          data-index={index} // <-- Add this here
        >
          <Card
            title={card.title}
            subtitle={card.subtitle}
            inputs={card.inputs}
            isActive={activeCard === index}
            subcards={card.subcards} // Pass subcards to the Card component
          />
        </CardWrapper>
      ))}
    </Container>
  );
};

export default ContentArea;
