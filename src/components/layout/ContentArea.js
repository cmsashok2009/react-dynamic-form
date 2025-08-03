import React, { useCallback } from "react";
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
  const setCardRef = useCallback(
    (index) => (el) => {
      if (el) cardRefs.current[index] = el;
    },
    [cardRefs]
  );

  return (
    <Container>
      {cards.map((card, index) => (
        <CardWrapper
          key={card.id || index}
          ref={setCardRef(index)}
          data-index={index}
          role="region"
          aria-label={`Card: ${card.title}`}
          data-testid={`card-wrapper-${index}`}
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          required: PropTypes.bool,
          validation: PropTypes.shape({
            pattern: PropTypes.string,
            message: PropTypes.string,
          }),
        })
      ),
      subcards: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          inputs: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              required: PropTypes.bool,
              validation: PropTypes.shape({
                pattern: PropTypes.string,
                message: PropTypes.string,
              }),
            })
          ),
        })
      ),
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

  cardRefs: PropTypes.shape({
    current: PropTypes.arrayOf(PropTypes.instanceOf(HTMLElement)),
  }).isRequired,

  subcardRefs: PropTypes.shape({
    current: PropTypes.arrayOf(
      PropTypes.shape({
        cardIndex: PropTypes.number.isRequired,
        subIndex: PropTypes.number.isRequired,
        el: PropTypes.instanceOf(HTMLElement),
      })
    ),
  }).isRequired,

  fieldRefs: PropTypes.shape({
    current: PropTypes.objectOf(PropTypes.instanceOf(HTMLElement)),
  }).isRequired,

  getFieldId: PropTypes.func.isRequired,

  formValues: PropTypes.objectOf(PropTypes.any).isRequired,

  formErrors: PropTypes.objectOf(PropTypes.any).isRequired,

  handleInputChange: PropTypes.func.isRequired,

  errorCardErrorMap: PropTypes.objectOf(
    PropTypes.shape({
      hasError: PropTypes.bool.isRequired,
      subcardIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default ContentArea;
