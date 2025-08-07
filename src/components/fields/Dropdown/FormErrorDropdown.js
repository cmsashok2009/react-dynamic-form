import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  background: white;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#bbb')};
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  width: 170px;
  justify-content: space-between;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  span.label {
    font-weight: normal;
    color: ${({ hasError }) => (hasError ? 'red' : '#000')};
    font-size: 15px;
  }
`;

const CountBadge = styled.span`
  font-size: 14px;
  color: #4b4b4b;

  &::before {
    content: '(';
  }

  &::after {
    content: ')';
  }

  span.count {
    color: red;
  }
`;

const DropdownBox = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 170px;
  background: white;
  border: 1px solid #aaa;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  z-index: 999;
  max-height: 250px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  color: red;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #efefef;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const FormErrorDropdown = ({ FormLabel = 'Form Errors', options = [], onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasErrors = options.length > 0;
  const dropdownId = 'form-error-dropdown-box';

  const handleToggle = () => setOpen((prev) => !prev);

  const handleOptionClick = (value) => {
    onChange?.(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef}>
      <Button
        hasError={hasErrors}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={dropdownId}
        aria-label={`${FormLabel} dropdown`}
        data-testid="form-error-dropdown-button"
      >
        <span className="label">{FormLabel}</span>
        {hasErrors && (
          <CountBadge>
            <span className="count">{options.length}</span>
          </CountBadge>
        )}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      {open && (
        <DropdownBox id={dropdownId} role="listbox" data-testid="form-error-dropdown-box">
          {options.length === 0 ? (
            <DropdownItem role="option" aria-disabled="true">
              No errors
            </DropdownItem>
          ) : (
            options.map((option, index) => (
              <DropdownItem
                key={index}
                role="option"
                onClick={() => handleOptionClick(option.value)}
                data-testid={`form-error-option-${index}`}
              >
                {option.label}
              </DropdownItem>
            ))
          )}
        </DropdownBox>
      )}
    </Wrapper>
  );
};

FormErrorDropdown.propTypes = {
  FormLabel: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ),
  onChange: PropTypes.func,
};

FormErrorDropdown.defaultProps = {
  FormLabel: 'Form Errors',
  options: [],
  onChange: undefined,
};

export default FormErrorDropdown;
