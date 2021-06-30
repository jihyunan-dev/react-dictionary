import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { TiTickOutline, TiTick, TiEdit, TiTimes } from "react-icons/ti";
import { deleteWordFB, updateCompleteFB } from "./redux/module/words";

const WordCard = forwardRef(({ word_obj }, ref) => {
  const { word, pinyin, definition, example_cn, example_ko, completed, id } =
    word_obj;

  const dispatch = useDispatch();

  const toggleCheck = (word) => {
    dispatch(updateCompleteFB(word));
  };

  const deleteCard = (id) => {
    dispatch(deleteWordFB(id));
  };

  return (
    <Card completed={`${completed}`} ref={ref}>
      <BtnBox>
        <button onClick={() => toggleCheck(word_obj)}>
          {completed ? <AfterCheck /> : <BeforeCheck />}
        </button>
        <button>
          <Edit completed={`${completed}`} />
        </button>
        <button onClick={() => deleteCard(id)}>
          <Delete completed={`${completed}`} />
        </button>
      </BtnBox>
      <WordSet completed={`${completed}`}>
        <Word>{word}</Word>
        <Pinyin>[{pinyin}]</Pinyin>
      </WordSet>
      <Definition completed={`${completed}`}>{definition}</Definition>
      <EXAMPLE completed={`${completed}`}>{example_cn}</EXAMPLE>
      <EXAMPLE completed={`${completed}`}>{example_ko}</EXAMPLE>
    </Card>
  );
});

const Card = styled.article`
  ${({ completed, theme }) => {
    const { colors, device } = theme;
    return css`
      position: relative;
      width: 100%;
      padding: 20px;
      border: 2px solid ${colors.mainColor};
      border-radius: 10px;
      background-color: ${completed === "false"
        ? "rgba(255, 255, 255, 0.4)"
        : colors.mainColor};
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

const CardFontColor = css`
  color: ${({ completed, theme }) =>
    completed === "false" ? theme.colors.black : theme.colors.white};
`;

const WordSet = styled.div`
  ${CardFontColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;
`;

const Word = styled.h4`
  margin-right: 5px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
`;

const Pinyin = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Definition = styled.p`
  ${CardFontColor};
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const EXAMPLE = styled.div`
  margin-top: 5px;
  color: ${({ completed, theme }) =>
    completed === "false" ? theme.colors.blue : theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const BtnBox = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;

  & > button {
    padding: 3px;
  }
`;

const Icons = css`
  color: ${(props) =>
    props.completed === "false"
      ? props.theme.colors.mainColor
      : props.theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const BeforeCheck = styled(TiTickOutline)`
  color: ${({ theme }) => theme.colors.mainColor};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
const AfterCheck = styled(TiTick)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Edit = styled(TiEdit)`
  ${Icons};
`;

const Delete = styled(TiTimes)`
  ${Icons};
`;

export default WordCard;
