import React, { useCallback } from "react";
import styled from "@emotion/styled";
import InputItem from "../../fields/InputItem/InputItem";

// Styled Components
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

const SubcardContainer = styled.div`
  margin-top: 14px;
  padding-left: 24px;
  border-left: 3px solid rgb(75, 121, 161);
  border-radius: 8px;
  background-color: rgba(75, 121, 161, 0.08);
  padding: 12px 16px;
  min-height: 160px;
  transition: all 0.3s ease;
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

const SubNumberBadge = styled(NumberBadge)`
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 0.8rem;
`;

const SubcardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
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
      if (el) fieldRefs.current[fieldId] = el;
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
    <CardContainer>
      <CardContent isActive={isActive}>
        <CardHeader>
          <NumberBadge>{cardIndex + 1}</NumberBadge>
          <h4>{title}</h4>
        </CardHeader>
        {subtitle && <p>{subtitle}</p>}

        {inputs.map((input, index) => {
          const fieldId = getFieldId(title, "", input.label);
          return (
            <InputItem
              key={index}
              {...input}
              value={formValues[fieldId] || ""}
              error={formErrors[fieldId]}
              onChange={handleChange(fieldId)}
              inputRef={getInputRef(fieldId)}
            />
          );
        })}

        {subcards?.map((subcard, subIndex) => {
          const fieldIdPrefix = `${title}__${subcard.title}`;
          const hasError = errorCardErrorMap?.[cardIndex]?.[subIndex] ?? false;

          const isVisible = visibleSubcards.some(
            (v) => v.card === cardIndex && v.sub === subIndex
          );

          const borderColor = hasError
            ? "#ff4d4f"
            : isVisible
            ? "#3a5c7d"
            : "rgba(75,121,161,0.3)";

          const backgroundColor = isVisible
            ? "rgba(75,121,161,0.15)"
            : "rgba(75,121,161,0.08)";

          return (
            <SubcardContainer
              key={subIndex}
              ref={(el) => {
                if (el) {
                  subcardRefs.current.push({ el, cardIndex, subIndex });
                }
              }}
              style={{
                borderLeft: `3px solid ${borderColor}`,
                backgroundColor,
              }}
            >
              <SubcardHeader>
                <SubNumberBadge>{`${cardIndex + 1}.${
                  subIndex + 1
                }`}</SubNumberBadge>
                <span>{subcard.title}</span>
              </SubcardHeader>

              {subcard.inputs.map((input, inputIndex) => {
                const fieldId = getFieldId(title, subcard.title, input.label);
                return (
                  <InputItem
                    key={inputIndex}
                    {...input}
                    value={formValues[fieldId] || ""}
                    error={formErrors[fieldId]}
                    onChange={handleChange(fieldId)}
                    inputRef={getInputRef(fieldId)}
                  />
                );
              })}
            </SubcardContainer>
          );
        })}
      </CardContent>
    </CardContainer>
  );
};

export default Card;
