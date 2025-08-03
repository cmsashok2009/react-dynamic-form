import React from "react";
import PropTypes from "prop-types";
import { Container, CardWrapper } from "./ContentAreaStyles";
import Card from "./Card/Card";

const ContentArea = ({
  cards,
  activeCardIndex,
  visibleSubcards,
  cardRefs,
  subcardRefs,
  fieldRefs,
  getFieldId,
  formValues,
  formErrors,
  handleInputChange,
  errorCardErrorMap,
}) => {
  return (
    <Container>
      {cards.map((card, index) => (
        <CardWrapper
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          data-index={index}
        >
          <Card
            title={card.title}
            subtitle={card.subtitle}
            inputs={card.inputs}
            subcards={card.subcards}
            isActive={activeCardIndex === index}
            visibleSubcards={visibleSubcards}
            cardIndex={index}
            subcardRefs={subcardRefs}
            fieldRefs={fieldRefs}
            getFieldId={getFieldId}
            formValues={formValues}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            errorCardErrorMap={errorCardErrorMap}
          />
        </CardWrapper>
      ))}
    </Container>
  );
};

ContentArea.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      inputs: PropTypes.array,
      subcards: PropTypes.array,
      cardNumber: PropTypes.number,
    })
  ).isRequired,
  activeCardIndex: PropTypes.number.isRequired,
  visibleSubcards: PropTypes.arrayOf(
    PropTypes.shape({
      card: PropTypes.number.isRequired,
      sub: PropTypes.number.isRequired,
    })
  ).isRequired,
  cardRefs: PropTypes.shape({ current: PropTypes.array }).isRequired,
  subcardRefs: PropTypes.shape({ current: PropTypes.array }).isRequired,
  fieldRefs: PropTypes.shape({ current: PropTypes.object }).isRequired,
  getFieldId: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errorCardErrorMap: PropTypes.object.isRequired,
};

export default ContentArea;
