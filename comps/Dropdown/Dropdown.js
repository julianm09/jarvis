import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownUI className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
        <span className="arrow-icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <MenuUI className="dropdown-menu">
          {options.map((option) => (
            <ItemUI
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </ItemUI>
          ))}
        </MenuUI>
      )}
    </DropdownUI>
  );
};

export default Dropdown;

const MenuUI = styled.div`
  position: absolute;
  top: -160px;
  color: black;
  cursor: pointer;
`;

const ItemUI = styled.div`
    padding: 10px;
  &:hover {
    background: black;
    color: white;
  }
`;

const DropdownUI = styled.div`
  cursor: pointer;
`;
