export const sanitize = (value) =>
  (value ?? "").toString().trim().replace(/\s+/g, "-").toLowerCase();

export const getFieldId = (cardIndex, subcardIndex, fieldId) => {
  const safeFieldId = sanitize(fieldId);

  if (subcardIndex !== null && subcardIndex !== undefined) {
    return `card-${cardIndex}-sub-${subcardIndex}-${safeFieldId}`;
  }

  return `card-${cardIndex}-${safeFieldId}`;
};
export const validateFields = (cards, formValues, getFieldId) => {
  const errors = {};

  cards.forEach((card, cardIndex) => {
    const { inputs = [], subcards = [] } = card;

    // Top-level card fields
    inputs.forEach((input) => {
      const fieldId = getFieldId(cardIndex, null, input.label);
      const value = (formValues[fieldId] || "").trim();

      if (input.required && !value) {
        errors[fieldId] = `${input.label} is required`;
      } else if (
        value && // ✅ validate only if user has entered something
        input.validation?.pattern &&
        !new RegExp(input.validation.pattern).test(value)
      ) {
        errors[fieldId] =
          input.validation.message || `${input.label} is invalid`;
      }
    });

    // Subcard fields
    subcards.forEach((sub, subcardIndex) => {
      const { inputs: subInputs = [] } = sub;
      subInputs.forEach((input) => {
        const fieldId = getFieldId(cardIndex, subcardIndex, input.label);
        const value = (formValues[fieldId] || "").trim();

        if (input.required && !value) {
          errors[fieldId] = `${input.label} is required`;
        } else if (
          value && // ✅ validate only if user has entered something
          input.validation?.pattern &&
          !new RegExp(input.validation.pattern).test(value)
        ) {
          errors[fieldId] =
            input.validation.message || `${input.label} is invalid`;
        }
      });
    });
  });

  return errors;
};

export const mapFormErrorsToOptions = (formErrors) =>
  Object.entries(formErrors).map(([fieldId, error]) => ({
    label: error,
    value: fieldId,
  }));
