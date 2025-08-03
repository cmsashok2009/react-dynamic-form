import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import InputItem from "../../fields/InputItem/InputItem";
import SubcardSection from "../SubcardSection/SubcardSection";

const CardContainer = styled.div`
  background-color: #ffffff;
  padding: 24px;
  margin: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

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

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const NumberBadge = styled.span`
  display: inline-block;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #4b79a1;
  color: #fff;
  border-radius: 50%;
  font-weight: 600;
  margin-right: 10px;
`;

const Card = ({
  title,
  subtitle,
  inputs,
  subcards,
  isActive,
  visibleSubcards,
  errorCardErrorMap,
  cardIndex,
  subcardRefs,
  fieldRefs,
  getFieldId,
  formValues,
  formErrors,
  handleInputChange,
}) => {
  const getInputRef = useCallback(
    (fieldId) => (el) => {
      if (el) {
        fieldRefs.current[fieldId] = el;
      }
    },
    [fieldRefs]
  );

  const handleChange = useCallback(
    (fieldId) => (e) => {
      handleInputChange(fieldId, e.target.value);
    },
    [handleInputChange]
  );

  return (
    <CardContainer
      role="region"
      aria-label={`Card: ${title}`}
      data-testid={`card-container-${cardIndex}`}
    >
      <CardContent
        isActive={isActive}
        data-testid={`card-content-${cardIndex}`}
      >
        <CardHeader>
          <NumberBadge>{cardIndex + 1}</NumberBadge>
          <h4 data-testid={`card-title-${cardIndex}`}>{title}</h4>
        </CardHeader>
        {subtitle && (
          <p data-testid={`card-subtitle-${cardIndex}`}>{subtitle}</p>
        )}

        {inputs.map((input, index) => {
          const fieldId = getFieldId(cardIndex, undefined, input.label);
          return (
            <InputItem
              key={index}
              {...input}
              value={formValues[fieldId] || ""}
              error={formErrors[fieldId]}
              onChange={handleChange(fieldId)}
              inputRef={getInputRef(fieldId)}
              data-testid={`input-${fieldId}`}
            />
          );
        })}

        {subcards?.length > 0 && (
          <SubcardSection
            subcards={subcards}
            cardIndex={cardIndex}
            visibleSubcards={visibleSubcards}
            errorCardErrorMap={errorCardErrorMap}
            getFieldId={getFieldId}
            formValues={formValues}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            fieldRefs={fieldRefs}
            subcardRefs={subcardRefs}
          />
        )}
      </CardContent>
    </CardContainer>
  );
};

Card.propTypes = {
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
  ).isRequired,
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
  isActive: PropTypes.bool,
  visibleSubcards: PropTypes.arrayOf(PropTypes.number),
  errorCardErrorMap: PropTypes.object,
  cardIndex: PropTypes.number.isRequired,
  subcardRefs: PropTypes.object.isRequired,
  fieldRefs: PropTypes.object.isRequired,
  getFieldId: PropTypes.func.isRequired,
  formValues: PropTypes.objectOf(PropTypes.any).isRequired,
  formErrors: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Card;
