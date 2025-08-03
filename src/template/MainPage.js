import React, { useRef, useState } from "react";
import Header from "../components/layout/Header";
import ActionItems from "../components/fields/ActionItems/ActionItems";
import MainContentLayout from "../components/layout/MainContentLayout";
import { cards } from "../mock/mockData";
import { generateActionBarOptions } from "./MainPage.helper";
import { ScrollProvider } from "../context/ScrollContext";

const MainPage = () => {
  const fieldRefs = useRef({});
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const getFieldId = (cardTitle, subCardTitle, label) =>
    `${cardTitle}-${subCardTitle || ""}-${label}`
      .replace(/\s+/g, "-")
      .toLowerCase();

  const validateFields = () => {
    const errors = {};
    cards.forEach((card) => {
      const { title: cardTitle, inputs = [], subcards = [] } = card;

      inputs.forEach((input) => {
        const fieldId = getFieldId(cardTitle, "", input.label);
        const value = formValues[fieldId] || "";

        if (input.required && !value.trim()) {
          errors[fieldId] = `${input.label} is required`;
        } else if (
          input.validation?.regex &&
          !new RegExp(input.validation.regex).test(value)
        ) {
          errors[fieldId] =
            input.validation.message || `${input.label} is invalid`;
        }
      });

      subcards.forEach((sub) => {
        const { title: subCardTitle, inputs: subInputs = [] } = sub;
        subInputs.forEach((input) => {
          const fieldId = getFieldId(cardTitle, subCardTitle, input.label);
          const value = formValues[fieldId] || "";

          if (input.required && !value.trim()) {
            errors[fieldId] = `${input.label} is required`;
          } else if (
            input.validation?.regex &&
            !new RegExp(input.validation.regex).test(value)
          ) {
            errors[fieldId] =
              input.validation.message || `${input.label} is invalid`;
          }
        });
      });
    });

    setFormErrors(errors);
    return errors;
  };

  const onSubmitBtnClick = () => {
    const errors = validateFields();
    if (Object.keys(errors).length === 0) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const onFormErrorClick = (fieldId) => {
    requestAnimationFrame(() => {
      const el = fieldRefs.current[fieldId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus({ preventScroll: true });
      }
    });
  };

  const formErrorOptions = Object.entries(formErrors).map(
    ([fieldId, error]) => ({
      label: error,
      value: fieldId,
    })
  );

  const actions = generateActionBarOptions(
    onSubmitBtnClick,
    onFormErrorClick,
    formErrorOptions
  );
  const handleInputChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));

    // Clear error when user types
    if (formErrors[fieldId]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  return (
    <ScrollProvider>
      <Header title="Modern UI Playground" />
      <ActionItems actions={actions} />
      <MainContentLayout
        cards={cards}
        fieldRefs={fieldRefs}
        getFieldId={getFieldId}
        formValues={formValues}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
      />
    </ScrollProvider>
  );
};

export default MainPage;
