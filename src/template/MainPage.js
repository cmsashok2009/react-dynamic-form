import React, { useRef, useState, useCallback, useMemo } from "react";
import Header from "../components/layout/Header";
import ActionItems from "../components/fields/ActionItems/ActionItems";
import MainContentLayout from "../components/layout/MainContentLayout";
import { cards } from "../mock/mockData";
import { generateActionBarOptions } from "./MainPage.helper";
import { ScrollProvider } from "../context/ScrollContext";
import {
  getFieldId,
  validateFields,
  mapFormErrorsToOptions,
} from "../utils/formUtils";

const MainPage = () => {
  const fieldRefs = useRef({});
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const onSubmitBtnClick = useCallback(() => {
    const errors = validateFields(cards, formValues, getFieldId);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  }, [formValues]);

  const onFormErrorClick = useCallback((fieldId) => {
    requestAnimationFrame(() => {
      const el = fieldRefs.current[fieldId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus({ preventScroll: true });
      }
    });
  }, []);

  const actions = useMemo(
    () =>
      generateActionBarOptions(
        onSubmitBtnClick,
        onFormErrorClick,
        mapFormErrorsToOptions(formErrors)
      ),
    [onSubmitBtnClick, onFormErrorClick, formErrors]
  );

  const handleInputChange = useCallback(
    (fieldId, value) => {
      setFormValues((prev) => ({ ...prev, [fieldId]: value }));

      if (formErrors[fieldId]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
    },
    [formErrors]
  );

  return (
    <ScrollProvider>
      <Header title="Modern UI Playground version 2.0" />
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
