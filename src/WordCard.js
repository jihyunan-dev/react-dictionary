/**
 * WordCard.js : 단어 카드 하나를 의미하는 컴포넌트
 */

import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// react-icons 라이브러리 사용
import { TiTickOutline, TiTick, TiEdit, TiTimes } from "react-icons/ti";

// redux
import { deleteWordFB, updateCompleteFB } from "./redux/module/words";

// 상위 컴포넌트에서 하위 컴포넌트의 리액트 요소를 참조(ref)하기 위해 forwardRef 사용
const WordCard = forwardRef(({ word_obj }, ref) => {
  // 구조 분해 할당을 사용하면 변수를 좀 더 편하게 쓸 수 있습니다:)
  const { word, pinyin, definition, example_cn, example_ko, completed, id } =
    word_obj;

  const dispatch = useDispatch();

  // 암기/미암기 상태를 toggle 하는 함수
  const toggleCheck = (word) => {
    dispatch(updateCompleteFB(word));
  };

  // 카드 삭제 함수
  const deleteCard = (id) => {
    const password = prompt("비밀번호를 입력해주세요");
    // 삭제를 막기 위해 임시로 막아두었습니다.
    if (password !== id) {
      alert("비밀번호가 틀려 삭제할 수 없습니다.");
      return;
    }
    dispatch(deleteWordFB(id));
  };

  return (
    <Card completed={`${completed}`} ref={ref}>
      <BtnBox>
        <button onClick={() => toggleCheck(word_obj)}>
          {completed ? <AfterCheck /> : <BeforeCheck />}
        </button>
        <Link
          to={{
            pathname: `/word/${id}/edit`,
            state: word_obj,
          }}
        >
          <Edit completed={`${completed}`} />
        </Link>
        <button onClick={() => deleteCard(id)}>
          <Delete completed={`${completed}`} />
        </button>
      </BtnBox>
      <WordSet completed={`${completed}`}>
        <Word>{word}</Word>
        <Pinyin>[{pinyin}]</Pinyin>
      </WordSet>
      <Definition completed={`${completed}`}>{definition}</Definition>
      <Example completed={`${completed}`}>{example_cn}</Example>
      <Example completed={`${completed}`}>{example_ko}</Example>
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

// styled-components의 css를 사용하면 여러 곳에서 해당 스타일 코드를 재사용하기 쉽습니다:) : https://styled-components.com/docs/api#css
const CardFontColor = css`
  color: ${({ completed, theme }) =>
    completed === "false" ? theme.colors.black : theme.colors.white};
`;

const WordSet = styled.div`
  // 위에서 정의한 CardFontColor 재사용
  ${CardFontColor}
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

const Example = styled.div`
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
