export const generateErrorMapFromErrors = (cards, formErrors, getFieldId) => {
  const errorMap = {};

  cards.forEach((card, cardIndex) => {
    const cardInputIds = (card.inputs || []).map((input) =>
      getFieldId(card.title, "", input.label)
    );

    const hasCardLevelError = cardInputIds.some(
      (fieldId) => !!formErrors[fieldId]
    );

    const subcardErrors = (card.subcards || []).reduce((acc, sub, subIndex) => {
      const subInputIds = (sub.inputs || []).map((input) =>
        getFieldId(card.title, sub.title, input.label)
      );

      const hasSubError = subInputIds.some((fieldId) => !!formErrors[fieldId]);

      if (hasSubError) acc.push(subIndex);
      return acc;
    }, []);

    if (hasCardLevelError || subcardErrors.length > 0) {
      errorMap[cardIndex] = {
        // ✅ highlight parent if any subcard has an error
        hasError: hasCardLevelError || subcardErrors.length > 0,
        subcardIndices: subcardErrors,
      };
    }
  });

  return errorMap;
};
