export const generateErrorMapFromErrors = (cards, formErrors, getFieldId) => {
  const errorMap = {};

  cards.forEach((card, cardIndex) => {
    const cardInputIds = (card.inputs || []).map(
      (input) => getFieldId(cardIndex, null, input.label) // ✅ null for subcard
    );

    const hasCardLevelError = cardInputIds.some(
      (fieldId) => !!formErrors[fieldId]
    );

    const subcardErrors = (card.subcards || []).reduce((acc, sub, subIndex) => {
      const subInputIds = (sub.inputs || []).map(
        (input) => getFieldId(cardIndex, subIndex, input.label) // ✅ subIndex instead of sub.title
      );

      const hasSubError = subInputIds.some((fieldId) => !!formErrors[fieldId]);

      if (hasSubError) acc.push(subIndex);
      return acc;
    }, []);

    if (hasCardLevelError || subcardErrors.length > 0) {
      errorMap[cardIndex] = {
        hasError: true,
        subcardIndices: subcardErrors,
      };
    }
  });

  return errorMap;
};
