import React from "react";
import styled, { css } from "styled-components";

const WordCard = ({ word_obj }) => {
  const { word, pinyin, definition, example_cn, example_ko } = word_obj;
  return (
    <Card>
      <WordSet>
        <Word>{word}</Word>
        <Pinyin>[{pinyin}]</Pinyin>
      </WordSet>
      <Definition>{definition}</Definition>
      <EXAMPLE>{example_cn}</EXAMPLE>
      <EXAMPLE>{example_ko}</EXAMPLE>
    </Card>
  );
};

const Card = styled.article`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      width: 100%;
      padding: 20px;
      border: 2px solid ${colors.mint};
      border-radius: 10px;
      transition: box-shadow 300ms ease-in-out;

      ${device.tablet} {
        width: calc((100% - 20px) / 2);
      }

      ${device.desktop} {
        width: calc((100% - (20px * 2)) / 3);
      }

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      }
    `;
  }}
`;

const WordSet = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Word = styled.h4`
  margin-right: 5px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
`;

const Pinyin = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Definition = styled.p`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const EXAMPLE = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export default WordCard;
