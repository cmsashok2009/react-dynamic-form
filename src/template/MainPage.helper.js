export const generateActionBarOptions = (
  onSubmitBtnClick,
  onFormErrorClick,
  formErrorOptions
) => [
  {
    type: "button",
    align: "right",
    id: "submit",
    label: "Submit",
    onChange: onSubmitBtnClick,
  },
  {
    type: "formErrorDropdown",
    align: "left",
    id: "formError",
    label: `Form Errors (${formErrorOptions.length})`,
    onChange: (id) => onFormErrorClick(id),
    options: formErrorOptions,
  },
];
