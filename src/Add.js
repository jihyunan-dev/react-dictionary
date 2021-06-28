import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addWord } from "./redux/module/words";
import CustomInput from "./CustomInput";

const Add = (props) => {
  const dispatch = useDispatch();
  const wordRef = useRef(null);
  const pinyinRef = useRef(null);
  const defRef = useRef(null);
  const exCnRef = useRef(null);
  const exKoRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이후 dispatch를 사용하여 db 및 store에 저장(add)하는 기능으로 만들기
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

    dispatch(addWord(word_obj));
    props.history.push("/");
  };

  return (
    <div>
      <h1>단어 추가하기</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput title="단어" idText="input-word" ref={wordRef} />
        <CustomInput title="병음" idText="input-pinyin" ref={pinyinRef} />
        <CustomInput title="의미" idText="input-def" ref={defRef} />
        <CustomInput title="예문" idText="input-ex-cn" ref={exCnRef} />
        <CustomInput title="해석" idText="input-ex-ko" ref={exKoRef} />
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
};

export default Add;
