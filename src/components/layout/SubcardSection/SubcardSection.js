import React, { useCallback } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import InputItem from "../../fields/InputItem/InputItem";

// Styled Components
const SubcardContainer = styled.div`
  margin-top: 14px;
  padding-left: 24px;
  border-left: 3px solid #4b79a1;
  border-radius: 8px;
  background-color: #4b79a114; // rgba(75, 121, 161, 0.08)
  padding: 12px 16px;
  min-height: 160px;
  transition: all 0.3s ease;
`;

const SubcardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const SubNumberBadge = styled.span`
  display: inline-block;
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: #4b79a1;
  color: #fff;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.8rem;
  margin-right: 10px;
`;

const SubcardSection = ({
  subcards,
  cardIndex,
  visibleSubcards,
  errorCardErrorMap,
  getFieldId,
  formValues,
  formErrors,
  handleInputChange,
  fieldRefs,
  subcardRefs,
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

  const isVisible = useCallback(
    (subIndex) =>
      visibleSubcards.some((v) => v.card === cardIndex && v.sub === subIndex),
    [visibleSubcards, cardIndex]
  );

  const getBorderAndBackground = (hasError, visible) => ({
    borderLeft: `3px solid ${
      hasError ? "#ff4d4f" : visible ? "#3a5c7d" : "#4B79A14D"
    }`,
    backgroundColor: visible ? "#4B79A126" : "#4B79A114",
  });

  return subcards.map((subcard, subIndex) => {
    const fieldPrefix = `${cardIndex + 1}.${subIndex + 1}`;
    const visible = isVisible(subIndex);
    const hasError = errorCardErrorMap?.[cardIndex]?.[subIndex] ?? false;

    const styles = getBorderAndBackground(hasError, visible);

    return (
      <SubcardContainer
        key={subIndex}
        ref={(el) => {
          if (el) {
            subcardRefs.current.push({ el, cardIndex, subIndex });
          }
        }}
        style={styles}
        role="region"
        aria-label={`Subcard ${fieldPrefix}: ${subcard.title}`}
        data-testid={`subcard-${cardIndex}-${subIndex}`}
      >
        <SubcardHeader>
          <SubNumberBadge>{fieldPrefix}</SubNumberBadge>
          <span>{subcard.title}</span>
        </SubcardHeader>

        {subcard.inputs.map((input, inputIndex) => {
          const fieldId = getFieldId(cardIndex, subIndex, input.label.trim());
          return (
            <InputItem
              key={inputIndex}
              {...input}
              value={formValues[fieldId] || ""}
              error={formErrors[fieldId]}
              onChange={handleChange(fieldId)}
              inputRef={getInputRef(fieldId)}
              data-testid={`subcard-input-${fieldId}`}
              aria-labelledby={`subcard-${cardIndex}-${subIndex}-label`}
            />
          );
        })}
      </SubcardContainer>
    );
  });
};

SubcardSection.propTypes = {
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
  ).isRequired,
  cardIndex: PropTypes.number.isRequired,
  visibleSubcards: PropTypes.arrayOf(
    PropTypes.shape({
      card: PropTypes.number,
      sub: PropTypes.number,
    })
  ).isRequired,
  errorCardErrorMap: PropTypes.object,
  getFieldId: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  fieldRefs: PropTypes.object.isRequired,
  subcardRefs: PropTypes.object.isRequired,
};

export default SubcardSection;
