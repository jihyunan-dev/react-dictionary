import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addWordFB, modifyWordFB } from "./redux/module/words";
import CustomInput from "./CustomInput";
import styled from "styled-components";
import { RectangleBtn } from "./Btn";

const FormPage = (props) => {
  const data = props.location.state;

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

  const updateWord = (e) => {
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
    };

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
