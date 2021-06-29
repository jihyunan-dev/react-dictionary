import React, { forwardRef } from "react";
import styled from "styled-components";

const CustomInput = forwardRef((props, ref) => {
  const { title, idText } = props;
  return (
    <Container>
      <Label htmlFor={idText}>{title}</Label>
      <Input type="text" id={idText} ref={ref} />
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 28px;
  padding: 5px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.mint};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  transition: border-color 300ms ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.colors.mainColor};
  }
`;

export default CustomInput;
