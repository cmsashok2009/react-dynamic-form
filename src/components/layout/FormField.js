// FormField.js
import React from 'react';
import PropTypes from 'prop-types';
import GenericInput from '../components/GenericInput';
import TextareaInput from './TextareaInput';
import SelectInput from './SelectInput';
import CheckboxInput from './CheckboxInput';
import RadioInput from './RadioInput';
import FileInput from './FileInput';
import RangeInput from './RangeInput';
import DateInput from './DateInput';
import TimeInput from './TimeInput';

const FormField = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'textarea':
      return <TextareaInput label={field.label} value={value} onChange={onChange} />;
    case 'select':
      return (
        <SelectInput
          label={field.label}
          value={value}
          options={field.options}
          onChange={onChange}
        />
      );
    case 'radio':
      return (
        <RadioInput
          label={field.label}
          options={field.options}
          selectedValue={value}
          onChange={onChange}
        />
      );
    case 'checkbox':
      return <CheckboxInput label={field.label} checked={value} onChange={onChange} />;
    case 'file':
      return <FileInput label={field.label} onChange={onChange} />;
    case 'range':
      return (
        <RangeInput
          label={field.label}
          value={value}
          onChange={onChange}
          min={field.min}
          max={field.max}
        />
      );
    case 'date':
      return <DateInput label={field.label} value={value} onChange={onChange} />;
    case 'time':
      return <TimeInput label={field.label} value={value} onChange={onChange} />;
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return (
        <GenericInput
          label={field.label}
          type={field.type}
          value={value}
          onChange={onChange}
          required={field.required}
        />
      );
    default:
      return null;
  }
};

FormField.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
    min: PropTypes.number,
    max: PropTypes.number,
    required: PropTypes.bool,
  }).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default FormField;
