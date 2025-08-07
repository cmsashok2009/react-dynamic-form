export const validate = (value, rules) => {
  if (rules.required && !value) return 'This field is required.';
  if (rules.minLength && value.length < rules.minLength)
    return `Minimum length is ${rules.minLength}.`;
  // Add more validation rules as needed
  return null; // No error
};
