import React, { useState } from "react";
import styled from "styled-components";

export const Input = ({
  label = "business description",
  onChange = () => {},
  value = "",
}) => {
  return (
    <Cont>
      <Label>{label}</Label>
      <InputUI value={value} onChange={onChange} />
    </Cont>
  );
};

const Cont = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`;

const Label = styled.div`
  margin: 0 20px 0 0;
`;

const InputUI = styled.input`
  margin: 0 20px 0 0;
`;
