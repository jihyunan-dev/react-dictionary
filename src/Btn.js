import { css } from "styled-components";

const Btn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainColor};
`;

export const RoundBtn = css`
  ${Btn};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const RectangleBtn = css`
  ${Btn};
  width: 200px;
  height: 40px;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
