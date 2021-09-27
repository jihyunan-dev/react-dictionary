/**
 * FormPage.js : 단어를 새로 등록하거나 수정하는 경우 사용하는 Form 컴포넌트입니다.
 */

import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// components & element
import CustomInput from "./CustomInput";
import { RectangleBtn } from "./Btn";

// redux
import { addWordFB, modifyWordFB } from "./redux/module/words";

const FormPage = (props) => {
  // WordCard.js 43번째 줄 - Link에서 state로 값을 넘길 수 있습니다.
  const data = props.location.state;

  const dispatch = useDispatch();

  const wordRef = useRef(null);
  const pinyinRef = useRef(null);
  const defRef = useRef(null);
  const exCnRef = useRef(null);
  const exKoRef = useRef(null);

  /**
   * getFormData 함수
   *  - 입력된 모든 값을 가져옴
   *  - 유효성 검사
   *  - 모든 값들이 들어있는 하나의 객체를 반환
   */
  const getFormData = () => {
    const word = wordRef.current.value.trim();
    const pinyin = pinyinRef.current.value.trim();
    const definition = defRef.current.value.trim();
    const example_cn = exCnRef.current.value.trim();
    const example_ko = exKoRef.current.value.trim();

    // 유효성 체크
    if (!word || !pinyin || !definition || !example_cn || !example_ko) {
      alert("아직 입력하지 않은 항목이 있습니다.");
      return false;
    }

    // 반환할 object
    const word_obj = {
      word,
      pinyin,
      definition,
      example_cn,
      example_ko,
    };

    return word_obj;
  };

  // 단어를 등록하는 함수
  const submitWord = (e) => {
    e.preventDefault();

    const word_obj = getFormData();
    if (!word_obj) return;

    // firebase에서 시간순으로 불러올 수 있도록 date 값을 추가, 암기/미암기 상태를 저장할 수 있도록 completed 값 추가
    const new_word_obj = { ...word_obj, date: Date.now(), completed: false };

    dispatch(addWordFB(new_word_obj));
    props.history.push("/");
  };

  // 단어를 수정하는 함수
  const updateWord = (e) => {
    e.preventDefault();

    const word_obj = getFormData();
    if (!word_obj) return;

    dispatch(modifyWordFB(word_obj, data.id));
    props.history.push("/");
  };

  return (
    <Container>
      <Subtitle>{data ? "단어 수정하기" : "단어 추가하기"}</Subtitle>
      <Form onSubmit={data ? updateWord : submitWord}>
        <CustomInput
          title="단어"
          idText="input-word"
          ref={wordRef}
          currentValue={data && data.word}
        />
        <CustomInput
          title="병음"
          idText="input-pinyin"
          ref={pinyinRef}
          currentValue={data && data.pinyin}
        />
        <CustomInput
          title="의미"
          idText="input-def"
          ref={defRef}
          currentValue={data && data.definition}
        />
        <CustomInput
          title="예문"
          idText="input-ex-cn"
          ref={exCnRef}
          currentValue={data && data.example_cn}
        />
        <CustomInput
          title="해석"
          idText="input-ex-ko"
          ref={exKoRef}
          currentValue={data && data.example_ko}
        />
        <SaveBtn type="submit">{data ? "수정하기" : "저장하기"}</SaveBtn>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 50px auto;

  ${({ theme }) => theme.device.tablet} {
    margin: 80px auto;
  }
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.mainColor};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SaveBtn = styled.button`
  ${RectangleBtn};
  align-self: center;
`;

export default FormPage;
