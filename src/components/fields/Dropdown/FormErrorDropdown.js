import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { ChevronDown, ChevronUp } from "lucide-react";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  background: white;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#bbb")};
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
    font-weight: ${({ hasError }) => (hasError ? "normal" : "normal")};
    color: ${({ hasError }) => (hasError ? "red" : "#000")};
    font-size: 15px;
  }
`;

const CountBadge = styled.span`
  font-size: 14px;
  color: #4b4b4b;

  &::before {
    content: "(";
    color: #4b4b4b;
  }

  &::after {
    content: ")";
    color: #4b4b4b;
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
  max-height: 250px; /* Approx 5 items × 50px each */
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

const FormErrorDropdown = ({
  FormLabel = "Form Errors",
  options = [],
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const hasErrors = options.length > 0;

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef}>
      <Button onClick={handleToggle} hasError={hasErrors}>
        <span className="label">{FormLabel}</span>
        {hasErrors && (
          <CountBadge>
            <span className="count">{options.length}</span>
          </CountBadge>
        )}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      {open && (
        <DropdownBox>
          {options.length === 0 ? (
            <DropdownItem>No errors</DropdownItem>
          ) : (
            options.map((option, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleOptionClick(option.value)}
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

export default FormErrorDropdown;
