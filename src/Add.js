import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addWordFB } from "./redux/module/words";
import CustomInput from "./CustomInput";
import styled from "styled-components";
import { RectangleBtn } from "./Btn";

const Add = (props) => {
  const dispatch = useDispatch();
  const wordRef = useRef(null);
  const pinyinRef = useRef(null);
  const defRef = useRef(null);
  const exCnRef = useRef(null);
  const exKoRef = useRef(null);

  const submitWord = (e) => {
    e.preventDefault();
    const word = wordRef.current.value.trim();
    const pinyin = pinyinRef.current.value.trim();
    const definition = defRef.current.value.trim();
    const example_cn = exCnRef.current.value.trim();
    const example_ko = exKoRef.current.value.trim();

    const word_obj = {
      word,
      pinyin: pinyin ? pinyin : null,
      definition,
      example_cn,
      example_ko: example_ko ? example_ko : null,
      date: Date.now(),
      completed: false,
    };

    dispatch(addWordFB(word_obj));
    props.history.push("/");
  };

  return (
    <Container>
      <Subtitle>단어 추가하기</Subtitle>
      <Form onSubmit={submitWord}>
        <CustomInput title="단어" idText="input-word" ref={wordRef} />
        <CustomInput title="병음" idText="input-pinyin" ref={pinyinRef} />
        <CustomInput title="의미" idText="input-def" ref={defRef} />
        <CustomInput title="예문" idText="input-ex-cn" ref={exCnRef} />
        <CustomInput title="해석" idText="input-ex-ko" ref={exKoRef} />
        <SaveBtn type="submit">저장하기</SaveBtn>
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

export default Add;
